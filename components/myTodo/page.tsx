"use client";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import { TaskList } from "../tasks/task-list";
import { ClockIcon, PlusIcon } from "../ui/icons";
import { sortTasksByDate } from "@/lib/utils";

const MyTodos = () => {
  const { openTaskModal, tasks } = useAppContext();
  const orderedTasks = sortTasksByDate(tasks);

  return (
    <section className="surface-panel rounded-[34px] p-4 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
            Lista de tarefas
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            Entregas e rotinas
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            Consulte todas as suas tarefas.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-[var(--text-muted)]">
            <ClockIcon className="size-4" />
            {tasks.length === 0
              ? "Nenhuma tarefa registrada"
              : `${tasks.length} tarefa${tasks.length > 1 ? "s" : ""} salva${tasks.length > 1 ? "s" : ""}`}
          </div>
          <Button
            onClick={openTaskModal}
            leadingIcon={<PlusIcon className="size-4" />}
          >
            Adicionar tarefa
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <TaskList tasks={orderedTasks} onAddTask={openTaskModal} />
      </div>
    </section>
  );
};

export default MyTodos;
