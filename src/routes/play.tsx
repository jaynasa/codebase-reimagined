import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Play Orbital Architect 2D — Rocket & Spaceflight Simulator" },
      {
        name: "description",
        content:
          "Build a multi-stage rocket in the VAB, launch it, and navigate orbital trajectories in the Orbital Architect 2D browser simulator.",
      },
      { property: "og:title", content: "Play Orbital Architect 2D" },
      {
        property: "og:description",
        content: "Design, launch and fly your own rocket in a 2D orbital mechanics simulator — right in your browser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlayPage,
});

function PlayPage() {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex h-9 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3 sm:px-5 text-xs technical">
        <Link to="/" className="text-muted-foreground hover:text-cyan transition">
          ← ORBITAL ARCHITECT 2D
        </Link>
        <Link to="/guide" className="font-semibold text-cyan hover:text-foreground transition">
          📖 MISSION GUIDE
        </Link>
      </div>
      <iframe
        src="/game/index.html"
        title="Orbital Architect 2D simulator"
        className="block w-full flex-1 border-0"
        allow="fullscreen"
        // The simulator reads keyboard input (M, throttle, staging) from its own window.
        onLoad={(e) => e.currentTarget.contentWindow?.focus()}
      />
    </div>
  );
}
