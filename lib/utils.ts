import { CATEGORY_COLOR_OPTIONS } from "@/lib/constants";
import type { CategoryColor, TaskStatus } from "@/types/app";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function formatTaskDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data indefinida";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getRelativeDueLabel(value: string) {
  const targetDate = new Date(value);

  if (Number.isNaN(targetDate.getTime())) {
    return "Sem prazo definido";
  }

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const startOfTarget = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );
  const diffInDays = Math.round(
    (startOfTarget.getTime() - startOfToday.getTime()) / 86_400_000,
  );

  if (diffInDays === 0) {
    return "Entrega hoje";
  }

  if (diffInDays === 1) {
    return "Entrega amanhã";
  }

  if (diffInDays === -1) {
    return "Venceu ontem";
  }

  if (diffInDays < 0) {
    return `Venceu há ${Math.abs(diffInDays)} dias`;
  }

  return `Prazo em ${diffInDays} dias`;
}

export function getDueState(value: string) {
  const targetDate = new Date(value);

  if (Number.isNaN(targetDate.getTime())) {
    return "none" as const;
  }

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const startOfTarget = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );
  const diffInDays = Math.round(
    (startOfTarget.getTime() - startOfToday.getTime()) / 86_400_000,
  );

  if (diffInDays < 0) {
    return "overdue" as const;
  }

  if (diffInDays === 0) {
    return "today" as const;
  }

  return "upcoming" as const;
}

export function getNextTaskCardClasses(value?: string) {
  const dueState = value ? getDueState(value) : "none";

  if (dueState === "overdue") {
    return "border-rose-200/90 bg-[linear-gradient(135deg,rgba(255,241,242,0.98),rgba(255,228,230,0.96),rgba(254,205,211,0.92))] shadow-[0_4px_32px_rgba(244,63,94,0.12)] dark:border-rose-800/60 dark:bg-[linear-gradient(135deg,rgba(76,5,25,0.42),rgba(127,29,29,0.34),rgba(136,19,55,0.28))] dark:shadow-[0_4px_32px_rgba(225,29,72,0.18)]";
  }

  if (dueState === "today") {
    return "border-amber-200/90 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(254,243,199,0.96),rgba(253,230,138,0.88))] shadow-[0_4px_32px_rgba(245,158,11,0.12)] dark:border-amber-800/60 dark:bg-[linear-gradient(135deg,rgba(120,53,15,0.4),rgba(146,64,14,0.34),rgba(113,63,18,0.28))] dark:shadow-[0_4px_32px_rgba(217,119,6,0.18)]";
  }

  return "surface-card";
}

export function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export function getTaskClosestToToday<
  T extends { dueDate: string; createdAt: string },
>(tasks: T[]) {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return [...tasks].sort((left, right) => {
    const leftDate = new Date(left.dueDate);
    const rightDate = new Date(right.dueDate);
    const startOfLeft = new Date(
      leftDate.getFullYear(),
      leftDate.getMonth(),
      leftDate.getDate(),
    );
    const startOfRight = new Date(
      rightDate.getFullYear(),
      rightDate.getMonth(),
      rightDate.getDate(),
    );

    const leftDiffInDays = Math.round(
      (startOfLeft.getTime() - startOfToday.getTime()) / 86_400_000,
    );
    const rightDiffInDays = Math.round(
      (startOfRight.getTime() - startOfToday.getTime()) / 86_400_000,
    );
    const leftDistance = Math.abs(leftDiffInDays);
    const rightDistance = Math.abs(rightDiffInDays);

    if (leftDistance !== rightDistance) {
      return leftDistance - rightDistance;
    }

    if (leftDiffInDays !== rightDiffInDays) {
      return rightDiffInDays - leftDiffInDays;
    }

    return (
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
    );
  })[0];
}

export function sortTasksByDate<
  T extends { dueDate: string; createdAt: string },
>(tasks: T[]) {
  return [...tasks].sort((left, right) => {
    const leftTime = new Date(left.dueDate).getTime();
    const rightTime = new Date(right.dueDate).getTime();

    if (leftTime === rightTime) {
      return (
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
      );
    }

    return leftTime - rightTime;
  });
}

export function getStatusClasses(status: TaskStatus) {
  if (status === "Ocasional") {
    return "bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/20 dark:bg-amber-400/12 dark:text-amber-600 dark:ring-amber-300/20";
  }

  return "bg-sky-500/12 text-sky-700 ring-1 ring-sky-500/20 dark:bg-sky-400/12 dark:text-sky-600 dark:ring-sky-300/20";
}

export function getCategoryColorOption(color?: CategoryColor | null) {
  return CATEGORY_COLOR_OPTIONS.find((option) => option.id === color) ?? null;
}

export function getCategoryBadgeClasses(color?: CategoryColor | null) {
  return getCategoryColorOption(color)?.badgeClassName ??
    "bg-slate-500/12 text-slate-700 ring-slate-500/20 dark:bg-slate-400/12 dark:text-slate-200 dark:ring-slate-300/20";
}
