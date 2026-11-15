import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SiteShell } from "@/components/site/site-shell";
import { stageDeltaV } from "@/lib/rocket-equation";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Mission Guide — How to Play Orbital Architect 2D" },
      {
        name: "description",
        content:
          "Operator manual for Orbital Architect 2D: rocket assembly, delta-v and TWR, staging, flight controls, telemetry, orbital navigation and missions.",
      },
      { property: "og:title", content: "Mission Guide — How to Play Orbital Architect 2D" },
      {
        property: "og:description",
        content:
          "Learn to design, build, launch and navigate your own spacecraft, with an interactive delta-v calculator and glossary.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidePage,
});

const GUIDE_SECTIONS = [
  { id: "guide-01", label: "01 - Getting Started" },
  { id: "guide-02", label: "02 - Vehicle Assembly Building" },
  { id: "guide-03", label: "03 - Rocket Components" },
  { id: "guide-04", label: "04 - Engineering & Performance" },
  { id: "guide-05", label: "05 - Staging & Separation" },
  { id: "guide-06", label: "06 - Launch & Flight Controls" },
  { id: "guide-07", label: "07 - Flight Telemetry" },
  { id: "guide-08", label: "08 - Orbital Navigation" },
  { id: "guide-09", label: "09 - Moon Missions" },
  { id: "guide-10", label: "10 - Troubleshooting" },
  { id: "guide-11", label: "11 - Glossary" },
] as const;

function GuidePage() {
  const sectionsRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>("guide-01");
  const [tocHidden, setTocHidden] = useState(false);
  const [query, setQuery] = useState("");
  const [hiddenSections, setHiddenSections] = useState<Set<string>>(() => new Set());
  const [glossaryActive, setGlossaryActive] = useState<number | null>(null);
  const [isp, setIsp] = useState(310);
  const [m0, setM0] = useState(50);
  const [mf, setMf] = useState(12);
  const deltaV = useMemo(() => stageDeltaV(isp, m0, mf), [isp, m0, mf]);

  const scrollGuideTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
  }, []);

  // Reading progress + scroll spy
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / docHeight) * 100))) : 0;
      setProgress(pct);
      try {
        sessionStorage.setItem("oa_guide_progress", String(pct));
      } catch {
        // storage unavailable
      }
      let current = "guide-01";
      sectionsRef.current?.querySelectorAll<HTMLElement>(".guide-section").forEach((sec) => {
        if (!sec.hidden && sec.getBoundingClientRect().top <= 160) current = sec.id;
      });
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Search filter: hide sections whose text doesn't contain the query
  useEffect(() => {
    const q = query.toLowerCase().trim();
    const next = new Set<string>();
    if (q) {
      sectionsRef.current?.querySelectorAll<HTMLElement>(".guide-section").forEach((sec) => {
        if (!(sec.textContent ?? "").toLowerCase().includes(q)) next.add(sec.id);
      });
    }
    setHiddenSections(next);
  }, [query]);

  return (
    <SiteShell>
      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb & Top Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs technical text-muted-foreground">
              <Link to="/" className="hover:text-cyan transition">HOME</Link>
              <span>/</span>
              <span className="text-cyan font-semibold">MISSION GUIDE</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/" className="btn-secondary px-4 py-2 text-xs">
                ← RETURN TO MAIN WEBSITE
              </Link>
              <Link to="/play" className="btn-emerald px-4 py-2 text-xs">
                🚀 LAUNCH SIMULATOR
              </Link>
            </div>
          </div>

          {/* Sticky Reading Progress Bar */}
          <div className="w-full h-1.5 bg-surface rounded-full mb-8 overflow-hidden sticky top-[72px] z-40 border border-muted-foreground/12">
            <div className="h-full bg-linear-to-r from-cyan to-emerald transition-all duration-150" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Guide Hero Banner */}
          <div className="panel p-7 sm:p-10 mb-10 relative overflow-hidden bg-linear-to-br from-surface to-surface-light">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="label text-cyan font-semibold tracking-widest">MISSION DOCUMENTATION // OPERATOR MANUAL</span>
              <span className="technical text-xs text-emerald bg-emerald/10 border border-emerald/30 px-2.5 py-0.5 rounded">11 SECTIONS • ~10 MIN READ</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              ORBITAL ARCHITECT 2D - <span className="text-cyan">MISSION GUIDE</span>
            </h1>
            <p className="text-base sm:text-lg font-medium text-foreground/90 mb-2">
              Your guide to designing, building, launching, and navigating your own spacecraft.
            </p>
            <p className="text-sm text-muted-foreground max-w-3xl mb-6 leading-relaxed">
              From your first rocket assembly to orbital navigation, this guide walks you through the systems, controls, and engineering principles behind your mission.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
              <a href="#guide-01" onClick={(e) => { e.preventDefault(); scrollGuideTo("guide-01"); }} className="btn-primary text-xs px-5 py-2.5">START TUTORIAL ▼</a>
              <Link to="/play" className="btn-secondary text-xs px-5 py-2.5">OPEN SIMULATOR</Link>
              <span className="technical text-xs text-muted-foreground ml-auto">PROGRESS: {progress}%</span>
            </div>
          </div>

          {/* Two-Column Manual Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Guide Sidebar Navigation (Desktop Sticky, Mobile Collapsible) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-24">
              <div className="panel p-4">
                <div className="flex items-center justify-between lg:block mb-3">
                  <span className="label text-cyan font-semibold">GUIDE CONTENTS</span>
                  <button type="button" onClick={() => setTocHidden((h) => !h)} className="lg:hidden technical text-xs text-cyan border border-cyan/40 px-2 py-1 rounded">
                    TOGGLE INDEX
                  </button>
                </div>

                {/* Interactive Search Bar */}
                <div className="mb-4">
                  <label htmlFor="guide-search" className="sr-only">Search Mission Guide</label>
                  <div className="relative">
                    <input type="text" id="guide-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Delta-v, Throttle, Moon..." className="w-full text-xs py-2 pl-8 pr-3 bg-background border border-input rounded-md text-foreground focus:border-cyan outline-none" />
                    <svg className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  {query.trim() && (
                    <p className="technical text-[10px] text-cyan mt-1.5">
                      MATCHING SECTIONS: {GUIDE_SECTIONS.length - hiddenSections.size} OF {GUIDE_SECTIONS.length}
                    </p>
                  )}
                </div>

                <nav className={cn(tocHidden && "hidden")} aria-label="Guide Sections">
                  <ul className="space-y-1 text-xs">
                    {GUIDE_SECTIONS.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollGuideTo(section.id);
                          }}
                          className={cn(
                            "block px-3 py-2 rounded-md",
                            activeId === section.id
                              ? "bg-surface-light text-cyan font-semibold"
                              : "text-muted-foreground hover:bg-surface-light hover:text-cyan",
                          )}
                        >
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Manual Sections Content */}
            <main ref={sectionsRef} className="lg:col-span-9 space-y-8">

              {/* 01 — GETTING STARTED */}
              <section id="guide-01" hidden={hiddenSections.has("guide-01")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 01</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Getting Started</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Orbital Architect 2D follows a four-phase mission loop. Every flight begins in the assembly bay, moves through engineering verification, launches into atmospheric ascent, and concludes in orbital map navigation.
                </p>

                {/* Mission Flow Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-background border border-cyan/40 rounded-lg p-4">
                    <span className="technical text-xs font-bold text-cyan block mb-1">01 // BUILD</span>
                    <p className="text-xs text-muted-foreground">Open the VAB and stack command pods, fuel tanks, engines, and decouplers.</p>
                  </div>
                  <div className="bg-background border border-indigo/40 rounded-lg p-4">
                    <span className="technical text-xs font-bold text-indigo block mb-1">02 // CALCULATE</span>
                    <p className="text-xs text-muted-foreground">Verify wet/dry mass, liftoff TWR (&gt; 1.0), and total Δv before ignition.</p>
                  </div>
                  <div className="bg-background border border-emerald/40 rounded-lg p-4">
                    <span className="technical text-xs font-bold text-emerald block mb-1">03 // LAUNCH</span>
                    <p className="text-xs text-muted-foreground">Control throttle, pitch steering, and staging while tracking live telemetry.</p>
                  </div>
                  <div className="bg-background border border-amber/40 rounded-lg p-4">
                    <span className="technical text-xs font-bold text-amber block mb-1">04 // NAVIGATE</span>
                    <p className="text-xs text-muted-foreground">Switch to Map view, target the Celestial Body, and plot maneuver nodes.</p>
                  </div>
                </div>

                <div className="bg-background border border-emerald/30 rounded-lg p-4 text-xs text-foreground">
                  <strong className="text-emerald">Recommended First Steps:</strong> Open the simulator in VAB mode, load the <strong>Preset 3-Stage Rocket</strong> to see a flight-ready stack, inspect its stage delta-v breakdown, and switch to Flight mode to test a launch.
                </div>
              </section>

              {/* 02 — VEHICLE ASSEMBLY BUILDING */}
              <section id="guide-02" hidden={hiddenSections.has("guide-02")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 02</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Vehicle Assembly Building (VAB)</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  The VAB interface lets you construct rockets vertically from top to bottom. Components are selected from the part catalogue and arranged in logical stages.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                  {/* Labelled Rocket Schematic SVG */}
                  <div className="md:col-span-5 bg-background border border-border rounded-xl p-4">
                    <span className="label text-[9px] block text-center mb-2">SCHEMATIC // VERTICAL STACK</span>
                    <svg viewBox="0 0 260 250" className="w-full h-auto" role="img" aria-label="Sample rocket assembly schematic showing payload, tank, decoupler, and engines">
                      {/* Nose / Command Pod */}
                      <polygon points="100,15 82,45 118,45" strokeWidth="1.5" className="fill-grid stroke-cyan" />
                      <line x1="118" y1="32" x2="152" y2="32" strokeWidth="1" strokeDasharray="2 2" className="stroke-cyan" />
                      <text x="156" y="35" fontFamily="JetBrains Mono, monospace" fontSize="9" className="fill-foreground">COMMAND POD</text>

                      {/* Upper Fuel Tank */}
                      <rect x="82" y="47" width="36" height="44" rx="2" strokeWidth="1.5" className="fill-planet stroke-cyan" />
                      <line x1="118" y1="68" x2="152" y2="68" strokeWidth="1" strokeDasharray="2 2" className="stroke-cyan" />
                      <text x="156" y="71" fontFamily="JetBrains Mono, monospace" fontSize="9" className="fill-foreground">UPPER TANK</text>

                      {/* Upper Engine */}
                      <polygon points="88,91 112,91 116,105 84,105" strokeWidth="1.2" className="fill-metal stroke-muted-foreground" />

                      {/* Stack Decoupler */}
                      <rect x="80" y="107" width="40" height="8" fillOpacity="0.25" strokeWidth="1.2" className="fill-amber stroke-amber" />
                      <line x1="120" y1="111" x2="152" y2="111" strokeWidth="1" strokeDasharray="2 2" className="stroke-amber" />
                      <text x="156" y="114" fontFamily="JetBrains Mono, monospace" fontSize="9" className="fill-amber">DECOUPLER</text>

                      {/* Core Stage Fuel Tank */}
                      <rect x="78" y="117" width="44" height="78" rx="2" strokeWidth="1.5" className="fill-planet stroke-cyan" />
                      <line x1="122" y1="156" x2="152" y2="156" strokeWidth="1" strokeDasharray="2 2" className="stroke-cyan" />
                      <text x="156" y="159" fontFamily="JetBrains Mono, monospace" fontSize="9" className="fill-foreground">BOOSTER TANK</text>

                      {/* Main Engine */}
                      <polygon points="84,195 116,195 124,222 76,222" strokeWidth="1.5" className="fill-metal stroke-emerald" />
                      <line x1="124" y1="210" x2="152" y2="210" strokeWidth="1" strokeDasharray="2 2" className="stroke-emerald" />
                      <text x="156" y="213" fontFamily="JetBrains Mono, monospace" fontSize="9" className="fill-emerald">MAIN ENGINE</text>
                    </svg>
                  </div>

                  {/* Assembly Instructions */}
                  <div className="md:col-span-7 space-y-3 text-sm text-muted-foreground">
                    <p><strong className="text-foreground">1. Building the Stack:</strong> Click components in the catalogue to append them to your rocket. You can reorder or remove individual parts at any time.</p>
                    <p><strong className="text-foreground">2. Configuring Stages:</strong> Assign engines and decouplers to numbered stages. Stage 1 fires on the launch pad; higher-numbered stages fire sequentially after lower stages separate.</p>
                    <p><strong className="text-foreground">3. Inspecting Statistics:</strong> Check the VAB engineering readout panel to confirm total wet mass, dry mass, stage-by-stage Δv, and pad TWR before launching.</p>
                    <div className="bg-background p-3.5 rounded-lg border border-amber/30 text-xs text-amber-soft">
                      <strong>Structural Tip:</strong> Always place a stack decoupler directly above a lower-stage engine so the empty tank and heavy booster engine can be jettisoned cleanly once depleted.
                    </div>
                  </div>
                </div>
              </section>

              {/* 03 — ROCKET COMPONENTS */}
              <section id="guide-03" hidden={hiddenSections.has("guide-03")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 03</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Rocket Components</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Each component category in the catalogue contributes specific mass, propellant capacity, thrust, or utility to your spacecraft.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  <div className="card p-4">
                    <span className="label text-cyan text-[10px]">COMMAND &amp; AERO</span>
                    <h3 className="text-base font-bold text-foreground mt-1 mb-1">Command Pods &amp; Fairings</h3>
                    <p className="text-xs text-muted-foreground">Command pods house guidance and crew/payload at the top of the rocket. Aerodynamic fairings streamline the upper vehicle during atmospheric ascent.</p>
                  </div>
                  <div className="card p-4">
                    <span className="label text-cyan text-[10px]">PROPELLANT STORAGE</span>
                    <h3 className="text-base font-bold text-foreground mt-1 mb-1">Fuel Tanks</h3>
                    <p className="text-xs text-muted-foreground">Available in multiple sizes. Larger tanks hold more propellant for longer burns, increasing wet mass (m₀) relative to dry structural mass (mᶠ).</p>
                  </div>
                  <div className="card p-4">
                    <span className="label text-emerald text-[10px]">PROPULSION</span>
                    <h3 className="text-base font-bold text-foreground mt-1 mb-1">Rocket Engines</h3>
                    <p className="text-xs text-muted-foreground">Provide thrust (kN) and specific impulse (Isp). High-thrust engines lift heavy lower stages off Earth, while high-Isp engines maximize orbital Δv.</p>
                  </div>
                  <div className="card p-4">
                    <span className="label text-amber text-[10px]">SEPARATION</span>
                    <h3 className="text-base font-bold text-foreground mt-1 mb-1">Stack Decouplers</h3>
                    <p className="text-xs text-muted-foreground">Installed between stages to sever structural connections and discard spent tanks and engines mid-flight.</p>
                  </div>
                  <div className="card p-4">
                    <span className="label text-indigo text-[10px]">RECOVERY &amp; SURFACE</span>
                    <h3 className="text-base font-bold text-foreground mt-1 mb-1">Parachutes &amp; Landing Legs</h3>
                    <p className="text-xs text-muted-foreground">Parachutes slow descent in atmosphere, while landing legs provide structural touchdown support.</p>
                  </div>
                  <div className="card p-4">
                    <span className="label text-muted-foreground text-[10px]">SYSTEM BALANCE</span>
                    <h3 className="text-base font-bold text-foreground mt-1 mb-1">Mass vs. Thrust Trade-off</h3>
                    <p className="text-xs text-muted-foreground">Adding payload or fuel increases weight; without matching engine thrust, liftoff TWR drops below 1.0 and the rocket cannot climb.</p>
                  </div>
                </div>
              </section>

              {/* 04 — ENGINEERING & PERFORMANCE */}
              <section id="guide-04" hidden={hiddenSections.has("guide-04")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 04</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Engineering &amp; Performance</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Before launching, inspect your vehicle's engineering readouts. Understanding <strong className="text-foreground">Delta-v (Δv)</strong>, <strong className="text-foreground">Thrust-to-Weight Ratio (TWR)</strong>, and <strong className="text-foreground">Mass</strong> lets you predict whether your design can reach orbit and the Target.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="card p-5">
                    <h3 className="text-base font-bold text-cyan mb-2">Delta-v (Δv) — Velocity Budget</h3>
                    <div className="bg-background p-3 rounded-md border border-border technical text-center text-sm font-bold text-cyan mb-3">
                      Δv = Isp × g₀ × ln(m₀ / mᶠ)
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Delta-v is the total velocity change your rocket can perform. Higher specific impulse (<strong className="text-foreground">Isp</strong>) and a larger ratio of initial wet mass (<strong className="text-foreground">m₀</strong>) to empty dry mass (<strong className="text-foreground">mᶠ</strong>) yield higher Δv.
                    </p>
                  </div>

                  <div className="card p-5">
                    <h3 className="text-base font-bold text-emerald mb-2">Thrust-to-Weight Ratio (TWR)</h3>
                    <div className="bg-background p-3 rounded-md border border-border technical text-center text-sm font-bold text-emerald mb-3">
                      TWR = Thrust / Weight
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li><span className="text-rose font-bold technical">TWR &lt; 1.0:</span> Too heavy to lift off; rocket stays on pad.</li>
                      <li><span className="text-amber font-bold technical">TWR = 1.0:</span> Thrust balances gravity; zero vertical climb.</li>
                      <li><span className="text-emerald font-bold technical">TWR &gt; 1.0:</span> Upward net acceleration for liftoff and ascent.</li>
                    </ul>
                  </div>
                </div>

                {/* Interactive Educational Delta-v Calculator */}
                <div className="bg-background border border-cyan/40 rounded-xl p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="label text-cyan">INTERACTIVE EDUCATIONAL TOOL // ROCKET EQUATION</span>
                    <span className="technical text-[10px] text-muted-foreground">g₀ = 9.81 m/s²</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-4">Single-Stage Delta-v Calculator</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5 text-xs">
                    <div>
                      <label htmlFor="calc-isp" className="block text-muted-foreground mb-1.5">Specific Impulse (Isp): <span className="technical font-bold text-cyan">{isp} s</span></label>
                      <input type="range" id="calc-isp" min="200" max="450" value={isp} onChange={(e) => setIsp(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="calc-m0" className="block text-muted-foreground mb-1.5">Initial Wet Mass (m₀): <span className="technical font-bold text-cyan">{m0} t</span></label>
                      <input type="range" id="calc-m0" min="10" max="120" value={m0} onChange={(e) => setM0(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="calc-mf" className="block text-muted-foreground mb-1.5">Final Dry Mass (mᶠ): <span className="technical font-bold text-cyan">{mf} t</span></label>
                      <input type="range" id="calc-mf" min="2" max="40" value={mf} onChange={(e) => setMf(Number(e.target.value))} className="w-full" />
                    </div>
                  </div>
                  <div className="p-3.5 bg-surface rounded-lg border border-border flex flex-wrap items-center justify-between gap-2">
                    <span className="label">ESTIMATED STAGE DELTA-V (Δv):</span>
                    {deltaV === null ? (
                      <span className="technical text-sm font-bold text-rose">Wet mass must exceed dry mass</span>
                    ) : (
                      <span className="technical text-lg font-bold text-emerald">{Math.round(deltaV).toLocaleString("en-US")} m/s</span>
                    )}
                  </div>
                </div>
              </section>

              {/* 05 — STAGING & SEPARATION */}
              <section id="guide-05" hidden={hiddenSections.has("guide-05")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 05</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Staging &amp; Separation</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Once a lower fuel tank runs dry, its empty casing and heavy booster engine become dead dry mass (<strong className="text-foreground">mᶠ</strong>). Discarding spent stages via stack decouplers lowers the vehicle's mass, dramatically increasing the Δv generated by upper-stage engines.
                </p>
                <div className="bg-background border border-border rounded-lg p-4 text-xs text-muted-foreground space-y-2">
                  <p><strong className="text-cyan">Practical Multistage Sequence:</strong></p>
                  <p>1. <strong>Stage 1 (Liftoff):</strong> High-thrust booster lifts the full rocket out of the dense lower atmosphere.</p>
                  <p>2. <strong>Separation:</strong> When Stage 1 fuel reaches 0%, trigger staging to decouple the booster and ignite Stage 2.</p>
                  <p>3. <strong>Stage 2 &amp; 3 (Orbit &amp; Transfer):</strong> Lighter upper stages accelerate the payload to orbital speed and execute the transfer burn.</p>
                </div>
              </section>

              {/* 06 — LAUNCH & FLIGHT CONTROLS */}
              <section id="guide-06" hidden={hiddenSections.has("guide-06")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 06</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Launch &amp; Flight Controls</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Switch from VAB to Flight mode to place your rocket on the launch pad and take direct command of propulsion, attitude, and staging.
                </p>

                {/* Control Reference Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 text-xs">
                  <div className="card p-3.5">
                    <strong className="text-cyan block mb-1">Throttle Control</strong>
                    <span className="text-muted-foreground">Adjusts engine thrust from 0% to 100%. Use 100% at liftoff; throttle down to fine-tune orbital burns.</span>
                  </div>
                  <div className="card p-3.5">
                    <strong className="text-cyan block mb-1">Steering / Orientation</strong>
                    <span className="text-muted-foreground">Rotates rocket pitch left/right to perform a gradual gravity turn from vertical climb toward horizontal orbital flight.</span>
                  </div>
                  <div className="card p-3.5">
                    <strong className="text-emerald block mb-1">Stage Activation / Separation</strong>
                    <span className="text-muted-foreground">Triggers the next stage in sequence, igniting engines or firing stack decouplers when fuel is depleted.</span>
                  </div>
                  <div className="card p-3.5">
                    <strong className="text-emerald block mb-1">Stability Assistance (SAS)</strong>
                    <span className="text-muted-foreground">Dampens rotational drift and holds your selected heading automatically during powered burns.</span>
                  </div>
                  <div className="card p-3.5">
                    <strong className="text-amber block mb-1">Time Acceleration</strong>
                    <span className="text-muted-foreground">Speeds up simulation time during long orbital coasts between burns. Return to 1x before executing maneuvers.</span>
                  </div>
                  <div className="card p-3.5">
                    <strong className="text-amber block mb-1">Parachute Deployment &amp; Map Toggle</strong>
                    <span className="text-muted-foreground">Deploys recovery chutes during atmospheric descent; toggle Map mode (M) to view Earth-Planet orbital trajectories.</span>
                  </div>
                </div>

                {/* 8-Step Beginner Launch Walkthrough */}
                <div className="bg-background border border-border rounded-xl p-5">
                  <span className="label text-emerald block mb-3">BEGINNER LAUNCH WALKTHROUGH</span>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-muted-foreground list-decimal list-inside">
                    <li><strong className="text-foreground">Verify rocket configuration</strong> in the VAB stack.</li>
                    <li><strong className="text-foreground">Check vehicle performance</strong> (pad TWR &gt; 1.2).</li>
                    <li><strong className="text-foreground">Switch to Flight</strong> and enable SAS stability.</li>
                    <li><strong className="text-foreground">Apply full throttle</strong> and ignite Stage 1.</li>
                    <li><strong className="text-foreground">Pitch gradually</strong> as altitude increases to build horizontal speed.</li>
                    <li><strong className="text-foreground">Separate spent stages</strong> immediately when fuel hits 0%.</li>
                    <li><strong className="text-foreground">Monitor telemetry</strong> (apoapsis, periapsis, and remaining Δv).</li>
                    <li><strong className="text-foreground">Open Orbital Map</strong> to plan orbital insertion and lunar transfer.</li>
                  </ol>
                </div>
              </section>

              {/* 07 — FLIGHT TELEMETRY */}
              <section id="guide-07" hidden={hiddenSections.has("guide-07")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 07</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Flight Telemetry</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  The flight telemetry dashboard displays live spacecraft instrumentation so you can make informed burn and staging decisions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="bg-background p-3.5 rounded-lg border border-border">
                    <span className="technical font-bold text-cyan block mb-1">ALTITUDE &amp; VELOCITY</span>
                    <p className="text-muted-foreground">Measures height above Earth's surface and total speed. Both must climb steadily to clear atmosphere and achieve orbital velocity.</p>
                  </div>
                  <div className="bg-background p-3.5 rounded-lg border border-border">
                    <span className="technical font-bold text-cyan block mb-1">APOAPSIS &amp; PERIAPSIS</span>
                    <p className="text-muted-foreground">Highest and lowest altitudes of your predicted orbit. When periapsis rises above the atmosphere, you are in stable orbit.</p>
                  </div>
                  <div className="bg-background p-3.5 rounded-lg border border-border">
                    <span className="technical font-bold text-emerald block mb-1">REMAINING Δv &amp; FUEL %</span>
                    <p className="text-muted-foreground">Tracks propellant left in the active stage and remaining velocity budget so you know when to stage or conserve fuel.</p>
                  </div>
                  <div className="bg-background p-3.5 rounded-lg border border-border">
                    <span className="technical font-bold text-emerald block mb-1">CURRENT TWR</span>
                    <p className="text-muted-foreground">Displays live thrust-to-weight ratio, which rises as propellant burns off and total vehicle mass decreases.</p>
                  </div>
                  <div className="bg-background p-3.5 rounded-lg border border-border">
                    <span className="technical font-bold text-amber block mb-1">ACTIVE STAGE &amp; MISSION TIME</span>
                    <p className="text-muted-foreground">Shows which stage is currently active and elapsed mission clock time since liftoff.</p>
                  </div>
                </div>
              </section>

              {/* 08 — ORBITAL NAVIGATION */}
              <section id="guide-08" hidden={hiddenSections.has("guide-08")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 08</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Orbital Navigation</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Reaching space altitude alone does not put a spacecraft in orbit, if you fly straight up, gravity pulls you straight back down. Entering orbit requires accelerating sideways fast enough that your curved fall matches Earth's curvature.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div className="card p-4">
                    <strong className="text-cyan block mb-1">Orbital Map Controls</strong>
                    <p>Focus the camera on your rocket, Earth, or the Target, and zoom in or out to inspect trajectory arcs and phase angles.</p>
                  </div>
                  <div className="card p-4">
                    <strong className="text-amber block mb-1">Maneuver Nodes</strong>
                    <p>Place a maneuver node along your orbit and adjust <strong className="text-foreground">prograde</strong> (along velocity) or <strong className="text-foreground">radial</strong> vectors to preview how a burn reshapes your trajectory.</p>
                  </div>
                </div>
              </section>

              {/* 09 — MISSIONS */}
              <section id="guide-09" hidden={hiddenSections.has("guide-09")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 09</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Missions</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Planning a lunar transfer demonstrates how orbital timing and Δv budgets work together in the simplified 2D Earth-Planet environment:
                </p>
                <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside bg-background p-4 rounded-lg border border-border">
                  <li><strong className="text-foreground">Prepare a Multi-Stage Rocket:</strong> Use the preset 3-stage rocket or build a vehicle with generous upper-stage Δv.</li>
                  <li><strong className="text-foreground">Establish Parking Orbit:</strong> Launch into a stable low Earth orbit with both apoapsis and periapsis clear of the atmosphere.</li>
                  <li><strong className="text-foreground">Target the Celestial Body:</strong> Open Map view, select the Celestial Body as your target, and review the estimated lunar transfer Δv and orbital phase angle.</li>
                  <li><strong className="text-foreground">Plot &amp; Execute Transfer Node:</strong> Use automatic transfer node plotting or fine-tune a prograde maneuver node so your predicted trajectory intercepts the target's orbital path, then execute the burn.</li>
                </ol>
              </section>

              {/* 10 — TROUBLESHOOTING */}
              <section id="guide-10" hidden={hiddenSections.has("guide-10")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 10</span>
                <h2 className="text-2xl font-bold text-foreground mb-3">Troubleshooting</h2>
                <div className="space-y-3 text-xs">
                  <div className="bg-background p-3.5 rounded-lg border border-border">
                    <strong className="text-rose block mb-1">Issue: Rocket will not lift off the pad</strong>
                    <p className="text-muted-foreground"><strong>Cause:</strong> Throttle is at 0%, engine stage is not activated, or pad TWR is &lt; 1.0. <strong>Action:</strong> Increase throttle to 100%, fire Stage 1, or attach a higher-thrust engine / reduce fuel weight in VAB.</p>
                  </div>
                  <div className="bg-background p-3.5 rounded-lg border border-border">
                    <strong className="text-amber block mb-1">Issue: Rocket runs out of fuel before reaching orbit</strong>
                    <p className="text-muted-foreground"><strong>Cause:</strong> Insufficient total Δv or carrying empty booster stages without separating. <strong>Action:</strong> Add a stack decoupler between stages and pitch gradually during ascent rather than burning straight up.</p>
                  </div>
                  <div className="bg-background p-3.5 rounded-lg border border-border">
                    <strong className="text-amber block mb-1">Issue: Trajectory misses the target</strong>
                    <p className="text-muted-foreground"><strong>Cause:</strong> Transfer burn executed at the wrong orbital phase angle or inaccurate Δv magnitude. <strong>Action:</strong> Target the Celestial Body in Map view and use the maneuver node prograde controls to align the intercept before burning.</p>
                  </div>
                </div>
              </section>

              {/* 11 — GLOSSARY */}
              <section id="guide-11" hidden={hiddenSections.has("guide-11")} className="panel p-6 sm:p-8 guide-section scroll-mt-28">
                <span className="label text-cyan block mb-1">SECTION 11</span>
                <h2 className="text-2xl font-bold text-foreground mb-2">Glossary</h2>
                <p className="text-xs text-muted-foreground mb-4">Click any aerospace term below to highlight its definition.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <button type="button" onClick={() => setGlossaryActive(0)} className={cn("glossary-card text-left card p-3.5 focus:outline-none", glossaryActive === 0 && "border-cyan bg-surface-light")}>
                    <strong className="text-cyan technical block mb-0.5">Apoapsis</strong>
                    <span className="text-muted-foreground">The highest altitude point along an elliptical orbit around a celestial body.</span>
                  </button>
                  <button type="button" onClick={() => setGlossaryActive(1)} className={cn("glossary-card text-left card p-3.5 focus:outline-none", glossaryActive === 1 && "border-cyan bg-surface-light")}>
                    <strong className="text-cyan technical block mb-0.5">Periapsis</strong>
                    <span className="text-muted-foreground">The lowest altitude point along an orbit around a celestial body.</span>
                  </button>
                  <button type="button" onClick={() => setGlossaryActive(2)} className={cn("glossary-card text-left card p-3.5 focus:outline-none", glossaryActive === 2 && "border-cyan bg-surface-light")}>
                    <strong className="text-cyan technical block mb-0.5">Delta-v (Δv)</strong>
                    <span className="text-muted-foreground">Change in velocity; measures the total maneuver capability available from a rocket's propellant and engines.</span>
                  </button>
                  <button type="button" onClick={() => setGlossaryActive(3)} className={cn("glossary-card text-left card p-3.5 focus:outline-none", glossaryActive === 3 && "border-cyan bg-surface-light")}>
                    <strong className="text-cyan technical block mb-0.5">Dry Mass (mᶠ)</strong>
                    <span className="text-muted-foreground">The mass of a rocket stage after all usable propellant has been consumed.</span>
                  </button>
                  <button type="button" onClick={() => setGlossaryActive(4)} className={cn("glossary-card text-left card p-3.5 focus:outline-none", glossaryActive === 4 && "border-cyan bg-surface-light")}>
                    <strong className="text-cyan technical block mb-0.5">Specific Impulse (Isp)</strong>
                    <span className="text-muted-foreground">A measure of rocket engine efficiency (in seconds), representing thrust produced per unit of propellant flow.</span>
                  </button>
                  <button type="button" onClick={() => setGlossaryActive(5)} className={cn("glossary-card text-left card p-3.5 focus:outline-none", glossaryActive === 5 && "border-cyan bg-surface-light")}>
                    <strong className="text-cyan technical block mb-0.5">Thrust-to-Weight Ratio (TWR)</strong>
                    <span className="text-muted-foreground">Ratio of engine thrust to gravitational weight; must exceed 1.0 for vertical liftoff.</span>
                  </button>
                  <button type="button" onClick={() => setGlossaryActive(6)} className={cn("glossary-card text-left card p-3.5 focus:outline-none", glossaryActive === 6 && "border-cyan bg-surface-light")}>
                    <strong className="text-cyan technical block mb-0.5">Maneuver Node</strong>
                    <span className="text-muted-foreground">A planned point along an orbit where prograde or radial Δv adjustments are previewed before burning.</span>
                  </button>
                  <button type="button" onClick={() => setGlossaryActive(7)} className={cn("glossary-card text-left card p-3.5 focus:outline-none", glossaryActive === 7 && "border-cyan bg-surface-light")}>
                    <strong className="text-cyan technical block mb-0.5">Rocket Staging</strong>
                    <span className="text-muted-foreground">The sequential separation of depleted fuel tanks and booster engines to reduce dead weight during flight.</span>
                  </button>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
