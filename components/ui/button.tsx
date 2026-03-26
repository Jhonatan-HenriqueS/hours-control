import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-white shadow-[0_18px_40px_rgba(15,118,110,0.28)] hover:bg-[var(--accent-strong)]",
  secondary:
    "border border-[var(--border)] bg-[var(--panel-soft)] text-[var(--text-primary)] hover:bg-[var(--panel)]",
  ghost:
    "bg-transparent text-[var(--text-primary)] hover:bg-[var(--accent-soft)]",
  outline:
    "border border-[var(--border-strong)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--panel-soft)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
  icon: "h-11 w-11 px-0",
};

export function Button({
  className,
  children,
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-[-0.01em] transition duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "disabled:pointer-events-none disabled:opacity-60",
        "active:scale-[0.99]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {leadingIcon ? <span className="shrink-0">{leadingIcon}</span> : null}
      {loading ? "Processando..." : children}
      {!loading && trailingIcon ? (
        <span className="shrink-0">{trailingIcon}</span>
      ) : null}
    </button>
  );
}
