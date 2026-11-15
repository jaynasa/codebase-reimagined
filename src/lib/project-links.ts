/**
 * External project links. Leave a value empty until the real URL exists:
 * links with no URL show the "resource placeholder" notice instead of navigating.
 */
export const PROJECT_LINKS = {
  github: "https://github.com/jaynasa/codebase-reimagined",
  video: "",
} as const;

export type ProjectLinkKind = keyof typeof PROJECT_LINKS;

export const PROJECT_LINK_PLACEHOLDERS: Record<ProjectLinkKind, string> = {
  github: "[INSERT_GITHUB_URL]",
  video: "[INSERT_VIDEO_URL]",
};
