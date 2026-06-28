"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/ui/icons";
import { TASK_DIFFICULTY_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { TaskDifficulty } from "@/types/app";

interface TaskDifficultyModalProps {
  onCancel: () => void;
  onSelect: (difficulty: TaskDifficulty) => void;
}

export function TaskDifficultyModal({
  onCancel,
  onSelect,
}: TaskDifficultyModalProps) {
  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto">
      <button
        type="button"
        aria-label="Voltar ao formulário da tarefa"
        className="absolute inset-0 bg-slate-950/68 backdrop-blur-md"
        onClick={onCancel}
      />

      <div className="relative z-10 flex min-h-full items-center justify-center px-3 py-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="task-difficulty-title"
          className="surface-panel animate-fade-in relative w-full max-w-lg rounded-[34px] p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Última etapa
              </p>
              <h3
                id="task-difficulty-title"
                className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]"
              >
                Qual é a dificuldade?
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Escolha uma pontuação para salvar a tarefa.
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onCancel}
              aria-label="Voltar ao formulário"
            >
              <XIcon className="size-[18px]" />
            </Button>
          </div>

          <div className="mt-7 grid gap-3">
            {TASK_DIFFICULTY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(option.value)}
                className={cn(
                  "flex min-h-20 w-full items-center justify-between rounded-[24px] border px-5 py-4 text-left transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  option.buttonClassName,
                )}
              >
                <span className="text-base font-semibold">{option.label}</span>
                <span className="rounded-full border border-current/20 bg-white/50 px-3 py-1.5 text-xs font-semibold dark:bg-white/8">
                  {option.pointsLabel}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
