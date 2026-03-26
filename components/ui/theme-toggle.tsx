"use client";

import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppContext();

  const isDark = theme === "dark";

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className="relative overflow-hidden"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%)]" />
      <span className="relative">
        {isDark ? (
          <SunIcon className="size-[18px]" />
        ) : (
          <MoonIcon className="size-[18px]" />
        )}
      </span>
    </Button>
  );
}
