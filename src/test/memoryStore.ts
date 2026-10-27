import type { KeyValueStore } from '../lib/storage.ts'

export function createMemoryStore(): KeyValueStore {
  const values = new Map<string, string>()
  return {
    getItem(key) {
      return values.get(key) ?? null
    },
    setItem(key, value) {
      values.set(key, value)
    },
    removeItem(key) {
      values.delete(key)
    },
  }
}
