"use client";

import { AppProvider, useAppContext } from "@/components/app/app-provider";
import { AuthScreen } from "@/components/auth/auth-screen";
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
      {currentView === "dashboard" ? <DashboardView /> : <MyTodos />}
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
