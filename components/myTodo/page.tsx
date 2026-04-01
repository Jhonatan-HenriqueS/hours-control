"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import { TASK_STATUS_OPTIONS } from "@/lib/constants";
import { cn, sortTasksByDate } from "@/lib/utils";
import type { TaskStatus } from "@/types/app";

import { TaskList } from "../tasks/task-list";
import {
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  PlusIcon,
  SlidersHorizontalIcon,
} from "../ui/icons";

type TaskFilter = TaskStatus;

const FILTER_LABELS: Record<TaskFilter, string> = {
  Ocasional: "Ocasional",
  Rotina: "Rotina",
};

const MyTodos = () => {
  const { openTaskModal, tasks } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState<TaskFilter>("Rotina");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const orderedTasks = sortTasksByDate(tasks);
  const filteredTasks = useMemo(
    () => orderedTasks.filter((task) => task.status === selectedFilter),
    [orderedTasks, selectedFilter],
  );

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <section className="surface-panel rounded-[34px] p-4 sm:p-8">
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
      <div className="mt-5 flex flex-col gap-5 lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-3 text-sm text-[var(--text-muted)]">
            <ClockIcon className="size-4" />
            {tasks.length === 0
              ? "Nenhuma tarefa registrada"
              : `${tasks.length} tarefa${tasks.length > 1 ? "s" : ""} salva${tasks.length > 1 ? "s" : ""}`}
          </div>
          <div className="relative" ref={filterRef}>
            <Button
              variant="secondary"
              onClick={() => setIsFilterOpen((current) => !current)}
              leadingIcon={<SlidersHorizontalIcon className="size-4" />}
              className="w-full"
              trailingIcon={
                <ChevronDownIcon
                  className={cn(
                    "size-4 transition duration-200 ease-out",
                    isFilterOpen ? "rotate-180" : "",
                  )}
                />
              }
              aria-expanded={isFilterOpen}
              aria-haspopup="dialog"
            >
              {FILTER_LABELS[selectedFilter]}
            </Button>

            {isFilterOpen ? (
              <div className="surface-popover absolute right-0 top-[calc(100%+0.75rem)] z-20 w-[320px] rounded-[28px] p-4">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                      Filtrar tarefas
                    </p>
                    <h4 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                      Escolha um status
                    </h4>
                    <p className="mt-2 text-xs text-[var(--text-muted)]">
                      {tasks.length === 0
                        ? "Nenhuma tarefa cadastrada até agora."
                        : `${tasks.length} tarefa${tasks.length > 1 ? "s" : ""} no total.`}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]">
                    {filteredTasks.length} resultado
                    {filteredTasks.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-2">
                  {TASK_STATUS_OPTIONS.map((option) => {
                    const count = orderedTasks.filter(
                      (task) => task.status === option,
                    ).length;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedFilter(option);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-[22px] px-4 py-3 text-left transition duration-200 ease-out",
                          selectedFilter === option
                            ? "bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--border)]"
                            : "bg-[var(--panel-soft)] text-[var(--text-muted)] hover:bg-[var(--panel)] hover:text-[var(--text-primary)]",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              "grid size-8 place-items-center rounded-xl",
                              selectedFilter === option
                                ? "bg-white/70 text-[var(--accent)] dark:bg-white/10"
                                : "bg-white/60 text-[var(--text-muted)] dark:bg-white/6",
                            )}
                          >
                            <CheckIcon className="size-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold">
                              {FILTER_LABELS[option]}
                            </span>
                          </span>
                        </span>
                        <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
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
        {filteredTasks.length > 0 ? (
          <TaskList tasks={filteredTasks} onAddTask={openTaskModal} />
        ) : (
          <div className="rounded-[30px] border border-dashed border-[var(--border-strong)] bg-[var(--panel-soft)] px-6 py-12 text-center">
            <div className="mx-auto max-w-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Nenhum resultado
              </p>
              <h4 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                Nenhuma tarefa com este filtro
              </h4>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                {`No momento não existem tarefas com o status ${FILTER_LABELS[
                  selectedFilter
                ].toLowerCase()}.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyTodos;
