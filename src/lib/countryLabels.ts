export function labelRankLimit(altitude: number): number {
  if (altitude >= 1.9) return 2
  if (altitude >= 1.25) return 3
  if (altitude >= 0.8) return 4
  if (altitude >= 0.55) return 6
  return 4
}

export function labelSizeForAltitude(altitude: number): number {
  const world = Math.min(1, Math.max(0.34, (altitude + 0.15) / 2.5))
  const close = altitude >= 1.15 ? 1 : Math.max(0.16, altitude / 1.15)
  return 3.4 * world * close
}

export function selectCountryLabels<T extends { rank: number; area: number; x: number; y: number; front: boolean }>(
  candidates: readonly T[],
  maxRank: number,
  boxWidth: number,
  boxHeight: number,
): T[] {
  const ordered = candidates.filter((item) => item.front && item.rank <= maxRank && Number.isFinite(item.x) && Number.isFinite(item.y))
  ordered.sort((a, b) => a.rank - b.rank || b.area - a.area)
  const chosen: T[] = []
  for (const candidate of ordered) {
    const crowded = chosen.some((other) => Math.abs(other.x - candidate.x) < boxWidth && Math.abs(other.y - candidate.y) < boxHeight)
    if (!crowded) chosen.push(candidate)
  }
  return chosen
}
