import { useMemo } from "react";
import { Play, Search } from "lucide-react";
import { useLibraryStore } from "@/stores/library-store";
import { usePlayerStore } from "@/stores/player-store";
import { useUiStore } from "@/stores/ui-store";
import { CoverArt } from "@/components/common/cover-art";
import { FolderPicker } from "@/components/folder-picker";
import { cn } from "@/lib/utils";

export function LibraryPage() {
  const { songs, isScanning } = useLibraryStore();
  const { playSong, currentSong, isPlaying } = usePlayerStore();
  const { searchQuery, setSearchQuery } = useUiStore();

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return songs;
    const q = searchQuery.toLowerCase();
    return songs.filter(
      (s) =>
        s.title?.toLowerCase().includes(q) ||
        s.artist?.toLowerCase().includes(q) ||
        s.album?.toLowerCase().includes(q),
    );
  }, [songs, searchQuery]);

  function handlePlaySong(index: number) {
    const song = filtered[index];
    if (song) playSong(song, filtered);
  }

  function handlePlayAll() {
    if (filtered.length > 0) playSong(filtered[0]!, filtered);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <h1 className="text-lg font-bold">Library</h1>
        {filtered.length > 0 && (
          <button
            onClick={handlePlayAll}
            className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Play size={12} /> Play All
          </button>
        )}
        <div className="relative ml-auto">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {songs.length === 0 && !isScanning ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
          <FolderPicker />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              {searchQuery ? "No songs match your search." : "No songs found."}
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="w-10 px-3 py-2 text-center">#</th>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Artist</th>
                  <th className="hidden px-3 py-2 md:table-cell">Album</th>
                  <th className="w-16 px-3 py-2 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((song, i) => {
                  const isCurrent = currentSong?.id === song.id;
                  return (
                    <tr
                      key={song.id}
                      onClick={() => handlePlaySong(i)}
                      className={cn(
                        "group cursor-pointer border-b border-border/30 transition-colors hover:bg-accent/50",
                        isCurrent && "bg-accent/30",
                      )}
                    >
                      <td className="px-3 py-1.5 text-center">
                        {isCurrent && isPlaying ? (
                          <span className="text-primary">♪</span>
                        ) : (
                          <span className="text-muted-foreground group-hover:hidden">{i + 1}</span>
                        )}
                        <Play size={12} className="mx-auto hidden text-foreground group-hover:block" />
                      </td>
                      <td className="px-3 py-1.5">
                        <div className="flex items-center gap-2">
                          <CoverArt src={song.cover_art} size={32} />
                          <span className={cn("truncate font-medium", isCurrent && "text-primary")}>
                            {song.title || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="truncate px-3 py-1.5 text-muted-foreground">
                        {song.artist || "Unknown"}
                      </td>
                      <td className="hidden truncate px-3 py-1.5 text-muted-foreground md:table-cell">
                        {song.album || "Unknown"}
                      </td>
                      <td className="px-3 py-1.5 text-right text-muted-foreground">
                        {song.duration ? formatDuration(song.duration) : "--:--"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
