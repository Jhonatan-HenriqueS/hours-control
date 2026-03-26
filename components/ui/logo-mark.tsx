import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  compact?: boolean;
}

export function LogoMark({ compact = false }: LogoMarkProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-2xl",
          compact ? "size-11" : "size-12",
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f766e,#38bdf8)]" />
        <div className="absolute inset-[1px] rounded-[15px] bg-[linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0.02))]" />
        <span className="relative text-sm font-semibold uppercase tracking-[0.22em] text-white">
          LT
        </span>
      </div>
      {!compact ? (
        <div className="space-y-0.5">
          <p className="text-sm font-semibold tracking-[0.08em] text-[var(--text-primary)]">
            {APP_NAME}
          </p>
        </div>
      ) : null}
    </div>
  );
}
