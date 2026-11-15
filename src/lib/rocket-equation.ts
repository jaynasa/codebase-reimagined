/** Standard gravity used by the Mission Guide calculator (m/s²). */
export const G0 = 9.81;

/**
 * Tsiolkovsky rocket equation: Δv = Isp × g₀ × ln(m₀ / mᶠ).
 * Returns null when the inputs are not physical (wet mass must exceed a positive dry mass).
 */
export function stageDeltaV(ispSeconds: number, wetMass: number, dryMass: number): number | null {
  if (!(wetMass > dryMass && dryMass > 0)) return null;
  return ispSeconds * G0 * Math.log(wetMass / dryMass);
}
