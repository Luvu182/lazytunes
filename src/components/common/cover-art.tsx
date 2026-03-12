import { Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoverArtProps {
  src: string | null;
  size?: number;
  className?: string;
}

export function CoverArt({ src, size = 40, className }: CoverArtProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded bg-secondary",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <Music size={size * 0.4} className="text-muted-foreground" />
      )}
    </div>
  );
}
