"use client";

import type { ReactNode } from "react";

import { useAppContext } from "@/components/app/app-provider";
import { MobileSidebar, Sidebar } from "@/components/layout/sidebar";
import { TaskModal } from "@/components/tasks/task-modal";
import { Topbar } from "@/components/layout/topbar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { isTaskModalOpen } = useAppContext();

  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <MobileSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {isTaskModalOpen ? <TaskModal /> : null}
    </div>
  );
}
