export type Theme = "light" | "dark";

export type AuthMode = "login" | "register";

export type TaskStatus = "Ocasional" | "Rotina";

export type WeekdayId =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type CategoryColor =
  | "violet"
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "orange"
  | "pink"
  | "cyan"
  | "indigo"
  | "neutral";

export type AppView = "dashboard" | "tasks" | "charts" | "categories";

export type MenuIcon = "dashboard" | "listChecks" | "chart" | "category";

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
  routineDays?: WeekdayId[];
  categoryId?: string | null;
  categoryName?: string | null;
  categoryColor?: CategoryColor | null;
  createdAt: string;
  isCompleted?: boolean;
  completedAt?: string | null;
}

export interface TaskInput {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  routineDays: WeekdayId[];
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  categoryClass: TaskStatus;
  color: CategoryColor;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInput {
  name: string;
  categoryClass: TaskStatus;
  color: CategoryColor;
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
