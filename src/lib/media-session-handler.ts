import type { Song } from "./song-types";

/** Update the browser/OS MediaSession with current song metadata */
export function updateMediaSession(song: Song): void {
  if (!("mediaSession" in navigator)) return;

  const artwork: MediaImage[] = [];
  if (song.cover_art) {
    artwork.push({ src: song.cover_art, sizes: "512x512", type: "image/jpeg" });
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title: song.title || "Unknown",
    artist: song.artist || "Unknown Artist",
    album: song.album || "Unknown Album",
    artwork,
  });
}

/** Register MediaSession action handlers that delegate to player store actions */
export function initMediaSessionHandlers(actions: {
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
}): void {
  if (!("mediaSession" in navigator)) return;

  navigator.mediaSession.setActionHandler("play", () => actions.togglePlay());
  navigator.mediaSession.setActionHandler("pause", () => actions.togglePlay());
  navigator.mediaSession.setActionHandler("previoustrack", () => actions.prev());
  navigator.mediaSession.setActionHandler("nexttrack", () => actions.next());
  navigator.mediaSession.setActionHandler("seekto", (details) => {
    if (details.seekTime != null) actions.seek(details.seekTime);
  });
}
