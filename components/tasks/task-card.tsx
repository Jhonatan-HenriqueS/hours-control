import { CalendarIcon, ClockIcon } from "@/components/ui/icons";
import {
  formatTaskDate,
  getRelativeDueLabel,
  getStatusClasses,
} from "@/lib/utils";
import type { Task } from "@/types/app";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="surface-card group flex h-full flex-col rounded-[28px] p-5 transition duration-300 ease-out hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          
          <h4 className="text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
            {task.title}
          </h4>
          <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
            {task.description}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
            task.status,
          )}`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-[var(--text-muted)] sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4" />
            <span className="font-medium text-[var(--text-primary)]">
              Prazo
            </span>
          </div>
          <p className="mt-2">{formatTaskDate(task.dueDate)}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3">
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4" />
            <span className="font-medium text-[var(--text-primary)]">
              Situação
            </span>
          </div>
          <p className="mt-2">{getRelativeDueLabel(task.dueDate)}</p>
        </div>
      </div>
    </article>
  );
}
