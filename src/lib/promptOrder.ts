import { fnv1a, mulberry32 } from './daily.ts'

export function orderedOptions(questionId: string, options: readonly string[]): string[] {
  const items = [...options]
  const random = mulberry32(fnv1a(`prompt|${questionId}|${items.length}`))
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = items[index]
    const swapped = items[swapIndex]
    if (current === undefined || swapped === undefined) continue
    items[index] = swapped
    items[swapIndex] = current
  }
  return items
}
