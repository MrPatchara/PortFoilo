import { describe, expect, it } from 'vitest'
import { checkRateLimit } from '../api/contact'

const WINDOW_STEP_MS = 11 * 60 * 1000

// The limiter keeps module-level state, so each test uses its own key.
describe('checkRateLimit', () => {
  it('allows five requests then blocks the sixth', () => {
    const key = 'burst'
    const now = 1_000_000

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(checkRateLimit(key, now).allowed).toBe(true)
    }

    const blocked = checkRateLimit(key, now)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0)
  })

  it('lets a client through again once the window has slid past', () => {
    const key = 'slides'
    const now = 2_000_000

    for (let attempt = 0; attempt < 5; attempt += 1) {
      checkRateLimit(key, now)
    }
    expect(checkRateLimit(key, now).allowed).toBe(false)
    expect(checkRateLimit(key, now + WINDOW_STEP_MS).allowed).toBe(true)
  })

  it('tracks each client independently', () => {
    const now = 3_000_000

    for (let attempt = 0; attempt < 5; attempt += 1) {
      checkRateLimit('client-a', now)
    }

    expect(checkRateLimit('client-a', now).allowed).toBe(false)
    expect(checkRateLimit('client-b', now).allowed).toBe(true)
  })
})
