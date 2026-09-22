import { describe, expect, it } from 'vitest'
import { naturalSort, spreadOrder } from './imageOrder'

describe('naturalSort', () => {
  it('orders numeric filenames numerically instead of lexicographically', () => {
    expect(['10.jpg', '2.jpg', '1.jpg'].sort(naturalSort)).toEqual(['1.jpg', '2.jpg', '10.jpg'])
  })

  it('handles the glob keys Vite actually produces', () => {
    const keys = ['../Pic_cer/20.jpg', '../Pic_cer/3.jpg']
    expect(keys.sort(naturalSort)).toEqual(['../Pic_cer/3.jpg', '../Pic_cer/20.jpg'])
  })

  it('pushes names without a trailing number to the end', () => {
    const names = ['Introduction-to-AI-Security-Certificate.jpg', '1.jpg']
    expect(names.sort(naturalSort)).toEqual(['1.jpg', 'Introduction-to-AI-Security-Certificate.jpg'])
  })
})

describe('spreadOrder', () => {
  it('returns an empty list for an empty folder (guards the previous crash)', () => {
    expect(spreadOrder(0)).toEqual([])
  })

  it('returns a single index for one image', () => {
    expect(spreadOrder(1)).toEqual([0])
  })

  it('is a permutation — every index appears exactly once', () => {
    for (const count of [2, 3, 7, 8, 20, 47]) {
      const order = spreadOrder(count)
      expect(order).toHaveLength(count)
      expect([...order].sort((a, b) => a - b)).toEqual(
        Array.from({ length: count }, (_, index) => index),
      )
    }
  })

  it('never places two consecutive source files side by side', () => {
    const order = spreadOrder(47)
    for (let index = 1; index < order.length; index += 1) {
      expect(Math.abs(order[index] - order[index - 1])).toBeGreaterThan(1)
    }
  })
})
