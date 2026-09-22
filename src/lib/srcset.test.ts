import { describe, expect, it } from 'vitest'
import { srcFromSrcset } from './srcset'

describe('srcFromSrcset', () => {
  it('returns the largest candidate so the <img src> fallback is never upscaled', () => {
    expect(srcFromSrcset('/a-400.webp 400w, /a-800.webp 800w')).toBe('/a-800.webp')
  })

  it('copes with the spacing vite-imagetools emits', () => {
    expect(srcFromSrcset('/a-400.webp  400w,   /a-800.webp  800w')).toBe('/a-800.webp')
  })

  it('works for a single-candidate srcset', () => {
    expect(srcFromSrcset('/only.webp 900w')).toBe('/only.webp')
  })

  it('returns an empty string for an empty srcset', () => {
    expect(srcFromSrcset('')).toBe('')
  })
})
