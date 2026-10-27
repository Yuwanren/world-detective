export interface ScoreCardInput {
  title: string
  dateLabel: string
  total: number
  maxScore: number
  scores: readonly number[]
  rank: string
}

export function drawScoreCard(canvas: HTMLCanvasElement, input: ScoreCardInput): boolean {
  const context = canvas.getContext('2d')
  if (!context) return false
  canvas.width = 1080
  canvas.height = 1350
  context.fillStyle = '#070d16'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = '#e0c17a'
  context.lineWidth = 4
  context.strokeRect(48, 48, canvas.width - 96, canvas.height - 96)

  context.fillStyle = '#e0c17a'
  context.font = '600 36px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'
  context.fillText('World Detective', 96, 160)
  context.fillStyle = '#9aafc3'
  context.font = '32px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'
  context.fillText(input.title, 96, 220)
  context.fillText(input.dateLabel, 96, 270)

  context.fillStyle = '#e8eef6'
  context.font = '180px "Palatino Linotype", "Songti SC", serif'
  context.fillText(String(input.total), 96, 560)
  context.fillStyle = '#9aafc3'
  context.font = '64px "Palatino Linotype", "Songti SC", serif'
  context.fillText(`/ ${input.maxScore}`, 96, 650)

  context.fillStyle = '#e0c17a'
  context.font = '48px "Palatino Linotype", "Songti SC", serif'
  context.fillText(input.rank, 96, 760)

  input.scores.slice(0, 5).forEach((score, index) => {
    const x = 96 + index * 180
    context.strokeStyle = '#2c3e54'
    context.strokeRect(x, 860, 156, 180)
    context.fillStyle = '#9aafc3'
    context.font = '28px "Segoe UI", "PingFang SC", sans-serif'
    context.fillText(String(index + 1), x + 62, 920)
    context.fillStyle = '#e0c17a'
    context.font = '56px "Palatino Linotype", "Songti SC", serif'
    context.fillText(String(score), x + 28, 1000)
  })
  return true
}

export async function downloadScoreCard(filename: string, input: ScoreCardInput): Promise<boolean> {
  const canvas = document.createElement('canvas')
  if (!drawScoreCard(canvas, input)) return false
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((value) => resolve(value), 'image/png'))
  if (!blob) return false
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
  return true
}
