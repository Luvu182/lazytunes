import { getDb } from "./database";
import type { Song, SongMetadata } from "./song-types";

export async function getAllSongs(): Promise<Song[]> {
  const db = await getDb();
  return db.select<Song[]>("SELECT * FROM songs ORDER BY artist, album, title");
}

export async function getSongByPath(filePath: string): Promise<Song | null> {
  const db = await getDb();
  const rows = await db.select<Song[]>("SELECT * FROM songs WHERE file_path = $1", [filePath]);
  return rows[0] ?? null;
}

export async function upsertSong(meta: SongMetadata): Promise<void> {
  const db = await getDb();
  await db.execute(
    `INSERT INTO songs (file_path, title, artist, album, duration, cover_art, file_size, modified_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT(file_path) DO UPDATE SET
       title = excluded.title,
       artist = excluded.artist,
       album = excluded.album,
       duration = excluded.duration,
       cover_art = excluded.cover_art,
       file_size = excluded.file_size,
       modified_at = excluded.modified_at`,
    [
      meta.file_path,
      meta.title,
      meta.artist,
      meta.album,
      meta.duration,
      meta.cover_art,
      meta.file_size,
      meta.modified_at,
    ],
  );
}

export async function deleteSongsByPaths(paths: string[]): Promise<void> {
  if (paths.length === 0) return;
  const db = await getDb();
  const placeholders = paths.map((_, i) => `$${i + 1}`).join(", ");
  await db.execute(`DELETE FROM songs WHERE file_path IN (${placeholders})`, paths);
}

export async function getSetting(key: string): Promise<string | null> {
  const db = await getDb();
  const rows = await db.select<Array<{ value: string }>>(
    "SELECT value FROM settings WHERE key = $1",
    [key],
  );
  return rows[0]?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  await db.execute(
    "INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
    [key, value],
  );
}
