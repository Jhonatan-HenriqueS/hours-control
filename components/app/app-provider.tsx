"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { MENU_ITEMS, STORAGE_KEYS } from "@/lib/constants";
import { createId } from "@/lib/utils";
import { usePersistentState } from "@/hooks/use-persistent-state";
import type {
  AppView,
  AuthPayload,
  MenuItem,
  StoredAccount,
  Task,
  TaskInput,
  Theme,
  User,
} from "@/types/app";

type AuthResult = {
  ok: boolean;
  message?: string;
};

interface AppContextValue {
  isReady: boolean;
  currentUser: User | null;
  tasks: Task[];
  theme: Theme;
  menuItems: MenuItem[];
  currentView: AppView;
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  isTaskModalOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setCurrentView: (view: AppView) => void;
  setMobileMenuOpen: (open: boolean) => void;
  openTaskModal: () => void;
  closeTaskModal: () => void;
  login: (payload: AuthPayload) => AuthResult;
  register: (payload: AuthPayload) => AuthResult;
  logout: () => void;
  addTask: (task: TaskInput) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme, themeReady] = usePersistentState<Theme>(
    STORAGE_KEYS.theme,
    "light",
  );
  const [currentUser, setCurrentUser, sessionReady] = usePersistentState<User | null>(
    STORAGE_KEYS.session,
    null,
  );
  const [accounts, setAccounts, accountsReady] = usePersistentState<StoredAccount[]>(
    STORAGE_KEYS.accounts,
    [],
  );
  const [tasks, setTasks, tasksReady] = usePersistentState<Task[]>(
    STORAGE_KEYS.tasks,
    [],
  );
  const [currentView, setCurrentViewState, viewReady] =
    usePersistentState<AppView>(STORAGE_KEYS.view, "dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed, sidebarReady] =
    usePersistentState<boolean>(STORAGE_KEYS.sidebar, false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const isReady =
    themeReady &&
    sessionReady &&
    accountsReady &&
    tasksReady &&
    viewReady &&
    sidebarReady;

  useEffect(() => {
    const root = document.documentElement;
    const darkMode = theme === "dark";

    root.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen || isTaskModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isTaskModalOpen]);

  function login(payload: AuthPayload): AuthResult {
    const name = payload.name.trim();
    const email = payload.email.trim().toLowerCase();
    const password = payload.password.trim();

    if (!name || !email || !password) {
      return {
        ok: false,
        message: "Preencha nome, email e senha para continuar.",
      };
    }

    const existingAccount = accounts.find(
      (account) => account.email.toLowerCase() === email,
    );

    if (existingAccount && existingAccount.password !== password) {
      return {
        ok: false,
        message: "Senha incorreta para a conta informada.",
      };
    }

    const user: User = existingAccount
      ? {
          id: existingAccount.id,
          name: existingAccount.name,
          email: existingAccount.email,
          createdAt: existingAccount.createdAt,
        }
      : {
          id: createId(),
          name,
          email,
          createdAt: new Date().toISOString(),
        };

    setCurrentUser(user);
    setIsMobileMenuOpen(false);

    return { ok: true };
  }

  function register(payload: AuthPayload): AuthResult {
    const name = payload.name.trim();
    const email = payload.email.trim().toLowerCase();
    const password = payload.password.trim();

    if (!name || !email || !password) {
      return {
        ok: false,
        message: "Preencha todos os campos para criar sua conta.",
      };
    }

    if (password.length < 6) {
      return {
        ok: false,
        message: "Use uma senha com pelo menos 6 caracteres.",
      };
    }

    const hasDuplicateEmail = accounts.some(
      (account) => account.email.toLowerCase() === email,
    );

    if (hasDuplicateEmail) {
      return {
        ok: false,
        message: "Este email já está cadastrado.",
      };
    }

    const user: User = {
      id: createId(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };

    setAccounts([...accounts, { ...user, password }]);
    setCurrentUser(user);
    setIsMobileMenuOpen(false);

    return { ok: true };
  }

  function logout() {
    setCurrentUser(null);
    setCurrentViewState("dashboard");
    setIsMobileMenuOpen(false);
    setIsTaskModalOpen(false);
  }

  function addTask(task: TaskInput) {
    const title = task.title.trim();
    const description = task.description.trim();

    if (!title || !description || !task.dueDate) {
      return;
    }

    const newTask: Task = {
      id: createId(),
      title,
      description,
      dueDate: task.dueDate,
      status: task.status,
      createdAt: new Date().toISOString(),
      isCompleted: false,
      completedAt: null,
    };

    setTasks([newTask, ...tasks]);
  }

  function completeTask(taskId: string) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isCompleted: true,
              completedAt: task.completedAt ?? new Date().toISOString(),
            }
          : task,
      ),
    );
  }

  function deleteTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function toggleSidebar() {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }

  function setCurrentView(view: AppView) {
    setCurrentViewState(view);
    setIsMobileMenuOpen(false);
  }

  function openTaskModal() {
    setIsTaskModalOpen(true);
  }

  function closeTaskModal() {
    setIsTaskModalOpen(false);
  }

  return (
    <AppContext.Provider
      value={{
        isReady,
        currentUser,
        tasks,
        theme,
        menuItems: MENU_ITEMS,
        currentView,
        isSidebarCollapsed,
        isMobileMenuOpen,
        isTaskModalOpen,
        toggleTheme,
        toggleSidebar,
        setCurrentView,
        setMobileMenuOpen: setIsMobileMenuOpen,
        openTaskModal,
        closeTaskModal,
        login,
        register,
        logout,
        addTask,
        completeTask,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de AppProvider.");
  }

  return context;
}
