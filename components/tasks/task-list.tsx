import type { Task } from "@/types/app";

import { TaskCard } from "./task-card";

interface TaskListProps {
  tasks: Task[];
  onAddTask: () => void;
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-[30px] border border-dashed border-[var(--border-strong)] bg-[var(--panel-soft)] px-6 py-12 text-center">
        <div className="mx-auto max-w-md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)] -mt-3 ">
            Sem tarefas por enquanto...
          </p>
          <h4 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            Monte sua primeira entrada
          </h4>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            Crie uma tarefa para começar a preencher o dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-7 xl:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
