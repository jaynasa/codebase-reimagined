import { describe, expect, it } from "vitest";

import {
  PROJECT_LINKS,
  YOUTUBE_EMBED_URL,
  YOUTUBE_THUMBNAIL_URL,
  YOUTUBE_VIDEO_ID,
} from "@/lib/project-links";

// The demo video link drives both the "open video link" buttons and the on-page player.
describe("Project links", () => {
  it("points the demo video at the team's YouTube upload", () => {
    expect(PROJECT_LINKS.video).toBe("https://www.youtube.com/watch?v=SwCnnBL7dhE");
  });

  it("derives the on-page player from that same video", () => {
    expect(YOUTUBE_VIDEO_ID).toBe("SwCnnBL7dhE");
    expect(YOUTUBE_EMBED_URL).toBe("https://www.youtube-nocookie.com/embed/SwCnnBL7dhE");
    expect(YOUTUBE_THUMBNAIL_URL).toBe("https://i.ytimg.com/vi/SwCnnBL7dhE/hqdefault.jpg");
  });

  it("points the source code buttons at the team's GitHub repository", () => {
    expect(PROJECT_LINKS.github).toBe("https://github.com/jaynasa/codebase-reimagined");
  });
});
