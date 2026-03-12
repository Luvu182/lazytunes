import { usePlayerStore } from "@/stores/player-store";

export function SeekBar() {
  const { currentTime, duration, seek } = usePlayerStore();
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  }

  return (
    <div className="flex w-full items-center gap-2">
      <span className="w-10 text-right text-xs text-muted-foreground">{formatTime(currentTime)}</span>
      <div className="group relative h-1 flex-1 cursor-pointer rounded-full bg-secondary" onClick={handleClick}>
        <div
          className="h-full rounded-full bg-primary transition-[width] group-hover:bg-primary/80"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100"
          style={{ left: `${progress}%`, marginLeft: -6 }}
        />
      </div>
      <span className="w-10 text-xs text-muted-foreground">{formatTime(duration)}</span>
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
