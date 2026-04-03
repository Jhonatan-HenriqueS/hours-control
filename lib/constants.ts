import type {
  CategoryColor,
  MenuItem,
  TaskStatus,
  WeekdayId,
} from "@/types/app";

export const APP_NAME = "Lumen Tasks";

export const STORAGE_KEYS = {
  theme: "lumen-tasks.theme",
  session: "lumen-tasks.session",
  accounts: "lumen-tasks.accounts",
  categories: "lumen-tasks.categories",
  tasks: "lumen-tasks.tasks",
  sidebar: "lumen-tasks.sidebar",
  view: "lumen-tasks.view",
} as const;

export const TASK_STATUS_OPTIONS: TaskStatus[] = ["Ocasional", "Rotina"];

export const WEEKDAY_OPTIONS: Array<{
  id: WeekdayId;
  shortLabel: string;
  fullLabel: string;
  index: number;
}> = [
  { id: "sunday", shortLabel: "Dom", fullLabel: "Domingo", index: 0 },
  { id: "monday", shortLabel: "Seg", fullLabel: "Segunda", index: 1 },
  { id: "tuesday", shortLabel: "Ter", fullLabel: "Terça", index: 2 },
  { id: "wednesday", shortLabel: "Qua", fullLabel: "Quarta", index: 3 },
  { id: "thursday", shortLabel: "Qui", fullLabel: "Quinta", index: 4 },
  { id: "friday", shortLabel: "Sex", fullLabel: "Sexta", index: 5 },
  { id: "saturday", shortLabel: "Sab", fullLabel: "Sábado", index: 6 },
];

export const CATEGORY_COLOR_OPTIONS: Array<{
  id: CategoryColor;
  label: string;
  swatchClassName: string;
  badgeClassName: string;
}> = [
  {
    id: "violet",
    label: "Roxo",
    swatchClassName: "bg-violet-300 dark:bg-violet-400",
    badgeClassName:
      "bg-violet-500/12 text-violet-700 ring-violet-500/20 dark:bg-violet-400/12 dark:text-violet-200 dark:ring-violet-300/20",
  },
  {
    id: "blue",
    label: "Azul",
    swatchClassName: "bg-blue-300 dark:bg-blue-400",
    badgeClassName:
      "bg-blue-500/12 text-blue-700 ring-blue-500/20 dark:bg-blue-400/12 dark:text-blue-200 dark:ring-blue-300/20",
  },
  {
    id: "red",
    label: "Vermelho",
    swatchClassName: "bg-rose-300 dark:bg-rose-400",
    badgeClassName:
      "bg-rose-500/12 text-rose-700 ring-rose-500/20 dark:bg-rose-400/12 dark:text-rose-200 dark:ring-rose-300/20",
  },
  {
    id: "green",
    label: "Verde",
    swatchClassName: "bg-emerald-300 dark:bg-emerald-400",
    badgeClassName:
      "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-400/12 dark:text-emerald-200 dark:ring-emerald-300/20",
  },
  {
    id: "yellow",
    label: "Amarelo",
    swatchClassName: "bg-amber-300 dark:bg-amber-400",
    badgeClassName:
      "bg-amber-500/12 text-amber-700 ring-amber-500/20 dark:bg-amber-400/12 dark:text-amber-200 dark:ring-amber-300/20",
  },
  {
    id: "orange",
    label: "Laranja",
    swatchClassName: "bg-orange-300 dark:bg-orange-400",
    badgeClassName:
      "bg-orange-500/12 text-orange-700 ring-orange-500/20 dark:bg-orange-400/12 dark:text-orange-200 dark:ring-orange-300/20",
  },
  {
    id: "pink",
    label: "Rosa",
    swatchClassName: "bg-pink-300 dark:bg-pink-400",
    badgeClassName:
      "bg-pink-500/12 text-pink-700 ring-pink-500/20 dark:bg-pink-400/12 dark:text-pink-200 dark:ring-pink-300/20",
  },
  {
    id: "cyan",
    label: "Ciano",
    swatchClassName: "bg-cyan-300 dark:bg-cyan-400",
    badgeClassName:
      "bg-cyan-500/12 text-cyan-700 ring-cyan-500/20 dark:bg-cyan-400/12 dark:text-cyan-200 dark:ring-cyan-300/20",
  },
  {
    id: "indigo",
    label: "Índigo",
    swatchClassName: "bg-indigo-300 dark:bg-indigo-400",
    badgeClassName:
      "bg-indigo-500/12 text-indigo-700 ring-indigo-500/20 dark:bg-indigo-400/12 dark:text-indigo-200 dark:ring-indigo-300/20",
  },
  {
    id: "neutral",
    label: "Neutro",
    swatchClassName: "bg-slate-300 dark:bg-slate-400",
    badgeClassName:
      "bg-slate-500/12 text-slate-700 ring-slate-500/20 dark:bg-slate-400/12 dark:text-slate-200 dark:ring-slate-300/20",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
  },
  {
    id: "tasks",
    label: "Tarefas",
    icon: "listChecks",
  },
  {
    id: "categories",
    label: "Categorias",
    icon: "category",
  },
  {
    id: "charts",
    label: "Gráficos",
    icon: "chart",
  },
];
