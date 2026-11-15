import type { ReactNode } from "react";

import { BackToTop } from "./back-to-top";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { StatusToastProvider } from "./status-toast";

/** Shared chrome for the project website pages (home + mission guide). */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <StatusToastProvider>
      <div className="blueprint min-h-screen">
        <SiteHeader />
        {children}
        <SiteFooter />
        <BackToTop />
      </div>
    </StatusToastProvider>
  );
}
