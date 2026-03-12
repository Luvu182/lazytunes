import { Volume2, Volume1, VolumeX } from "lucide-react";
import { usePlayerStore } from "@/stores/player-store";

export function VolumeControl() {
  const { volume, isMuted, setVolume, toggleMute } = usePlayerStore();
  const displayVolume = isMuted ? 0 : volume;

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setVolume(Math.max(0, Math.min(1, ratio)));
  }

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="flex items-center gap-2">
      <button onClick={toggleMute} className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground">
        <VolumeIcon size={16} />
      </button>
      <div className="group relative h-1 w-20 cursor-pointer rounded-full bg-secondary" onClick={handleClick}>
        <div
          className="h-full rounded-full bg-muted-foreground transition-[width] group-hover:bg-primary"
          style={{ width: `${displayVolume * 100}%` }}
        />
      </div>
    </div>
  );
}
