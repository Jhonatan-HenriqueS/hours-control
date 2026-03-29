"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import { CalendarIcon, XIcon } from "@/components/ui/icons";
import { InputField, TextareaField } from "@/components/ui/input-field";
import { TASK_STATUS_OPTIONS } from "@/lib/constants";
import { cn, getTodayInputValue } from "@/lib/utils";
import type { TaskInput, TaskStatus } from "@/types/app";

const STATUS_HINTS: Record<TaskStatus, string> = {
  Ocasional:
    "Use esta opção quando a tarefa surgir de forma pontual ou inesperada.",
  Rotina:
    "Use esta opção para atividades que fazem parte da sua rotina diária ou recorrente.",
};

function createInitialTaskForm(): TaskInput {
  return {
    title: "",
    description: "",
    dueDate: getTodayInputValue(),
    status: "Rotina",
  };
}

export function TaskModal() {
  const { addTask, closeTaskModal } = useAppContext();
  const [form, setForm] = useState<TaskInput>(createInitialTaskForm);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeTaskModal();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeTaskModal]);

  function updateField(field: keyof TaskInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!form.title.trim() || !form.description.trim() || !form.dueDate) {
      setErrorMessage("Preencha título, descrição e prazo.");
      return;
    }

    startTransition(() => {
      addTask(form);
      setForm(createInitialTaskForm());
      closeTaskModal();
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 py-4">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 bg-slate-950/58 backdrop-blur-sm"
        onClick={closeTaskModal}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="surface-panel animate-fade-in relative z-10 w-full max-w-2xl rounded-[34px] p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              Nova tarefa
            </p>
            <h3
              id="task-modal-title"
              className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]"
            >
              Adicionar tarefa
            </h3>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={closeTaskModal}
            aria-label="Fechar modal"
          >
            <XIcon className="size-[18px]" />
          </Button>
        </div>

        <form className="mt-3 space-y-5" onSubmit={handleSave}>
          <InputField
            label="Título da tarefa"
            placeholder="Ex.: Revisar planejamento semanal..."
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
          />

          <TextareaField
            label="Descrição"
            placeholder="Descreva o contexto desta tarefa..."
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
          />

          <div className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <InputField
              label="Data de prazo"
              type="date"
              icon={<CalendarIcon />}
              value={form.dueDate}
              onChange={(event) => updateField("dueDate", event.target.value)}
            />

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[var(--text-primary)]">
                Status
              </span>
              <div className="grid grid-cols-2 gap-3">
                {TASK_STATUS_OPTIONS.map((status) => (
                  <StatusOption
                    key={status}
                    status={status}
                    active={form.status === status}
                    onClick={() => updateField("status", status)}
                  />
                ))}
              </div>
              <span className="mt-3 text-center text-xs ">
                {STATUS_HINTS[form.status]}
              </span>
            </div>
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <Button variant="outline" type="button" onClick={closeTaskModal}>
              Cancelar
            </Button>
            <Button type="submit" loading={isPending}>
              Salvar tarefa
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface StatusOptionProps {
  status: TaskStatus;
  active: boolean;
  onClick: () => void;
}

function StatusOption({ status, active, onClick }: StatusOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[22px] border py-2 text-center transition duration-200 ease-out",
        active
          ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_12px_32px_rgba(15,118,110,0.14)]"
          : "border-[var(--border)] bg-[var(--panel-soft)] hover:bg-[var(--panel)]",
      )}
    >
      <span className="block text-sm font-semibold text-[var(--text-primary)]">
        {status}
      </span>
    </button>
  );
}
