import { describe, expect, it } from "vitest";

import { stageDeltaV } from "./rocket-equation";

describe("stageDeltaV", () => {
  it("matches the guide's default example (Isp 310 s, 50 t wet, 12 t dry ≈ 4,340 m/s)", () => {
    expect(Math.round(stageDeltaV(310, 50, 12)!)).toBe(4340);
  });

  it("rejects a dry mass that is not lower than the wet mass", () => {
    expect(stageDeltaV(310, 12, 12)).toBeNull();
    expect(stageDeltaV(310, 10, 20)).toBeNull();
  });
});
