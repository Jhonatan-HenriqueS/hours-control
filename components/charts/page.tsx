"use client";

import { useAppContext } from "@/components/app/app-provider";
import { LineChart } from "@/components/charts/line-chart";
import { WEEKDAY_OPTIONS } from "@/lib/constants";

const WEEK_LABELS = WEEKDAY_OPTIONS.map((_, index) => String(index + 1));

export default function ChartsPage() {
  const { deletedTaskScores, tasks } = useAppContext();
  const totalPoints =
    tasks.reduce((total, task) => total + (task.difficulty ?? 0), 0) +
    deletedTaskScores.reduce((total, score) => total + score.points, 0);
  const pointsByWeekday = tasks.reduce<number[]>((points, task) => {
    if (!task.completedAt || !task.difficulty) {
      return points;
    }

    const completedAt = new Date(task.completedAt);

    if (Number.isNaN(completedAt.getTime())) {
      return points;
    }

    points[completedAt.getDay()] += task.difficulty;
    return points;
  }, Array.from({ length: 7 }, () => 0));

  deletedTaskScores.forEach((score) => {
    const completedAt = new Date(score.completedAt);

    if (!Number.isNaN(completedAt.getTime())) {
      pointsByWeekday[completedAt.getDay()] += score.points;
    }
  });
  const scaleMaximum = totalPoints > 0 ? totalPoints : 6;
  const scaleInterval = scaleMaximum / 6;

  return (
    <section className="surface-panel min-h-full rounded-[34px] p-4 sm:p-7 lg:p-8">
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
          Visão semanal
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-3xl">
          Pontos concluídos por dia
        </h2>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-[var(--text-muted)]">
            Cada conclusão soma a dificuldade da tarefa no dia correspondente.
          </p>
          <span className="w-fit rounded-full border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)]">
            Total: {totalPoints} ponto{totalPoints === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <LineChart
          labels={WEEK_LABELS}
          values={pointsByWeekday}
          maxValue={scaleMaximum}
          interval={scaleInterval}
        />
      </div>

      <p className="mt-4 text-center text-xs leading-6 text-[var(--text-muted)]">
        {WEEKDAY_OPTIONS.map(
          (day, index) => `${index + 1} ${day.shortLabel}`,
        ).join("  ·  ")}
      </p>
    </section>
  );
}
