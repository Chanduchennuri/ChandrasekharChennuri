import { describe, expect, it } from 'vitest'
import { lorenz } from './lorenz'
import { cn } from './utils'
describe('lorenz', () => {
  it('returns n finite 3D points inside the known attractor bounds', () => {
    const p = lorenz(2000)
    expect(p.length).toBe(6000)
    expect([...p].every(Number.isFinite)).toBe(true)
    expect(Math.max(...p.filter((_, i) => i % 3 === 0).map(Math.abs))).toBeLessThan(40)
  })
})
describe('cn', () => { it('merges tailwind classes', () => expect(cn('p-2', 'p-4')).toBe('p-4')) })
