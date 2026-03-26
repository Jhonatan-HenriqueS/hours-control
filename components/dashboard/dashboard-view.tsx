"use client";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, PlusIcon } from "@/components/ui/icons";
import { TaskList } from "@/components/tasks/task-list";
import {
  formatTaskDate,
  getRelativeDueLabel,
  sortTasksByDate,
} from "@/lib/utils";

export function DashboardView() {
  const { openTaskModal, tasks } = useAppContext();

  const orderedTasks = sortTasksByDate(tasks);
  const specialTasks = tasks.filter(
    (task) => task.status === "Tarefa ocasional",
  );
  const routineTasks = tasks.filter((task) => task.status === "Rotina");
  const nextTask = orderedTasks[0];

  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_380px]">
        <div className="surface-panel relative overflow-hidden rounded-[34px] p-6 sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,118,110,0.08),transparent_35%,rgba(56,189,248,0.12))]" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              Pipeline pessoal
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-4xl">
              Dashboard
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
              Visualize e organize sua rotina.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={openTaskModal}
                leadingIcon={<PlusIcon className="size-4" />}
              >
                Adicionar tarefa
              </Button>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-[var(--text-muted)]">
                {tasks.length === 0
                  ? "Nenhuma tarefa criada ainda. Comece pelo próximo compromisso."
                  : `${tasks.length} tarefa${tasks.length > 1 ? "s" : ""} ativa${tasks.length > 1 ? "s" : ""} nesta base.`}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface-card rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Próxima entrega
            </p>
            {nextTask ? (
              <>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                  {nextTask.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  {getRelativeDueLabel(nextTask.dueDate)}
                </p>
                <div className="mt-5 flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <CalendarIcon className="size-4" />
                  {formatTaskDate(nextTask.dueDate)}
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
                Assim que você criar a primeira tarefa, ela aparece aqui como
                próxima prioridade.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="surface-card rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Total
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">
                {tasks.length}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                tarefas registradas
              </p>
            </div>

            <div className="surface-card rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Ocasiões especiais
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">
                {specialTasks.length}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                compromissos de destaque
              </p>
            </div>

            <div className="surface-card rounded-[28px] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Rotina
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">
                {routineTasks.length}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                itens recorrentes
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-panel rounded-[34px] p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              Lista de tarefas
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
              Entregas e rotinas
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-[var(--text-muted)]">
            <ClockIcon className="size-4" />
            Atualização local em tempo real
          </div>
        </div>

        <div className="mt-8">
          <TaskList tasks={orderedTasks} onAddTask={openTaskModal} />
        </div>
      </section>
    </div>
  );
}
