import { X, Trash2 } from "lucide-react";
import { usePlayerStore } from "@/stores/player-store";
import { useUiStore } from "@/stores/ui-store";
import { CoverArt } from "@/components/common/cover-art";
import { cn } from "@/lib/utils";

export function QueueSidebar() {
  const { queue, queueIndex, currentSong, removeFromQueue, clearQueue } = usePlayerStore();
  const { queueOpen, toggleQueue } = useUiStore();

  if (!queueOpen) return null;

  return (
    <aside className="flex w-72 shrink-0 flex-col border-l border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Queue</h2>
        <div className="flex items-center gap-1">
          {queue.length > 0 && (
            <button
              onClick={clearQueue}
              className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive-foreground"
              title="Clear queue"
            >
              <Trash2 size={14} />
            </button>
          )}
          <button onClick={toggleQueue} className="rounded p-1 text-muted-foreground hover:text-foreground">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {queue.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">Queue is empty</p>
        ) : (
          queue.map((song, i) => (
            <div
              key={`${song.id}-${i}`}
              className={cn(
                "flex items-center gap-2 px-3 py-2 transition-colors hover:bg-accent/50",
                currentSong?.id === song.id && i === queueIndex && "bg-accent/30",
              )}
            >
              <CoverArt src={song.cover_art} size={32} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{song.title || "Unknown"}</p>
                <p className="truncate text-xs text-muted-foreground">{song.artist || "Unknown"}</p>
              </div>
              <button
                onClick={() => removeFromQueue(i)}
                className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 [div:hover>&]:opacity-100"
              >
                <X size={12} />
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
