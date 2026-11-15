import { useEffect, useState } from "react";

function format(seconds: number, altitude: number, velocity: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return {
    clock: `T+ ${h}:${m}:${s}`,
    altitude: `${altitude.toLocaleString("en-US")} m`,
    velocity: `${velocity.toLocaleString("en-US")} m/s`,
  };
}

/** Decorative live ticker for the hero telemetry console. */
export function useHeroTelemetry() {
  const [state, setState] = useState({ seconds: 222, altitude: 184240, velocity: 7792 });

  useEffect(() => {
    const id = window.setInterval(() => {
      setState((prev) => ({
        seconds: prev.seconds + 1,
        altitude: prev.altitude + Math.floor(Math.random() * 40) + 12,
        velocity: prev.velocity + Math.floor(Math.random() * 4) - 1,
      }));
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  return format(state.seconds, state.altitude, state.velocity);
}
