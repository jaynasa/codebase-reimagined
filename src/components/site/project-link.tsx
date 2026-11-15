import type { ReactNode } from "react";

import { PROJECT_LINK_PLACEHOLDERS, PROJECT_LINKS, type ProjectLinkKind } from "@/lib/project-links";

import { useStatusToast } from "./status-toast";

/** Link to the GitHub repo or demo video; shows a placeholder notice until the URL is set. */
export function ProjectLink({
  kind,
  className,
  children,
}: {
  kind: ProjectLinkKind;
  className?: string;
  children: ReactNode;
}) {
  const { show } = useStatusToast();
  const url = PROJECT_LINKS[kind];

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  const placeholder = PROJECT_LINK_PLACEHOLDERS[kind];
  return (
    <a
      href={placeholder}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        show(
          `Placeholder URL (${placeholder}) replace with your live hosted simulator, GitHub repository, or video demonstration URL.`,
        );
      }}
    >
      {children}
    </a>
  );
}
