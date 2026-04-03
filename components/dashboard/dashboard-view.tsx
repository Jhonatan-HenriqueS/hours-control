"use client";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusIcon } from "@/components/ui/icons";
import {
  cn,
  formatDateLabel,
  getNextTaskCardClasses,
  getRelativeDateLabel,
  getTaskNextDueDate,
  getTaskClosestToToday,
} from "@/lib/utils";

export function DashboardView() {
  const { openTaskModal, tasks } = useAppContext();

  const pendingTasks = tasks.filter((task) => !task.isCompleted);
  const allTasksCompleted = tasks.length > 0 && pendingTasks.length === 0;
  const specialTasks = tasks.filter((task) => task.status === "Ocasional");
  const routineTasks = tasks.filter((task) => task.status === "Rotina");
  const nextTask = getTaskClosestToToday(pendingTasks);

  return (
    <section className="grid min-h-full content-start gap-5 xl:grid-cols-[minmax(0,1.2fr)_720px]">
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

          <div className="mt-8 flex flex-col gap-5 ">
            <Button
              size="lg"
              onClick={openTaskModal}
              leadingIcon={<PlusIcon className="size-4" />}
              className=" xl:w-[40%]"
            >
              Adicionar tarefa
            </Button>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-[var(--text-muted)]">
              {tasks.length === 0
                ? "Nenhuma tarefa criada ainda. Comece pelo próximo compromisso."
                : allTasksCompleted
                  ? "Todas as tarefas foram concluídas."
                  : `${pendingTasks.length} tarefa${pendingTasks.length > 1 ? "s" : ""} pendente${pendingTasks.length > 1 ? "s" : ""} nesta base.`}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div
          className={cn(
            "rounded-[28px] border p-5 backdrop-blur-[22px]",
            allTasksCompleted
              ? "border-emerald-200/90 bg-[linear-gradient(135deg,rgba(236,253,245,0.98),rgba(220,252,231,0.96),rgba(209,250,229,0.92))] shadow-[0_18px_40px_rgba(74,222,128,0.12)] dark:border-emerald-800/60 dark:bg-[linear-gradient(135deg,rgba(6,78,59,0.42),rgba(6,95,70,0.34),rgba(20,83,45,0.28))] dark:shadow-[0_18px_40px_rgba(5,150,105,0.18)]"
              : getNextTaskCardClasses(nextTask),
          )}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Próxima entrega
          </p>
          {nextTask ? (
            <>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                {nextTask.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                {getRelativeDateLabel(getTaskNextDueDate(nextTask))}
              </p>
              <div className="mt-5 flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <CalendarIcon className="size-4" />
                {formatDateLabel(getTaskNextDueDate(nextTask) ?? new Date())}
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
              {allTasksCompleted
                ? "Todas as tarefas foram concluídas. Quando surgir uma nova atividade, ela aparecerá aqui."
                : "Assim que você criar a primeira tarefa, ela aparece aqui como próxima prioridade."}
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-3 xl:grid-cols-1">
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
  );
}
