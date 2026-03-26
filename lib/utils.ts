import type { TaskStatus } from "@/types/app";

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

export function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
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
  if (status === "Tarefa ocasional") {
    return "bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/20 dark:bg-amber-400/12 dark:text-amber-200 dark:ring-amber-300/20";
  }

  return "bg-sky-500/12 text-sky-700 ring-1 ring-sky-500/20 dark:bg-sky-400/12 dark:text-sky-200 dark:ring-sky-300/20";
}
