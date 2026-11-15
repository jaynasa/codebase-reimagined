import { createFileRoute, Link } from "@tanstack/react-router";

import { ProjectLink } from "@/components/site/project-link";
import { SiteShell } from "@/components/site/site-shell";
import { useHeroTelemetry } from "@/hooks/use-hero-telemetry";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orbital Architect 2D | Space Mission Game Design" },
      {
        name: "description",
        content:
          "An interactive rocket engineering and spaceflight simulator: build rockets, launch into space, and navigate orbital trajectories in your browser.",
      },
      { property: "og:title", content: "Orbital Architect 2D | Space Mission Game Design" },
      {
        property: "og:description",
        content:
          "Build custom rockets, experiment with engineering parameters, launch into space, and plan orbital transfers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const telemetry = useHeroTelemetry();

  return (
    <SiteShell>
      <main>
        {/* SECTION 1 — HERO / LANDING PAGE */}
        <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -right-40 -top-40 w-[640px] h-[640px] rounded-full border border-cyan/15"></div>
            <div className="absolute -right-20 -top-20 w-[460px] h-[460px] rounded-full border border-dashed border-indigo/25"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface border border-cyan/30 mb-5">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
                  <span className="label text-cyan text-[11px] font-semibold tracking-wider">INTERNATIONAL SPACE APPS CHALLENGE</span>
                </div>

                <p className="technical text-xs sm:text-sm font-semibold tracking-[0.2em] text-cyan uppercase mb-2">
                  DESIGN. BUILD. LAUNCH. EXPLORE.
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-5">
                  ORBITAL ARCHITECT <span className="text-cyan">2D</span>
                </h1>

                <p className="text-lg sm:text-xl font-medium text-foreground/90 mb-3 leading-snug">
                  An interactive rocket engineering and spaceflight simulator that puts orbital exploration in your hands.
                </p>

                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                  Build custom rockets, experiment with engineering parameters, launch into space, and navigate orbital trajectories from Earth toward space.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 mb-10">
                  <Link to="/" hash="play" className="btn-emerald launch-active px-6 py-3.5 text-sm sm:text-base">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>PLAY THE SIMULATOR</span>
                  </Link>

                  <Link to="/guide" className="btn-primary px-6 py-3.5 text-sm sm:text-base">
                    <span>📖 HOW TO PLAY (MISSION GUIDE)</span>
                  </Link>

                  <Link to="/" hash="demo" className="btn-secondary px-5 py-3.5 text-sm sm:text-base">
                    <span>WATCH DEMO</span>
                  </Link>

                  <Link to="/" hash="resources" className="btn-secondary px-5 py-3.5 text-sm sm:text-base">
                    <span>VIEW SOURCE CODE</span>
                  </Link>
                </div>

                {/* Technical Status Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-5 border-t border-border">
                  <div>
                    <span className="label block text-[10px]">SYSTEM</span>
                    <span className="technical text-xs font-semibold text-foreground">ORBITAL ARCHITECT 2D</span>
                  </div>
                  <div>
                    <span className="label block text-[10px]"></span>
                    <span className="technical text-xs font-semibold text-cyan"></span>
                  </div>
                  <div>
                    <span className="label block text-[10px]">MISSION</span>
                    <span className="technical text-xs font-semibold text-emerald">SPACE EXPLORATION</span>
                  </div>
                  <div>
                    <span className="label block text-[10px]"></span>
                    <span className="technical text-xs font-semibold text-foreground"></span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="label block text-[10px]"></span>
                    <span className="technical text-xs font-semibold text-foreground"></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Telemetry Console */}
              <div className="lg:col-span-5">
                <div className="panel p-5 sm:p-6 shadow-console relative">
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald"></span>
                      <span className="label text-[11px] font-semibold text-foreground">TRAJECTORY &amp; TELEMETRY // SIM</span>
                    </div>
                    <span className="technical text-xs font-semibold text-cyan">{telemetry.clock}</span>
                  </div>

                  {/* SVG Orbital Trajectory Schematic */}
                  <div className="bg-background border border-border rounded-xl p-3 mb-4 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                      <span className="label text-[9px] text-dim">TRANSLUNAR INJECTION PLOT</span>
                      <span className="technical text-[10px] text-emerald">Δv EST: 3,140 m/s</span>
                    </div>
                    <svg viewBox="0 0 360 175" className="w-full h-auto block" role="img" aria-label="Earth to Moon orbital transfer trajectory schematic">
                      <defs>
                        <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      <line x1="0" y1="88" x2="360" y2="88" strokeWidth="0.75" strokeDasharray="3 3" className="stroke-grid" />
                      <line x1="72" y1="0" x2="72" y2="175" strokeWidth="0.75" strokeDasharray="3 3" className="stroke-grid" />
                      <circle cx="72" cy="112" r="36" fill="none" strokeOpacity="0.28" strokeWidth="1" className="stroke-cyan" />
                      <circle cx="295" cy="48" r="24" fill="none" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" className="stroke-indigo" />
                      <path d="M 96 84 Q 175 24 275 48" fill="none" strokeWidth="1.75" className="orbit-dash stroke-cyan" />
                      <circle cx="72" cy="112" r="30" fill="url(#earthGlow)" />
                      <circle cx="72" cy="112" r="18" strokeWidth="1.5" className="fill-planet stroke-cyan" />
                      <text x="72" y="144" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8.5" className="fill-muted-foreground">EARTH</text>
                      <g transform="translate(102, 80)">
                        <circle cx="0" cy="0" r="3.5" className="fill-amber" />
                        <text x="8" y="-4" fontFamily="JetBrains Mono, monospace" fontSize="8" className="fill-amber">NODE_01 [TLI]</text>
                      </g>
                      <g transform="translate(186, 48) rotate(-14)">
                        <polygon points="8,0 -5,-3.5 -3,0 -5,3.5" className="fill-foreground" />
                        <line x1="-5" y1="0" x2="-11" y2="0" strokeWidth="1.5" className="stroke-cyan" />
                      </g>
                      <circle cx="295" cy="48" r="18" fill="url(#moonGlow)" />
                      <circle cx="295" cy="48" r="9" strokeWidth="1.25" className="fill-grid stroke-muted-foreground" />
                      <text x="295" y="74" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8.5" className="fill-muted-foreground">TARGET</text>
                    </svg>
                  </div>

                  {/* Live Instrumentation Readouts */}
                  <div className="grid grid-cols-2 gap-3 mb-3.5">
                    <div className="bg-background border border-border rounded-lg p-2.5">
                      <span className="label block text-[10px]">ALTITUDE (AGL)</span>
                      <span className="technical text-sm sm:text-base font-bold text-foreground">{telemetry.altitude}</span>
                    </div>
                    <div className="bg-background border border-border rounded-lg p-2.5">
                      <span className="label block text-[10px]">ORBITAL VELOCITY</span>
                      <span className="technical text-sm sm:text-base font-bold text-cyan">{telemetry.velocity}</span>
                    </div>
                    <div className="bg-background border border-border rounded-lg p-2.5">
                      <span className="label block text-[10px]">APOAPSIS / PERIAPSIS</span>
                      <span className="technical text-xs sm:text-sm font-semibold text-foreground">210 km / 182 km</span>
                    </div>
                    <div className="bg-background border border-border rounded-lg p-2.5">
                      <span className="label block text-[10px]">CURRENT TWR</span>
                      <span className="technical text-xs sm:text-sm font-semibold text-emerald">1.84 [NOMINAL]</span>
                    </div>
                  </div>

                  {/* Propellant Bar */}
                  <div className="bg-background border border-border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="label text-[10px]">STAGE 02 // PROPELLANT REMAINING</span>
                      <span className="technical text-xs font-semibold text-cyan">74%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-cyan to-emerald" style={{ width: "74%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — PROJECT OVERVIEW */}
        <section id="overview" className="py-20 border-t border-border bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="label text-cyan font-semibold tracking-widest block mb-2">PROJECT MOTIVATION</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
                A NEW WAY TO EXPLORE ROCKET SCIENCE
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Rocket engineering and orbital mechanics are difficult to grasp through textbooks and static diagrams alone. <strong className="text-foreground">Orbital Architect 2D</strong> makes these concepts approachable through interactive experimentation, allowing users to assemble rockets, inspect how mass and thrust govern flight, and navigate trajectories toward a target directly in a browser.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="card p-6">
                <span className="technical text-xs font-bold text-cyan block mb-2">01 // BUILD</span>
                <h3 className="text-lg font-bold text-foreground mb-2">Interactive Assembly</h3>
                <p className="text-sm text-muted-foreground">Snap together command pods, fuel tanks, engines, and decouplers to configure custom multi-stage vehicles.</p>
              </div>
              <div className="card p-6">
                <span className="technical text-xs font-bold text-indigo block mb-2">02 // CALCULATE</span>
                <h3 className="text-lg font-bold text-foreground mb-2">Engineering Feedback</h3>
                <p className="text-sm text-muted-foreground">Observe wet mass, dry mass, thrust-to-weight ratio, and delta-v budgets update live as you modify designs.</p>
              </div>
              <div className="card p-6">
                <span className="technical text-xs font-bold text-emerald block mb-2">03 // LAUNCH</span>
                <h3 className="text-lg font-bold text-foreground mb-2">Direct Flight Control</h3>
                <p className="text-sm text-muted-foreground">Control throttle, pitch attitude, stage separations, and recovery parachutes while monitoring live telemetry.</p>
              </div>
              <div className="card p-6">
                <span className="technical text-xs font-bold text-amber block mb-2">04 // NAVIGATE</span>
                <h3 className="text-lg font-bold text-foreground mb-2">Orbital Exploration</h3>
                <p className="text-sm text-muted-foreground">Visualize Earth trajectories, place maneuver nodes, and plan transfer burns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — CORE CAPABILITIES */}
        <section id="capabilities" className="py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="label text-cyan font-semibold tracking-widest block mb-2">SIMULATOR CAPABILITIES</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
                THREE INTEGRATED MISSION ENVIRONMENTS
              </h2>
              <p className="text-muted-foreground text-base">Every phase of a spaceflight mission is connected in one unified web experience.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Panel A: VAB */}
              <div className="card p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="label text-cyan">MODULE 01 // VAB</span>
                    <span className="technical text-xs px-2 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/30">DESIGN</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">DESIGN YOUR ROCKET</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Assemble custom launch vehicles from a modular component catalogue or load a preset three-stage rocket to inspect how multi-stage architectures work.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4 mb-5">
                    <li className="flex items-center gap-2"><span className="text-cyan">■</span> Command pods, fairings &amp; landing legs</li>
                    <li className="flex items-center gap-2"><span className="text-cyan">■</span> Multiple fuel tank sizes &amp; rocket engines</li>
                    <li className="flex items-center gap-2"><span className="text-cyan">■</span> Stack decouplers &amp; custom/auto staging</li>
                    <li className="flex items-center gap-2"><span className="text-cyan">■</span> Wet/dry mass, TWR &amp; stage Δv readouts</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded-lg border border-border technical text-[11px] flex justify-between">
                  <span className="text-muted-foreground">PRESET VEHICLE:</span>
                  <span className="text-emerald">3-STAGE ROCKET</span>
                </div>
              </div>

              {/* Panel B: Flight Sim */}
              <div className="card p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="label text-cyan">MODULE 02 // FLIGHT</span>
                    <span className="technical text-xs px-2 py-0.5 rounded bg-emerald/10 text-emerald border border-emerald/30">CONTROL</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">TAKE CONTROL OF YOUR MISSION</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Ignite your engines on the pad, throttle up, steer your ascent trajectory, separate spent stages, and track real-time telemetry as propellant burns off.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4 mb-5">
                    <li className="flex items-center gap-2"><span className="text-emerald">■</span> Adjustable throttle &amp; manual pitch steering</li>
                    <li className="flex items-center gap-2"><span className="text-emerald">■</span> Stability assistance (SAS) &amp; time acceleration</li>
                    <li className="flex items-center gap-2"><span className="text-emerald">■</span> Stage activation &amp; parachute deployment</li>
                    <li className="flex items-center gap-2"><span className="text-emerald">■</span> Live altitude, velocity, apsis &amp; TWR telemetry</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded-lg border border-border technical text-[11px] flex justify-between">
                  <span className="text-muted-foreground">TELEMETRY FEED:</span>
                  <span className="text-cyan">REAL-TIME INSTRUMENTATION</span>
                </div>
              </div>

              {/* Panel C: Orbital Nav */}
              <div className="card p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="label text-cyan">MODULE 03 // ORBIT</span>
                    <span className="technical text-xs px-2 py-0.5 rounded bg-indigo/10 text-indigo border border-indigo/30">NAVIGATE</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">EXPLORE BEYOND EARTH</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Toggle the orbital map mode to inspect your predicted trajectory around Earth, target the planet, and plot maneuver nodes in a simplified orbital environment.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4 mb-5">
                    <li className="flex items-center gap-2"><span className="text-indigo">■</span> Earth &amp; Planet orbital map with camera focus</li>
                    <li className="flex items-center gap-2"><span className="text-indigo">■</span> Live trajectory prediction &amp; phase angle info</li>
                    <li className="flex items-center gap-2"><span className="text-indigo">■</span> Maneuver nodes (prograde &amp; radial controls)</li>
                    <li className="flex items-center gap-2"><span className="text-indigo">■</span> Automatic transfer node plotting</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded-lg border border-border technical text-[11px] flex justify-between">
                  <span className="text-muted-foreground">TRANSFER MODEL:</span>
                  <span className="text-amber">2D SIMPLIFIED ORBITAL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — HOW IT WORKS */}
        <section id="how-it-works" className="py-20 border-t border-border bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="label text-cyan font-semibold tracking-widest block mb-2">MISSION WORKFLOW</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">FROM ASSEMBLY TO ORBIT</h2>
              <p className="text-muted-foreground text-base">Four clear steps take you from blank blueprint to trajectory planning.</p>
            </div>

            <div className="panel p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="border-l-2 border-cyan pl-4">
                <span className="technical text-xs font-bold text-cyan">STEP 01 - BUILD</span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-2">Assemble Vehicle</h3>
                <p className="text-sm text-muted-foreground">Choose components and assemble your spacecraft. Configure fuel tanks, engines, structural parts, and staging.</p>
              </div>
              <div className="border-l-2 border-indigo pl-4">
                <span className="technical text-xs font-bold text-indigo">STEP 02 - CALCULATE</span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-2">Verify Performance</h3>
                <p className="text-sm text-muted-foreground">Evaluate your rocket's mass, thrust-to-weight ratio, and estimated delta-v before launch.</p>
              </div>
              <div className="border-l-2 border-emerald pl-4">
                <span className="technical text-xs font-bold text-emerald">STEP 03 - LAUNCH</span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-2">Ascend to Space</h3>
                <p className="text-sm text-muted-foreground">Ignite your engines, control throttle, manage stages, and monitor real-time flight telemetry.</p>
              </div>
              <div className="border-l-2 border-amber pl-4">
                <span className="technical text-xs font-bold text-amber">STEP 04 - NAVIGATE</span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-2">Target the Celestial Body</h3>
                <p className="text-sm text-muted-foreground">Visualize orbital trajectories, target the planet, and experiment with maneuver planning.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — SCIENCE AND ENGINEERING */}
        <section id="science" className="py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="label text-cyan font-semibold tracking-widest block mb-2">SCIENTIFIC FOUNDATIONS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">THE SCIENCE BEHIND THE SIMULATION</h2>
              <p className="text-muted-foreground text-base">Grounded in classical rocketry and orbital mechanics equations, scaled for interactive educational exploration.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Rocket Equation */}
              <div className="card p-6">
                <span className="label text-cyan">01 // PROPULSION BUDGET</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-2">Tsiolkovsky Rocket Equation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Estimates the total change in velocity (Δv) a rocket stage can achieve based on engine efficiency and propellant mass fraction.
                </p>
                <div className="bg-background border border-border rounded-lg p-4 text-center technical text-lg sm:text-xl font-bold text-cyan mb-4">
                  Δv = Isp × g₀ × ln(m₀ / mᶠ)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground technical">
                  <div><span className="text-foreground">Isp:</span> Specific impulse (s)</div>
                  <div><span className="text-foreground">g₀:</span> Standard gravity (m/s²)</div>
                  <div><span className="text-foreground">m₀:</span> Initial wet mass (kg)</div>
                  <div><span className="text-foreground">mᶠ:</span> Final dry mass (kg)</div>
                </div>
              </div>

              {/* TWR & Orbital Mechanics */}
              <div className="card p-6">
                <span className="label text-emerald">02 // LIFTOFF &amp; TRAJECTORIES</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-2">Thrust-to-Weight Ratio &amp; Orbits</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Determines whether upward engine thrust exceeds gravitational weight at liftoff, alongside simplified 2D gravitational orbital propagation.
                </p>
                <div className="bg-background border border-border rounded-lg p-4 text-center technical text-lg sm:text-xl font-bold text-emerald mb-4">
                  TWR = Thrust / Weight
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A <strong className="text-foreground">TWR &gt; 1.0</strong> is required to climb vertically off the launch pad. Once airborne, building horizontal orbital velocity establishes apoapsis and periapsis around Earth for lunar transfer maneuver nodes.
                </p>
              </div>
            </div>

            {/* Transparency & Model Limitations Callout */}
            <div className="panel p-6 border-amber/30">
              <div className="flex items-start gap-3">
                <span className="technical text-amber font-bold text-sm mt-0.5">03</span>
                <div>
                  <h4 className="text-base font-bold text-foreground mb-1">Simplified Educational Physics &amp; Limitations</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Orbital Architect 2D is an educational simulation using scaled 2D planetary distances, simplified atmospheric drag, and planar two-body/patched orbital approximations so missions remain responsive and intuitive in a browser. It is designed to teach core engineering trade-offs rather than serve as a mission-grade aerospace simulation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — EDUCATIONAL IMPACT */}
        <section id="impact" className="py-20 border-t border-border bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="label text-emerald font-semibold tracking-widest block mb-2">EDUCATIONAL VALUE</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">MAKING SPACEFLIGHT MORE ACCESSIBLE</h2>
              <p className="text-muted-foreground text-base">
                By turning abstract aerospace equations into immediate visual feedback, Orbital Architect 2D helps students and curious learners build intuition for how rockets reach orbit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="card p-6">
                <h3 className="text-lg font-bold text-cyan mb-2">Intuitive Engineering Trade-Offs</h3>
                <p className="text-sm text-muted-foreground">Learners immediately discover why adding extra fuel increases mass and lowers TWR, and why multi-stage separation dramatically improves Δv.</p>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-bold text-cyan mb-2">Visualizing Orbital Mechanics</h3>
                <p className="text-sm text-muted-foreground">Rather than memorizing definitions of apoapsis, periapsis, and prograde burns, players manipulate maneuver nodes and watch trajectories reshape in real time.</p>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-bold text-cyan mb-2">Zero-Barrier STEM Access</h3>
                <p className="text-sm text-muted-foreground">Runs directly in any standard web browser with an integrated Mission Guide, making it easy to use in classrooms, workshops, and self-paced learning.</p>
              </div>
            </div>

            <p className="text-center technical text-sm sm:text-base font-semibold text-foreground">
              "Space exploration begins with understanding how to get there."
            </p>
          </div>
        </section>

        {/* SECTION 7 — INTERACTIVE DEMONSTRATION / VIDEO */}
        <section id="demo" className="py-20 border-t border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="label text-cyan font-semibold tracking-widest block mb-2">WALKTHROUGH DEMONSTRATION</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">SEE THE SIMULATION IN ACTION</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Demonstration of rocket construction in the VAB, launch telemetry, staging, and lunar transfer node plotting.</p>
            </div>

            <div className="panel p-3 sm:p-4 hover:border-cyan/50 transition">
              <div className="relative w-full aspect-video rounded-xl bg-background border border-border flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-cyan/15 border border-cyan flex items-center justify-center text-cyan text-2xl mb-4 shadow-glow">
                  ▶
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">Orbital Architect 2D - Working Simulator Demo</h3>
                <p className="technical text-xs text-muted-foreground mb-4">[INSERT YOUTUBE / VIDEO DEMO EMBED URL]</p>
                <ProjectLink kind="video" className="btn-secondary px-4 py-2 text-xs">OPEN VIDEO LINK</ProjectLink>
              </div>
              <p className="text-xs text-muted-foreground mt-3 px-1">
                Caption: Live screen capture of Orbital Architect 2D showing component assembly, pre-launch delta-v calculation, ascent staging, and lunar trajectory planning.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8 — PLAY THE ACTUAL GAME */}
        <section id="play" className="py-20 border-t border-border bg-background/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="panel p-8 sm:p-12 text-center border-cyan/40 bg-linear-to-br from-surface to-surface-light">
              <span className="label text-emerald font-semibold tracking-widest block mb-2">READY FOR LIFTOFF</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">YOUR MISSION STARTS HERE</h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto mb-8">
                Ready to put your engineering decisions to the test? Enter the simulator and design your own mission from Earth toward the target.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/play" className="btn-emerald launch-active px-8 py-4 text-base">
                  🚀 PLAY ORBITAL ARCHITECT
                </Link>
                <Link to="/guide" className="btn-primary px-7 py-4 text-base">
                  📖 READ MISSION GUIDE
                </Link>
                <ProjectLink kind="github" className="btn-secondary px-7 py-4 text-base">
                  VIEW SOURCE CODE
                </ProjectLink>
              </div>
              <p className="technical text-xs text-dim mt-5">Runs directly in your browser, no downloads or installation required.</p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — PROJECT RESOURCES */}
        <section id="resources" className="py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="label text-cyan font-semibold tracking-widest block mb-2">DIRECT ACCESS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">EXPLORE THE PROJECT</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 flex flex-col justify-between">
                <div>
                  <span className="label text-cyan">SOURCE CODE</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-2">GitHub Repository</h3>
                  <p className="text-sm text-muted-foreground mb-6">Explore the source code, implementation, and development of Orbital Architect 2D.</p>
                </div>
                <ProjectLink kind="github" className="btn-secondary w-full py-3 text-xs tracking-wider">VIEW ON GITHUB</ProjectLink>
              </div>

              <div className="card p-6 flex flex-col justify-between">
                <div>
                  <span className="label text-indigo">VIDEO DEMONSTRATION</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-2">Project Demo</h3>
                  <p className="text-sm text-muted-foreground mb-6">Watch the simulator in action and see the rocket-building and spaceflight experience.</p>
                </div>
                <ProjectLink kind="video" className="btn-secondary w-full py-3 text-xs tracking-wider">WATCH DEMO</ProjectLink>
              </div>

              <div className="card p-6 flex flex-col justify-between">
                <div>
                  <span className="label text-emerald">PLAYABLE SIMULATOR</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-2">Orbital Architect 2D</h3>
                  <p className="text-sm text-muted-foreground mb-6">Launch the simulator, build a rocket, and begin your own spaceflight mission.</p>
                </div>
                <Link to="/play" className="btn-primary w-full py-3 text-xs tracking-wider">LAUNCH SIMULATOR</Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10 — TEAM AND CHALLENGE */}
        <section id="team" className="py-20 border-t border-border bg-background/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="label text-cyan font-semibold tracking-widest block mb-2">SUBMISSION &amp; TEAM</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">BUILT BY A TEAM EXPLORING THE FUTURE OF SPACE EDUCATION</h2>
            </div>

            <div className="panel p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border">
                <div>
                  <span className="label block mb-1">TEAM NAME</span>
                  <p className="technical text-base font-bold text-foreground">SFU RACOONAUNTS</p>
                  <span className="label block mt-4 mb-1">SIMON FRASER UNIVERSITY</span>
                  <p className="text-sm text-muted-foreground"></p>
                </div>
                <div>
                  <span className="label block mb-1">SPACE APPS CHALLENGE</span>
                  <p className="technical text-base font-bold text-cyan">SPACE MISSION DESIGN GAME</p>
                  <span className="label block mt-4 mb-1">JAY KEWALRAMANI, AIDEN STORER, ALEJANDRO OLIVER, IKER MONTES SANCHEZ</span>
                  <p className="text-sm text-muted-foreground"></p>
                </div>
              </div>
              <p className="text-xs text-dim mt-5 leading-relaxed">
                Acknowledgement: Developed for the <strong className="text-muted-foreground">International Space Apps Challenge</strong>. Orbital Architect 2D is an independent educational project.
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
