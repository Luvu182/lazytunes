import { ListMusic } from "lucide-react";
import { usePlayerStore } from "@/stores/player-store";
import { useUiStore } from "@/stores/ui-store";
import { CoverArt } from "@/components/common/cover-art";
import { PlayerControls } from "./player-controls";
import { SeekBar } from "./seek-bar";
import { VolumeControl } from "./volume-control";
import { cn } from "@/lib/utils";

export function PlayerBar() {
  const { currentSong, queue } = usePlayerStore();
  const { toggleQueue, queueOpen } = useUiStore();

  return (
    <div className="flex h-20 shrink-0 items-center border-t border-border bg-card px-4">
      {/* Left: Song info */}
      <div className="flex w-56 items-center gap-3">
        {currentSong ? (
          <>
            <CoverArt src={currentSong.cover_art} size={48} className="rounded" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{currentSong.title || "Unknown"}</p>
              <p className="truncate text-xs text-muted-foreground">{currentSong.artist || "Unknown"}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No song playing</p>
        )}
      </div>

      {/* Center: Controls + seek */}
      <div className="flex flex-1 flex-col items-center gap-1">
        <PlayerControls />
        <div className="w-full max-w-md">
          <SeekBar />
        </div>
      </div>

      {/* Right: Volume + queue toggle */}
      <div className="flex w-56 items-center justify-end gap-2">
        <VolumeControl />
        <button
          onClick={toggleQueue}
          className={cn(
            "rounded p-1.5 transition-colors hover:bg-accent",
            queueOpen ? "text-primary" : "text-muted-foreground",
          )}
          title="Queue"
        >
          <ListMusic size={16} />
        </button>
        {queue.length > 0 && (
          <span className="text-xs text-muted-foreground">{queue.length}</span>
        )}
      </div>
    </div>
  );
}
