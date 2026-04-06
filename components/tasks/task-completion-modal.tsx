"use client";

import { useEffect, useMemo, useState } from "react";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import {
  ClockIcon,
  HourglassIcon,
  PauseIcon,
  XIcon,
} from "@/components/ui/icons";
import {
  formatDurationInputFromMs,
  getTrackedDurationMs,
  isValidDurationValue,
} from "@/lib/utils";

export function TaskCompletionModal() {
  const {
    activeTaskCompletionTask,
    closeTaskCompletionModal,
    completeTask,
    startTaskTimer,
    taskCompletionMode,
  } = useAppContext();
  const [manualDuration, setManualDuration] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const trackedDurationValue = useMemo(() => {
    if (!activeTaskCompletionTask) {
      return "00:00";
    }

    return formatDurationInputFromMs(getTrackedDurationMs(activeTaskCompletionTask));
  }, [activeTaskCompletionTask]);

  useEffect(() => {
    if (!activeTaskCompletionTask) {
      return;
    }

    setManualDuration(
      activeTaskCompletionTask.estimatedDuration ??
        (taskCompletionMode === "stop" ? trackedDurationValue : ""),
    );
    setErrorMessage(null);
  }, [activeTaskCompletionTask, taskCompletionMode, trackedDurationValue]);

  if (!activeTaskCompletionTask || !taskCompletionMode) {
    return null;
  }

  const task = activeTaskCompletionTask;

  function handleUseManualDuration() {
    if (!manualDuration.trim() || !isValidDurationValue(manualDuration.trim())) {
      setErrorMessage("Informe uma duração válida no formato hh:mm.");
      return;
    }

    const result = completeTask(task.id, manualDuration);

    if (!result.ok) {
      setErrorMessage(result.message ?? "Não foi possível concluir a tarefa.");
    }
  }

  function handleUseTrackedDuration() {
    const result = completeTask(task.id, trackedDurationValue);

    if (!result.ok) {
      setErrorMessage(result.message ?? "Não foi possível concluir a tarefa.");
    }
  }

  function handleStartTimer() {
    startTaskTimer(task.id);
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 bg-slate-950/58 backdrop-blur-sm"
        onClick={closeTaskCompletionModal}
      />

      <div className="relative z-10 flex min-h-full items-start justify-center px-2 py-3 sm:px-4 sm:py-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="task-completion-modal-title"
          className="surface-panel animate-fade-in relative w-full max-w-xl max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-[34px] p-6 sm:max-h-[min(88vh,48rem)] sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                {taskCompletionMode === "start"
                  ? "Finalização"
                  : "Cronômetro pausado"}
              </p>
              <h3
                id="task-completion-modal-title"
                className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]"
              >
                {taskCompletionMode === "start"
                  ? "Como deseja concluir esta task?"
                  : "Escolha a duração final"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                {task.title}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={closeTaskCompletionModal}
              aria-label="Fechar modal"
            >
              <XIcon className="size-[18px]" />
            </Button>
          </div>

          <div className="mt-6 space-y-5">
            {taskCompletionMode === "start" ? (
              <>
                <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel-soft)] p-4">
                  <InputField
                    label="Hora estimada"
                    type="time"
                    step={60}
                    icon={<ClockIcon />}
                    value={manualDuration}
                    onChange={(event) => setManualDuration(event.target.value)}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-4 w-full"
                    onClick={handleUseManualDuration}
                  >
                    Usar este
                  </Button>
                </div>

                <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel-soft)] p-4">
                  <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-white/50 px-4 py-4 text-sm text-[var(--text-muted)] dark:bg-white/6">
                    A task será cronometrada em tempo real até você pausá-la.
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-4 w-full"
                    leadingIcon={<HourglassIcon className="size-4" />}
                    onClick={handleStartTimer}
                  >
                    Usar este
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel-soft)] p-4">
                  <InputField
                    label="Usar hora cronometrada"
                    icon={<PauseIcon className="size-4" />}
                    value={trackedDurationValue}
                    readOnly
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-4 w-full"
                    onClick={handleUseTrackedDuration}
                  >
                    Escolha este
                  </Button>
                </div>

                <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel-soft)] p-4">
                  <InputField
                    label="Defina um horário"
                    type="time"
                    step={60}
                    icon={<ClockIcon />}
                    value={manualDuration}
                    onChange={(event) => setManualDuration(event.target.value)}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-4 w-full"
                    onClick={handleUseManualDuration}
                  >
                    Escolha este
                  </Button>
                </div>
              </>
            )}

            {errorMessage ? (
              <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
                {errorMessage}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
