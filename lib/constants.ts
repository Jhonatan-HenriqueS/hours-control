import type { MenuItem, TaskStatus } from "@/types/app";

export const APP_NAME = "Lumen Tasks";

export const STORAGE_KEYS = {
  theme: "lumen-tasks.theme",
  session: "lumen-tasks.session",
  accounts: "lumen-tasks.accounts",
  tasks: "lumen-tasks.tasks",
  sidebar: "lumen-tasks.sidebar",
} as const;

export const TASK_STATUS_OPTIONS: TaskStatus[] = ["Tarefa ocasional", "Rotina"];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
  },
];
