import { useEffect, useRef, useState } from 'react'
import Globe, { type GlobeMethods } from 'react-globe.gl'
import { countryAt, countryBorders, countryLabels, type CountryHit, type CountryLabel } from '../data/countries.ts'
import { referenceCities, regionalPaths } from '../data/referenceGeography.ts'
import type { GeoPoint } from '../lib/geo.ts'
import {
  ALTITUDE_STEP,
  cameraDistance,
  cityRadiusDegrees,
  clampAltitude,
  INITIAL_ALTITUDE,
  MAX_ALTITUDE,
  MIN_ALTITUDE,
  pinRadiusDegrees,
  showCities,
  showCoast,
} from '../lib/globeView.ts'
import { labelRankLimit, labelSizeForAltitude, selectCountryLabels } from '../lib/countryLabels.ts'

const EARTH_TEXTURE = 'https://cdn.jsdelivr.net/npm/three-globe@2.45.6/example/img/earth-blue-marble.jpg'
const emptyPaths: never[] = []
const emptyColor = () => ''
const borderColor = () => 'rgba(186, 214, 232, 0.92)'
const codeColor = () => '#d5e4f2'
const cityColor = '#c5b59a'

interface Pin {
  lat: number
  lng: number
  color: string
  role: 'guess' | 'target' | 'city'
  radius: number
}

interface LabelView {
  labels: CountryLabel[]
  size: number
  pinRadius: number
  cityRadius: number
  coastVisible: boolean
  citiesVisible: boolean
}

const initialView: LabelView = {
  labels: [],
  size: labelSizeForAltitude(INITIAL_ALTITUDE),
  pinRadius: pinRadiusDegrees(INITIAL_ALTITUDE),
  cityRadius: cityRadiusDegrees(INITIAL_ALTITUDE),
  coastVisible: false,
  citiesVisible: false,
}

export function LocateGlobe({
  guess,
  target,
  guessLabel,
  targetLabel,
  controls,
  interactive,
  onPick,
  onRegion,
}: {
  guess: GeoPoint | null
  target: GeoPoint | null
  guessLabel: string
  targetLabel: string
  controls: { left: string; right: string; zoomIn: string; zoomOut: string }
  interactive: boolean
  onPick: (point: GeoPoint, region: CountryHit | null) => void
  onRegion?: (region: CountryHit | null) => void
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [size, setSize] = useState({ width: 320, height: 360 })
  const [ready, setReady] = useState(false)
  const [labelView, setLabelView] = useState<LabelView>(initialView)

  useEffect(() => {
    onRegion?.(guess ? countryAt(guess.latitude, guess.longitude) : null)
  }, [guess, onRegion])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.max(240, Math.floor(entry.contentRect.width))
      const height = Math.max(224, Math.floor(entry.contentRect.height))
      setSize({ width, height })
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const globe = globeRef.current
    if (!globe || !ready) return
    const orbit = globe.controls()
    let timer = 0
    let lastSignature = ''
    const refresh = () => {
      const pov = globe.pointOfView()
      const camera = globe.camera() as PerspectiveLike
      const scene = globe.scene()
      const cameraLocal = camera.position.clone().applyMatrix4(scene.matrixWorld.clone().invert())
      const distance = Math.max(cameraLocal.length(), 0.001)
      const fov = ((camera.fov || 50) * Math.PI) / 180
      const radius = globe.getGlobeRadius()
      const pixelsPerWorld = size.height / (2 * Math.tan(fov / 2) * distance)
      const textPixels = ((labelSizeForAltitude(pov.altitude) * Math.PI) / 180) * radius * pixelsPerWorld
      for (const label of countryLabels) {
        const coords = globe.getCoords(label.lat, label.lng, 0.012)
        const projected = camera.position.clone().set(coords.x, coords.y, coords.z).applyMatrix4(scene.matrixWorld).project(camera)
        const facing = cameraLocal.x * coords.x + cameraLocal.y * coords.y + cameraLocal.z * coords.z > 0
        label.front = facing && projected.z < 1
        label.x = (projected.x * 0.5 + 0.5) * size.width
        label.y = (-projected.y * 0.5 + 0.5) * size.height
      }
      const labels = selectCountryLabels(
        countryLabels,
        labelRankLimit(pov.altitude),
        Math.max(64, textPixels * 3.6),
        Math.max(28, textPixels * 1.8),
      )
      const sizeDeg = labelSizeForAltitude(pov.altitude)
      const pinRadius = pinRadiusDegrees(pov.altitude)
      const coastVisible = showCoast(pov.altitude)
      const citiesVisible = showCities(pov.altitude)
      const signature = `${sizeDeg.toFixed(2)}:${pinRadius.toFixed(3)}:${coastVisible}:${citiesVisible}:${labels.map((label) => label.text).join(',')}`
      if (signature === lastSignature) return
      lastSignature = signature
      setLabelView({
        labels,
        size: sizeDeg,
        pinRadius,
        cityRadius: cityRadiusDegrees(pov.altitude),
        coastVisible,
        citiesVisible,
      })
    }
    const schedule = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(refresh, 180)
    }
    orbit.addEventListener('change', schedule)
    orbit.addEventListener('end', refresh)
    refresh()
    return () => {
      window.clearTimeout(timer)
      orbit.removeEventListener('change', schedule)
      orbit.removeEventListener('end', refresh)
    }
  }, [ready, size.height, size.width])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const scene = globeRef.current?.scene()
      if (!scene) return
      scene.traverse((object: LabelNode) => {
        if (object.__globeObjType !== 'label') return
        object.traverse((child) => {
          const material = child.material
          if (!child.isMesh || !material?.color || !material.emissive) return
          material.emissive.copy(material.color)
          material.color.set(0x000000)
          material.emissiveIntensity = 1
          material.depthTest = true
          material.depthWrite = false
        })
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [labelView])

  const points: Pin[] = []
  if (labelView.citiesVisible) {
    for (const city of referenceCities) {
      points.push({ lat: city.lat, lng: city.lng, color: cityColor, role: 'city', radius: labelView.cityRadius })
    }
  }
  if (guess) points.push({ lat: guess.latitude, lng: guess.longitude, color: '#e0c17a', role: 'guess', radius: labelView.pinRadius })
  if (target) points.push({ lat: target.latitude, lng: target.longitude, color: '#9ec9ef', role: 'target', radius: labelView.pinRadius })
  const arcs =
    guess && target
      ? [{ startLat: guess.latitude, startLng: guess.longitude, endLat: target.latitude, endLng: target.longitude }]
      : []

  function pick(coords: { lat: number; lng: number }) {
    if (!interactive) return
    const point = { latitude: coords.lat, longitude: coords.lng }
    onPick(point, countryAt(point.latitude, point.longitude))
  }

  function nudge(lngDelta: number, altitudeDelta: number) {
    const globe = globeRef.current
    if (!globe) return
    const pov = globe.pointOfView()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    globe.pointOfView(
      {
        lat: pov.lat,
        lng: pov.lng + lngDelta,
        altitude: clampAltitude(pov.altitude + altitudeDelta),
      },
      reduceMotion ? 0 : 180,
    )
  }

  return (
    <div>
      <div
        ref={frameRef}
        className="h-[min(30vh,16rem)] min-h-56 w-full min-w-0 overflow-hidden rounded-lg bg-[#071018] lg:h-[min(68vh,40rem)] lg:min-h-72 [&_canvas]:max-w-full"
        style={{ touchAction: 'none' }}
      >
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="#071018"
          globeImageUrl={EARTH_TEXTURE}
          showGraticules
          showAtmosphere
          atmosphereColor="#8eb4d4"
          atmosphereAltitude={0.16}
          polygonsData={countryBorders}
          polygonCapColor={emptyColor}
          polygonSideColor={emptyColor}
          polygonStrokeColor={borderColor}
          polygonAltitude={0.004}
          polygonCapCurvatureResolution={1}
          polygonsTransitionDuration={0}
          labelsData={labelView.labels}
          labelLat="lat"
          labelLng="lng"
          labelText="text"
          labelSize={labelView.size}
          labelColor={codeColor}
          labelAltitude={0.012}
          labelIncludeDot={false}
          labelResolution={2}
          labelsTransitionDuration={0}
          pathsData={labelView.coastVisible ? regionalPaths : emptyPaths}
          pathPoints="points"
          pathPointLat={(point) => (point as [number, number])[1]}
          pathPointLng={(point) => (point as [number, number])[0]}
          pathPointAlt={0.007}
          pathColor="color"
          pathStroke="stroke"
          pathResolution={2}
          pathLabel={() => ''}
          pathTransitionDuration={0}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={(point) => ((point as Pin).role === 'city' ? 0.008 : 0.02)}
          pointRadius="radius"
          pointResolution={12}
          pointsTransitionDuration={0}
          pointLabel={(point) => {
            const role = (point as Pin).role
            if (role === 'target') return targetLabel
            if (role === 'guess') return guessLabel
            return ''
          }}
          arcsData={arcs}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={() => '#e0c17a'}
          arcAltitude={0.18}
          arcStroke={0.5}
          arcDashLength={1}
          arcDashGap={0}
          arcDashAnimateTime={0}
          arcsTransitionDuration={0}
          enablePointerInteraction={interactive}
          onGlobeClick={pick}
          onPolygonClick={(_polygon, _event, coords) => pick(coords)}
          onLabelClick={(_label, _event, coords) => pick(coords)}
          onPointClick={(_point, _event, coords) => pick(coords)}
          onPathClick={(_path, _event, coords) => pick(coords)}
          onGlobeReady={() => {
            const globe = globeRef.current
            globe?.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
            const orbit = globe?.controls()
            if (orbit) {
              orbit.minDistance = cameraDistance(MIN_ALTITUDE)
              orbit.maxDistance = cameraDistance(MAX_ALTITUDE)
            }
            setReady(true)
          }}
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        <Nudge label={controls.left} onClick={() => nudge(-25, 0)} />
        <Nudge label={controls.right} onClick={() => nudge(25, 0)} />
        <Nudge label={controls.zoomIn} onClick={() => nudge(0, -ALTITUDE_STEP)} />
        <Nudge label={controls.zoomOut} onClick={() => nudge(0, ALTITUDE_STEP)} />
      </div>
    </div>
  )
}

interface Vec3 {
  x: number
  y: number
  z: number
  set(x: number, y: number, z: number): Vec3
  clone(): Vec3
  applyMatrix4(matrix: object): Vec3
  project(camera: object): Vec3
  length(): number
}

interface PerspectiveLike {
  fov?: number
  position: Vec3
}

interface LabelColor {
  copy(color: LabelColor): void
  set(hex: number): void
}

interface LabelMaterial {
  color?: LabelColor
  emissive?: { copy(color: LabelColor): void }
  emissiveIntensity?: number
  depthTest?: boolean
  depthWrite?: boolean
}

interface LabelNode {
  __globeObjType?: string
  isMesh?: boolean
  material?: LabelMaterial
  traverse(visitor: (child: LabelNode) => void): void
}

function Nudge({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 whitespace-nowrap rounded-md border border-line bg-card px-1 text-xs text-ink hover:border-accent/70 sm:px-2 sm:text-sm"
    >
      {label}
    </button>
  )
}
