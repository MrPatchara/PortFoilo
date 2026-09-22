/**
 * Pulls the largest candidate out of a `srcset` string emitted by
 * vite-imagetools so it can be used as the `<img src>` fallback.
 * imagetools orders candidates by ascending width, so the last one wins.
 */
export function srcFromSrcset(srcset: string): string {
  const candidates = srcset.split(',')
  const last = candidates[candidates.length - 1] ?? ''
  return last.trim().split(/\s+/)[0] ?? ''
}
