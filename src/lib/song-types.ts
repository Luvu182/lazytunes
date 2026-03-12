export interface Song {
  id: number;
  file_path: string;
  title: string | null;
  artist: string | null;
  album: string | null;
  duration: number | null;
  cover_art: string | null;
  file_size: number | null;
  modified_at: number | null;
  created_at: string;
}

export interface SongMetadata {
  file_path: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover_art: string | null;
  file_size: number;
  modified_at: number;
}

export interface ScanProgress {
  current: number;
  total: number;
}

export const SUPPORTED_EXTENSIONS = [".mp3", ".m4a", ".flac", ".ogg", ".wav"];
