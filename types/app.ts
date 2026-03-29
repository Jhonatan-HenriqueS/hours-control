export type Theme = "light" | "dark";

export type AuthMode = "login" | "register";

export type TaskStatus = "Ocasional" | "Rotina";

export type AppView = "dashboard" | "tasks" | "charts";

export type MenuIcon = "dashboard" | "listChecks" | "chart";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface StoredAccount extends User {
  password: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
  isCompleted?: boolean;
  completedAt?: string | null;
}

export interface TaskInput {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export interface AuthPayload {
  name: string;
  email: string;
  password: string;
}

export interface MenuItem {
  id: AppView;
  label: string;
  icon: MenuIcon;
}
