/**
 * Best-effort in-memory rate limiter for the contact endpoint.
 *
 * Vercel may run several instances of this function and recycle them at any
 * moment, so this is a speed bump rather than a hard guarantee: it stops the
 * common case (one script hammering the endpoint) from burning through the
 * Resend quota. For a hard limit, move the counter to Upstash Redis.
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5
const MAX_TRACKED_KEYS = 5000

const hits = new Map<string, number[]>()

export interface RateLimitResult {
  allowed: boolean
  retryAfterSeconds: number
}

export function checkRateLimit(key: string, now: number = Date.now()): RateLimitResult {
  const previous = hits.get(key) ?? []
  const recent = previous.filter((time) => now - time < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, recent)
    const oldest = recent[0] ?? now
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - oldest)) / 1000)
    return { allowed: false, retryAfterSeconds: Math.max(1, retryAfterSeconds) }
  }

  recent.push(now)
  hits.set(key, recent)

  // Keep the map from growing without bound inside a long-lived instance.
  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [trackedKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(trackedKey)
      if (hits.size <= MAX_TRACKED_KEYS) break
    }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}
