/**
 * External project links. Leave a value empty until the real URL exists:
 * links with no URL show the "resource placeholder" notice instead of navigating.
 */
export const PROJECT_LINKS = {
  github: "https://github.com/jaynasa/codebase-reimagined",
  video: "https://www.youtube.com/watch?v=SwCnnBL7dhE",
} as const;

export type ProjectLinkKind = keyof typeof PROJECT_LINKS;

export const PROJECT_LINK_PLACEHOLDERS: Record<ProjectLinkKind, string> = {
  github: "[INSERT_GITHUB_URL]",
  video: "[INSERT_VIDEO_URL]",
};

/** YouTube video id parsed from the demo link; "" when the link isn't a YouTube watch URL. */
export const YOUTUBE_VIDEO_ID =
  /(?:[?&]v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/.exec(PROJECT_LINKS.video)?.[1] ?? "";

/** Cookie-free YouTube frame, used by the on-page demo player. */
export const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`;

/** Video cover art, also used as the page's social preview image. */
export const YOUTUBE_THUMBNAIL_URL = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
