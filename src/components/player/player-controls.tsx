import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from "lucide-react";
import { usePlayerStore } from "@/stores/player-store";
import { cn } from "@/lib/utils";

export function PlayerControls() {
  const { isPlaying, shuffleEnabled, repeatMode, togglePlay, next, prev, toggleShuffle, cycleRepeat } =
    usePlayerStore();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleShuffle}
        className={cn(
          "rounded p-1.5 transition-colors hover:bg-accent",
          shuffleEnabled ? "text-primary" : "text-muted-foreground",
        )}
        title="Shuffle"
      >
        <Shuffle size={14} />
      </button>
      <button onClick={prev} className="rounded p-1.5 text-foreground transition-colors hover:bg-accent" title="Previous">
        <SkipBack size={16} />
      </button>
      <button
        onClick={togglePlay}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>
      <button onClick={next} className="rounded p-1.5 text-foreground transition-colors hover:bg-accent" title="Next">
        <SkipForward size={16} />
      </button>
      <button
        onClick={cycleRepeat}
        className={cn(
          "rounded p-1.5 transition-colors hover:bg-accent",
          repeatMode !== "off" ? "text-primary" : "text-muted-foreground",
        )}
        title={`Repeat: ${repeatMode}`}
      >
        {repeatMode === "one" ? <Repeat1 size={14} /> : <Repeat size={14} />}
      </button>
    </div>
  );
}
