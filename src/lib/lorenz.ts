/** Integrates the Lorenz system dx=σ(y−x), dy=x(ρ−z)−y, dz=xy−βz with forward Euler. */
export function lorenz(n = 7000, dt = 0.006, s = 10, r = 28, b = 8 / 3): Float32Array {
  let x = 0.1, y = 0, z = 0
  const out = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const dx = s * (y - x), dy = x * (r - z) - y, dz = x * y - b * z
    x += dx * dt; y += dy * dt; z += dz * dt
    out.set([x, y, z - 25], i * 3)
  }
  return out
}
