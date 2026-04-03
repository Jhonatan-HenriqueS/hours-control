import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import { WEEKDAY_OPTIONS } from "@/lib/constants";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  Trash2Icon,
} from "@/components/ui/icons";
import {
  cn,
  formatTaskDate,
  getTaskRelativeScheduleLabel,
  getNextRoutineWeekdayId,
  sortWeekdays,
  getCategoryBadgeClasses,
  getCategoryColorOption,
  getStatusClasses,
} from "@/lib/utils";
import type { Task } from "@/types/app";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { completeTask, deleteTask } = useAppContext();
  const isCompleted = Boolean(task.isCompleted);
  const categoryColor = getCategoryColorOption(task.categoryColor);
  const nextRoutineDay = getNextRoutineWeekdayId(task.routineDays);
  const routineDays = sortWeekdays(task.routineDays ?? []);

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[28px] border p-5 backdrop-blur-[22px] transition duration-300 ease-out hover:-translate-y-1",
        isCompleted
          ? "border-emerald-200/90 bg-[linear-gradient(135deg,rgba(236,253,245,0.98),rgba(220,252,231,0.96),rgba(209,250,229,0.92))] shadow-[0_18px_40px_rgba(74,222,128,0.12)] dark:border-emerald-800/60 dark:bg-[linear-gradient(135deg,rgba(6,78,59,0.42),rgba(6,95,70,0.34),rgba(20,83,45,0.28))] dark:shadow-[0_18px_40px_rgba(5,150,105,0.18)]"
          : "surface-card",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
            {task.title}
          </h4>
          {task.categoryName ? (
            <span
              className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${getCategoryBadgeClasses(
                task.categoryColor,
              )}`}
            >
              <span
                className={cn(
                  "size-2.5 rounded-full",
                  categoryColor?.swatchClassName,
                )}
              />
              {task.categoryName}
            </span>
          ) : null}
          <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
            {task.description}
          </p>
          {isCompleted ? (
            <p className="mt-3 flex w-full items-center text-center text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Concluída <CheckIcon className="size-[18px]" />
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-start gap-2">
          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
              task.status,
            )}`}
          >
            {task.status}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-[var(--text-muted)] sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4" />
            <span className="font-medium text-[var(--text-primary)]">
              {task.status === "Rotina" ? "Dias da rotina" : "Prazo"}
            </span>
          </div>
          {task.status === "Rotina" ? (
            routineDays.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {routineDays.map((day) => {
                  const option = WEEKDAY_OPTIONS.find(
                    (weekday) => weekday.id === day,
                  );
                  const isActiveDay = day === nextRoutineDay;

                  return (
                    <span
                      key={day}
                      className={cn(
                        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-200 ease-out",
                        isActiveDay
                          ? "border-amber-300/80 bg-[#FFF3B0] text-amber-900 shadow-[0_0_8px_rgba(255,215,0,0.4)] dark:border-amber-500/50 dark:bg-amber-300/20 dark:text-amber-100"
                          : "border-[var(--border)] bg-white/60 text-[var(--text-muted)] dark:bg-white/6",
                      )}
                      title={
                        isActiveDay
                          ? `${option?.fullLabel} é o próximo prazo`
                          : option?.fullLabel
                      }
                    >
                      {option?.shortLabel ?? day}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="mt-2">Nenhum dia selecionado</p>
            )
          ) : (
            <p className="mt-2">{formatTaskDate(task.dueDate)}</p>
          )}
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3">
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4" />
            <span className="font-medium text-[var(--text-primary)]">
              Situação
            </span>
          </div>
          <p className="mt-2">{getTaskRelativeScheduleLabel(task)}</p>
        </div>
        <div className="flex items-center justify-center w-full sm:col-span-2">
          <Button
            type="button"
            size="icon"
            variant={isCompleted ? "outline" : "secondary"}
            onClick={() =>
              isCompleted ? deleteTask(task.id) : completeTask(task.id)
            }
            aria-label={
              isCompleted ? "Excluir tarefa concluída" : "Concluir tarefa"
            }
            title={isCompleted ? "Excluir tarefa" : "Concluir tarefa"}
            className={cn(
              "shrink-0 w-full",
              isCompleted
                ? " border-rose-300/60 text-rose-700 hover:bg-rose-500/50 dark:bg-rose-400 dark:border-rose-800 dark:text-white"
                : "bg-emerald-400 text-emerald-700 hover:bg-emerald-500/50 dark:text-white",
            )}
          >
            {isCompleted ? (
              <Trash2Icon className="size-[18px]" />
            ) : (
              <CheckIcon className="size-[18px]" />
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
