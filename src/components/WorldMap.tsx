import { useId } from 'react'
import { worldLandPaths, worldLandViewBox } from './worldLandPaths.ts'

export function WorldMap({ label, compact = false }: { label: string; compact?: boolean }) {
  const gridId = `chart-grid-${useId().replace(/:/g, '')}`

  return (
    <figure className={compact ? 'h-40 w-full sm:h-44' : 'aspect-[2/1] w-full max-h-[420px]'}>
      <svg
        viewBox={worldLandViewBox}
        role="img"
        aria-label={label}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full rounded-md bg-[#0b1624]"
      >
        <defs>
          <pattern id={gridId} width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0H0V80" fill="none" stroke="#163044" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="960" height="480" fill="#0b1624" />
        <rect width="960" height="480" fill={`url(#${gridId})`} />
        <g fill="#1a5278" stroke="#c5dced" strokeWidth="0.6" strokeLinejoin="round">
          {worldLandPaths.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </g>
      </svg>
    </figure>
  )
}
