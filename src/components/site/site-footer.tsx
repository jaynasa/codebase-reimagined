import { Link } from "@tanstack/react-router";

import { ProjectLink } from "./project-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-md bg-cyan text-ink font-bold technical text-xs flex items-center justify-center">OA</div>
              <span className="technical font-bold text-sm tracking-wider text-foreground">ORBITAL ARCHITECT 2D</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-md">
              An interactive 2D rocket-building and spaceflight simulation created for space science education.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-cyan">Home</Link>
            <Link to="/guide" className="text-cyan hover:underline">Mission Guide</Link>
            <ProjectLink kind="github" className="hover:text-cyan">GitHub Repository</ProjectLink>
            <ProjectLink kind="video" className="hover:text-cyan">Video Demo</ProjectLink>
            <Link to="/play" className="hover:text-emerald">Play Simulator</Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dim">
          <p className="technical">© JAY KEWALRAMANI, AIDEN STORER, ALEJANDRO OLIVER, IKER MONTES SANCHEZ · SIMON FRASER UNIVERSITY</p>
          <p>SPACE EXPLORATION • Educational Simulation</p>
        </div>
      </div>
    </footer>
  );
}
