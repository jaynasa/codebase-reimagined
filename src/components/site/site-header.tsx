import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-9 h-9 rounded-md bg-surface border border-cyan/50 flex items-center justify-center shadow-glow-sm group-hover:border-cyan transition">
              <svg className="w-5 h-5 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-28 12 12)" />
                <circle cx="19.5" cy="8.5" r="1.5" stroke="none" className="fill-emerald" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="technical font-bold text-sm sm:text-base tracking-wider text-foreground">ORBITAL ARCHITECT <span className="text-cyan">2D</span></span>
              <span className="label text-[9px] tracking-[0.14em] text-dim">MISSION CONTROL INTERFACE</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5" aria-label="Primary Navigation">
            <Link to="/" hash="overview" className="nav-link text-sm font-medium text-muted-foreground hover:text-cyan transition">Overview</Link>
            <Link to="/" hash="capabilities" className="nav-link text-sm font-medium text-muted-foreground hover:text-cyan transition">Capabilities</Link>
            <Link to="/" hash="how-it-works" className="nav-link text-sm font-medium text-muted-foreground hover:text-cyan transition">How It Works</Link>
            <Link to="/" hash="science" className="nav-link text-sm font-medium text-muted-foreground hover:text-cyan transition">Science</Link>
            <Link to="/" hash="impact" className="nav-link text-sm font-medium text-muted-foreground hover:text-cyan transition">Impact</Link>
            <Link to="/" hash="demo" className="nav-link text-sm font-medium text-muted-foreground hover:text-cyan transition">Demo</Link>
            <Link to="/" hash="team" className="nav-link text-sm font-medium text-muted-foreground hover:text-cyan transition">Team</Link>
            <Link to="/guide" className="text-xs technical font-semibold text-cyan hover:text-foreground transition flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-light border border-cyan/40">
              <span>📖 HOW TO PLAY</span>
            </Link>
          </nav>

          {/* Persistent Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/" hash="play" className="btn-primary px-4 py-2 text-xs sm:text-sm tracking-wide">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>LAUNCH SIMULATOR</span>
            </Link>
            <button type="button" onClick={() => setMenuOpen((o) => !o)} className="lg:hidden p-2 rounded-md bg-surface border border-border text-foreground hover:border-cyan" aria-label="Toggle Navigation Menu" aria-expanded={menuOpen}>
              <svg className={cn("w-5 h-5", menuOpen && "hidden")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={cn("w-5 h-5", !menuOpen && "hidden")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={cn("lg:hidden", !menuOpen && "hidden")} >
    <div className=" bg-surface border-b border-border px-4 pt-3 pb-5">
          <div className="flex flex-col space-y-2">
            <Link to="/" hash="overview" onClick={close} className="mobile-nav-link px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-surface-light hover:text-cyan">Overview</Link>
            <Link to="/" hash="capabilities" onClick={close} className="mobile-nav-link px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-surface-light hover:text-cyan">Capabilities</Link>
            <Link to="/" hash="how-it-works" onClick={close} className="mobile-nav-link px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-surface-light hover:text-cyan">How It Works</Link>
            <Link to="/" hash="science" onClick={close} className="mobile-nav-link px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-surface-light hover:text-cyan">Science</Link>
            <Link to="/" hash="impact" onClick={close} className="mobile-nav-link px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-surface-light hover:text-cyan">Impact</Link>
            <Link to="/" hash="demo" onClick={close} className="mobile-nav-link px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-surface-light hover:text-cyan">Demo</Link>
            <Link to="/" hash="team" onClick={close} className="mobile-nav-link px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-surface-light hover:text-cyan">Team</Link>
            <Link to="/guide" onClick={close} className="mobile-nav-link px-3 py-2.5 rounded-md text-sm font-semibold text-cyan bg-surface-light border border-cyan/40">📖 How To Play / Mission Guide</Link>
          </div>
        </div>
        </div>
      </header>
  );
}
