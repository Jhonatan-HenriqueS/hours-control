"use client";

import { AppProvider, useAppContext } from "@/components/app/app-provider";
import { AuthScreen } from "@/components/auth/auth-screen";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { AppShell } from "@/components/layout/app-shell";
import { LoadingScreen } from "@/components/ui/loading-screen";

function TaskManagerContent() {
  const { currentUser, isReady } = useAppContext();

  if (!isReady) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <AuthScreen />;
  }

  return (
    <AppShell>
      <DashboardView />
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
