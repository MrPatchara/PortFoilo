/** Sorts certificate filenames numerically ("2.jpg" before "10.jpg"). */
export function naturalSort(a: string, b: string): number {
  const numberOf = (value: string) => {
    const match = value.match(/(\d+)\.(png|jpe?g|webp|gif)$/i)
    return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER
  }
  return numberOf(a) - numberOf(b) || a.localeCompare(b)
}

/**
 * Spread ordering: consecutive files (often the same institution batch) are
 * distributed evenly so similar certificates never sit next to each other.
 * Uses a coprime stride permutation, so it stays stable for any file count.
 */
export function spreadOrder(count: number): number[] {
  if (count <= 0) return []
  if (count === 1) return [0]

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  let step = 7
  while (gcd(step, count) !== 1) step += 1

  return Array.from({ length: count }, (_, index) => (index * step) % count)
}
