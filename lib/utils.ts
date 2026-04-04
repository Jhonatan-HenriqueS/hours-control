import { CATEGORY_COLOR_OPTIONS, WEEKDAY_OPTIONS } from "@/lib/constants";
import type {
  CategoryColor,
  TaskStatus,
  WeekdayId,
} from "@/types/app";

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

  return formatDateLabel(date);
}

export function formatDateLabel(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

export function isValidDurationValue(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function formatDurationLabel(value?: string | null) {
  if (!value || !isValidDurationValue(value)) {
    return "Duração indefinida";
  }

  const [hours, minutes] = value.split(":").map(Number);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}min`;
}

function getStartOfDate(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function getDiffInDays(targetDate: Date, baseDate = new Date()) {
  const startOfToday = getStartOfDate(baseDate);
  const startOfTarget = getStartOfDate(targetDate);

  return Math.round(
    (startOfTarget.getTime() - startOfToday.getTime()) / 86_400_000,
  );
}

export function sortWeekdays(days: WeekdayId[]) {
  return [...days].sort((left, right) => {
    const leftIndex =
      WEEKDAY_OPTIONS.find((option) => option.id === left)?.index ?? 99;
    const rightIndex =
      WEEKDAY_OPTIONS.find((option) => option.id === right)?.index ?? 99;

    return leftIndex - rightIndex;
  });
}

export function getWeekdaysLabel(days?: WeekdayId[] | null) {
  if (!days?.length) {
    return "Nenhum dia selecionado";
  }

  return sortWeekdays(days)
    .map(
      (day) =>
        WEEKDAY_OPTIONS.find((option) => option.id === day)?.shortLabel ?? day,
    )
    .join(", ");
}

export function getNextRoutineDate(
  days?: WeekdayId[] | null,
  baseDate = new Date(),
) {
  if (!days?.length) {
    return null;
  }

  const dayIndexes = sortWeekdays(days).map(
    (day) => WEEKDAY_OPTIONS.find((option) => option.id === day)?.index ?? -1,
  );
  const currentDay = baseDate.getDay();
  const nextOffset = dayIndexes
    .map((index) => (index - currentDay + 7) % 7)
    .sort((left, right) => left - right)[0];

  if (nextOffset === undefined || nextOffset < 0) {
    return null;
  }

  const nextDate = getStartOfDate(baseDate);
  nextDate.setDate(nextDate.getDate() + nextOffset);

  return nextDate;
}

export function getNextRoutineWeekdayId(
  days?: WeekdayId[] | null,
  baseDate = new Date(),
) {
  const nextDate = getNextRoutineDate(days, baseDate);

  if (!nextDate) {
    return null;
  }

  return (
    WEEKDAY_OPTIONS.find((option) => option.index === nextDate.getDay())?.id ??
    null
  );
}

export function getRelativeDateLabel(targetDate?: Date | null) {
  if (!targetDate) {
    return "Sem prazo definido";
  }

  const diffInDays = getDiffInDays(targetDate);

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

export function getRelativeDueLabel(value: string) {
  const targetDate = new Date(value);

  if (Number.isNaN(targetDate.getTime())) {
    return "Sem prazo definido";
  }

  return getRelativeDateLabel(targetDate);
}

export function getDueState(value: string) {
  const targetDate = new Date(value);

  if (Number.isNaN(targetDate.getTime())) {
    return "none" as const;
  }

  const diffInDays = getDiffInDays(targetDate);

  if (diffInDays < 0) {
    return "overdue" as const;
  }

  if (diffInDays === 0) {
    return "today" as const;
  }

  return "upcoming" as const;
}

function getDueStateFromDate(targetDate?: Date | null) {
  if (!targetDate) {
    return "none" as const;
  }

  const diffInDays = getDiffInDays(targetDate);

  if (diffInDays < 0) {
    return "overdue" as const;
  }

  if (diffInDays === 0) {
    return "today" as const;
  }

  return "upcoming" as const;
}

type SchedulableTask = {
  dueDate: string;
  status: TaskStatus;
  routineDays?: WeekdayId[];
  createdAt: string;
};

type RoutineResettableTask = SchedulableTask & {
  isCompleted?: boolean;
  completedAt?: string | null;
};

export function getTaskNextDueDate(task?: Partial<SchedulableTask> | null) {
  if (!task) {
    return null;
  }

  if (task.status === "Rotina") {
    return getNextRoutineDate(task.routineDays);
  }

  const dueDate = task.dueDate ? new Date(task.dueDate) : null;

  if (!dueDate || Number.isNaN(dueDate.getTime())) {
    return null;
  }

  return dueDate;
}

export function shouldResetRoutineTask(
  task: Partial<RoutineResettableTask> | null | undefined,
  currentDate = new Date(),
) {
  if (
    !task ||
    task.status !== "Rotina" ||
    !task.isCompleted ||
    !task.routineDays?.length
  ) {
    return false;
  }

  const referenceValue = task.completedAt ?? task.createdAt;

  if (!referenceValue) {
    return false;
  }

  const referenceDate = new Date(referenceValue);

  if (Number.isNaN(referenceDate.getTime())) {
    return false;
  }

  const currentDay = getStartOfDate(currentDate);

  for (
    const cursor = getStartOfDate(referenceDate);
    cursor.getTime() < currentDay.getTime();
    cursor.setDate(cursor.getDate() + 1)
  ) {
    const weekday = WEEKDAY_OPTIONS.find(
      (option) => option.index === cursor.getDay(),
    )?.id;

    if (weekday && task.routineDays.includes(weekday)) {
      return true;
    }
  }

  return false;
}

export function getTaskPrimaryScheduleLabel(task: {
  dueDate: string;
  status: TaskStatus;
  routineDays?: WeekdayId[];
}) {
  if (task.status === "Rotina") {
    return getWeekdaysLabel(task.routineDays);
  }

  return formatTaskDate(task.dueDate);
}

export function getTaskRelativeScheduleLabel(task: {
  dueDate: string;
  status: TaskStatus;
  routineDays?: WeekdayId[];
}) {
  return getRelativeDateLabel(getTaskNextDueDate(task));
}

export function getNextTaskCardClasses(task?: Partial<SchedulableTask> | null) {
  const nextDueDate = getTaskNextDueDate(task);
  const dueState = getDueStateFromDate(nextDueDate);

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

export function getTaskClosestToToday<T extends SchedulableTask>(tasks: T[]) {
  return [...tasks].sort((left, right) => {
    const leftDate = getTaskNextDueDate(left);
    const rightDate = getTaskNextDueDate(right);

    if (!leftDate && !rightDate) {
      return (
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
      );
    }

    if (!leftDate) {
      return 1;
    }

    if (!rightDate) {
      return -1;
    }

    const leftDiffInDays = getDiffInDays(leftDate);
    const rightDiffInDays = getDiffInDays(rightDate);
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

export function sortTasksByDate<T extends SchedulableTask>(tasks: T[]) {
  return [...tasks].sort((left, right) => {
    const leftTime = getTaskNextDueDate(left)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const rightTime =
      getTaskNextDueDate(right)?.getTime() ?? Number.MAX_SAFE_INTEGER;

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
