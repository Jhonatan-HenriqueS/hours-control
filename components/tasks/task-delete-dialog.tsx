"use client";

import type { ReactElement } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "@/components/ui/icons";
import type { Task } from "@/types/app";

interface TaskDeleteDialogProps {
  task: Task;
  onConfirm: () => void;
  children: ReactElement;
}

export function TaskDeleteDialog({
  task,
  onConfirm,
  children,
}: TaskDeleteDialogProps) {
  const isRoutine = task.status === "Rotina";
  const taskType = isRoutine ? "rotina" : "tarefa ocasional";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="task-modal-panel">
        <AlertDialogHeader>
          <div className="mb-2 grid size-12 place-items-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-300">
            <Trash2Icon className="size-5" />
          </div>
          <AlertDialogTitle>
            Excluir esta {taskType}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <strong className="font-semibold text-[var(--text-primary)]">
              {task.title}
            </strong>{" "}
            será excluída permanentemente. Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-800 dark:text-amber-200">
          Os pontos desta {taskType} serão removidos do gráfico após o próximo
          domingo, quando o ciclo semanal for reiniciado.
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Manter tarefa</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Excluir permanentemente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
