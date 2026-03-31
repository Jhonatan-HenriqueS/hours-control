"use client";

import { AppProvider, useAppContext } from "@/components/app/app-provider";
import { AuthScreen } from "@/components/auth/auth-screen";
import CategoriesPage from "@/components/categories/page";
import ChartsPage from "@/components/charts/page";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { AppShell } from "@/components/layout/app-shell";
import MyTodos from "@/components/myTodo/page";
import { LoadingScreen } from "@/components/ui/loading-screen";

function TaskManagerContent() {
  const { currentUser, currentView, isReady } = useAppContext();

  if (!isReady) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <AuthScreen />;
  }

  return (
    <AppShell>
      {currentView === "dashboard" ? (
        <DashboardView />
      ) : currentView === "tasks" ? (
        <MyTodos />
      ) : currentView === "categories" ? (
        <CategoriesPage />
      ) : (
        <ChartsPage />
      )}
    </AppShell>
  );
}

export function TaskManagerApp() {
  return (
    <AppProvider>
      <TaskManagerContent />
    </AppProvider>
  );
}
