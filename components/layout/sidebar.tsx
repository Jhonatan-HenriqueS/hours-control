"use client";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import {
  ChartIcon,
  DashboardIcon,
  ListChecksIcon,
  LogOutIcon,
  XIcon,
} from "@/components/ui/icons";
import { LogoMark } from "@/components/ui/logo-mark";
import { cn } from "@/lib/utils";
import type { MenuIcon } from "@/types/app";

const iconMap: Record<MenuIcon, typeof DashboardIcon> = {
  chart: ChartIcon,
  dashboard: DashboardIcon,
  listChecks: ListChecksIcon,
};

interface SidebarContentProps {
  mobile?: boolean;
}

function SidebarContent({ mobile = false }: SidebarContentProps) {
  const {
    currentView,
    currentUser,
    isSidebarCollapsed,
    menuItems,
    logout,
    setCurrentView,
    setMobileMenuOpen,
    toggleSidebar,
  } = useAppContext();

  const collapsed = !mobile && isSidebarCollapsed;

  return (
    <div
      className=" flex h-full flex-col z-20 "
      onMouseLeave={toggleSidebar}
      onMouseEnter={toggleSidebar}
    >
      <div className="flex items-center justify-between gap-3 px-4 pb-6 pt-4">
        <LogoMark compact={collapsed} />
        {mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <XIcon className="size-[18px]" />
          </Button>
        )}
      </div>

      <nav className="flex-1 px-3">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-[22px] px-4 py-3 text-left transition duration-200 ease-out",
                  currentView === item.id
                    ? "bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--border)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--panel-soft)] hover:text-[var(--text-primary)]",
                  collapsed ? "justify-center px-3" : "justify-start",
                )}
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-2xl shadow-sm transition duration-200 ease-out dark:bg-white/8",
                    currentView === item.id
                      ? "bg-white/60 text-[var(--accent)]"
                      : "bg-[var(--panel-soft)] text-[var(--text-muted)] group-hover:bg-white/60 group-hover:text-[var(--accent)]",
                  )}
                >
                  <Icon className="size-5" />
                </span>
                {!collapsed ? (
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block text-sm font-semibold",
                        currentView === item.id
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]",
                      )}
                    >
                      {item.label}
                    </span>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="px-3 pb-4 pt-4">
        <div
          className={cn(
            "rounded-[26px] border border-[var(--border)] bg-[var(--panel-soft)] p-3",
            collapsed ? "space-y-3" : "space-y-4",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              collapsed ? "justify-center" : "justify-start",
            )}
          >
            <div className="grid size-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#0f766e,#38bdf8)] text-sm font-semibold uppercase tracking-[0.12em] text-white">
              {(currentUser?.name ?? "LT").slice(0, 2).toUpperCase()}
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                  {currentUser?.name}
                </p>
                <p className="truncate text-xs text-[var(--text-muted)]">
                  {currentUser?.email}
                </p>
              </div>
            ) : null}
          </div>

          <Button
            variant="outline"
            className={cn("w-full", collapsed ? "px-0" : "")}
            onClick={logout}
            leadingIcon={<LogOutIcon className="size-4" />}
          >
            {collapsed ? "" : "Sair"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { isSidebarCollapsed } = useAppContext();

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "hidden md:block md:shrink-0 md:transition-[width] md:duration-300 md:ease-out",
          isSidebarCollapsed ? "md:w-[120px]" : "md:w-[296px]",
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden px-4 py-4 md:block md:transition-[width] md:duration-300 md:ease-out",
          isSidebarCollapsed ? "md:w-[120px]" : "md:w-[296px]",
        )}
      >
        <div className="surface-panel h-[calc(100vh-2rem)] overflow-hidden rounded-[34px]">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}

export function MobileSidebar() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useAppContext();

  if (!isMobileMenuOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/52 backdrop-blur-sm"
        aria-label="Fechar menu"
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside className="absolute left-0 top-0 h-full w-[86vw] max-w-[340px] p-3">
        <div className="surface-panel animate-slide-up h-full rounded-[30px]">
          <SidebarContent mobile />
        </div>
      </aside>
    </div>
  );
}
