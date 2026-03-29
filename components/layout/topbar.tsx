"use client";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import { MenuIcon, SparklesIcon } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getFirstName } from "@/lib/utils";

export function Topbar() {
  const { currentUser, currentView, setMobileMenuOpen } = useAppContext();

  const todayLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-20 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="surface-panel flex items-center justify-between gap-3 rounded-[28px] px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="secondary"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <MenuIcon className="size-[18px]" />
          </Button>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              {currentView === "dashboard" ? "Dashboard" : "Tarefas"}
            </p>
            <h1 className="truncate text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-xl">
              {`Olá, ${getFirstName(currentUser?.name ?? "usuário")}`}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-2.5 sm:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Hoje
            </p>
            <p className="mt-0.5 text-sm text-[var(--text-primary)]">
              {todayLabel}
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2.5 lg:flex">
            <span className="grid size-9 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <SparklesIcon className="size-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                Ritmo em dia
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Continue alimentando seu pipeline pessoal
              </p>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
