"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { useAppContext } from "@/components/app/app-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import {
  CheckIcon,
  ChevronDownIcon,
  PencilIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
} from "@/components/ui/icons";
import { CATEGORY_COLOR_OPTIONS, TASK_STATUS_OPTIONS } from "@/lib/constants";
import {
  cn,
  getCategoryBadgeClasses,
  getCategoryColorOption,
  getStatusClasses,
} from "@/lib/utils";
import type { CategoryColor, CategoryInput, TaskStatus } from "@/types/app";

type CategoryFilter = TaskStatus;

const FILTER_LABELS: Record<CategoryFilter, string> = {
  Ocasional: "Ocasional",
  Rotina: "Rotina",
};

const initialCategoryForm: CategoryInput = {
  name: "",
  categoryClass: "Rotina",
  color: "blue",
};

export default function CategoriesPage() {
  const { categories, createCategory, updateCategory, deleteCategory } =
    useAppContext();
  const [form, setForm] = useState<CategoryInput>(initialCategoryForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<CategoryFilter>("Rotina");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => category.categoryClass === filter);
  }, [categories, filter]);

  const usedColorsInClass = useMemo(
    () =>
      new Set(
        categories
          .filter(
            (category) =>
              category.categoryClass === form.categoryClass &&
              category.id !== editingId,
          )
          .map((category) => category.color),
      ),
    [categories, editingId, form.categoryClass],
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

  function resetForm() {
    setForm(initialCategoryForm);
    setEditingId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setFeedbackMessage(null);

    const result = editingId
      ? updateCategory(editingId, form)
      : createCategory(form);

    if (!result.ok) {
      setErrorMessage(result.message ?? "Não foi possível salvar a categoria.");
      return;
    }

    setFeedbackMessage(
      editingId
        ? "Categoria atualizada com sucesso."
        : "Categoria criada com sucesso.",
    );
    resetForm();
  }

  function handleEdit(categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
      return;
    }

    setErrorMessage(null);
    setFeedbackMessage(null);
    setEditingId(category.id);
    setForm({
      name: category.name,
      categoryClass: category.categoryClass,
      color: category.color,
    });
  }

  function handleDelete(categoryId: string) {
    deleteCategory(categoryId);

    if (editingId === categoryId) {
      resetForm();
    }

    setErrorMessage(null);
    setFeedbackMessage("Categoria excluída com sucesso.");
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <div className="surface-panel rounded-[34px] p-6 sm:p-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
            Categorias
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            {editingId ? "Editar categoria" : "Nova categoria"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            Organize suas categorias por classe e cor.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <InputField
            label="Nome da categoria"
            placeholder="Ex.: Casa, Estudos, Financeiro..."
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
          />

          <div className="space-y-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              Classe
            </span>
            <div className="grid grid-cols-2 gap-3">
              {(["Ocasional", "Rotina"] as TaskStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      categoryClass: status,
                    }))
                  }
                  className={cn(
                    "rounded-[22px] border px-4 py-3 text-left transition duration-200 ease-out",
                    form.categoryClass === status
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_12px_32px_rgba(15,118,110,0.14)]"
                      : "border-[var(--border)] bg-[var(--panel-soft)] hover:bg-[var(--panel)]",
                  )}
                >
                  <span className="block text-sm font-semibold text-[var(--text-primary)]">
                    {status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              Cor da categoria
            </span>
            <div className="grid grid-cols-5 gap-3">
              {CATEGORY_COLOR_OPTIONS.map((color) => {
                const isSelected = form.color === color.id;
                const isUnavailable = usedColorsInClass.has(color.id);

                return (
                  <button
                    key={color.id}
                    type="button"
                    disabled={isUnavailable}
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        color: color.id as CategoryColor,
                      }))
                    }
                    className={cn(
                      "relative grid aspect-square place-items-center rounded-[22px] border transition duration-200 ease-out",
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_12px_32px_rgba(15,118,110,0.14)]"
                        : "border-[var(--border)] bg-[var(--panel-soft)] hover:bg-[var(--panel)]",
                      isUnavailable
                        ? "cursor-not-allowed opacity-45 hover:bg-[var(--panel-soft)]"
                        : "",
                    )}
                    aria-label={color.label}
                    title={color.label}
                  >
                    <span
                      className={cn(
                        "size-8 rounded-full shadow-sm sm:size-9",
                        color.swatchClassName,
                      )}
                    />
                    {isSelected ? (
                      <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-[var(--text-primary)] text-[var(--background)] dark:bg-white dark:text-slate-900">
                        <CheckIcon className="size-3" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
              {errorMessage}
            </div>
          ) : null}

          {feedbackMessage ? (
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
              {feedbackMessage}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            {editingId ? (
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={resetForm}
              >
                Cancelar
              </Button>
            ) : null}
            <Button type="submit" className="w-full">
              {editingId ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <div className="surface-panel relative z-20 rounded-[34px] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Filtros
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                Categorias cadastradas
              </h3>
            </div>
            <div className="relative z-30" ref={filterRef}>
              <Button
                variant="secondary"
                onClick={() => setIsFilterOpen((current) => !current)}
                leadingIcon={<SlidersHorizontalIcon className="size-4" />}
                className="w-full sm:min-w-[220px]"
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
                {FILTER_LABELS[filter]}
              </Button>

              {isFilterOpen ? (
                <div className="surface-popover absolute right-0 top-[calc(100%+0.75rem)] z-50 w-full min-w-[280px] rounded-[28px] p-4 sm:w-[320px]">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                        Filtrar categorias
                      </p>
                      <h4 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                        Escolha uma classe
                      </h4>
                    </div>
                    <span className="rounded-full border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]">
                      {filteredCategories.length} resultado
                      {filteredCategories.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {TASK_STATUS_OPTIONS.map((option) => {
                      const count = categories.filter(
                        (category) => category.categoryClass === option,
                      ).length;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFilter(option);
                            setIsFilterOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between rounded-[22px] px-4 py-3 text-left transition duration-200 ease-out",
                            filter === option
                              ? "bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--border)]"
                              : "bg-[var(--panel-soft)] text-[var(--text-muted)] hover:bg-[var(--panel)] hover:text-[var(--text-primary)]",
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={cn(
                                "grid size-8 place-items-center rounded-xl",
                                filter === option
                                  ? "bg-white/70 text-[var(--accent)] dark:bg-white/10"
                                  : "bg-white/60 text-[var(--text-muted)] dark:bg-white/6",
                              )}
                            >
                              <CheckIcon className="size-4" />
                            </span>
                            <span className="block text-sm font-semibold">
                              {FILTER_LABELS[option]}
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
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="relative z-0 grid gap-4 md:grid-cols-2">
            {filteredCategories.map((category) => {
              const colorOption = getCategoryColorOption(category.color);

              return (
                <article
                  key={category.id}
                  className="surface-card rounded-[28px] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "size-4 rounded-full shadow-sm",
                            colorOption?.swatchClassName,
                          )}
                        />
                        <h4 className="truncate text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                          {category.name}
                        </h4>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                            category.categoryClass,
                          )}`}
                        >
                          {category.categoryClass}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${getCategoryBadgeClasses(
                            category.color,
                          )}`}
                        >
                          {colorOption?.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        onClick={() => handleEdit(category.id)}
                        aria-label="Editar categoria"
                      >
                        <PencilIcon className="size-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label="Excluir categoria"
                            className="border-rose-300/60 text-rose-700 hover:bg-rose-500/10 dark:border-rose-800 dark:text-rose-300"
                          >
                            <Trash2Icon className="size-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                              Confirmar exclusão
                            </p>
                            <AlertDialogTitle>
                              Excluir categoria
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {`Deseja excluir a categoria "${category.name}"? Esta ação remove a categoria da lista e não poderá ser desfeita.`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(category.id)}
                            >
                              Excluir categoria
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[30px] border border-dashed border-[var(--border-strong)] bg-[var(--panel-soft)] px-6 py-12 text-center">
            <div className="mx-auto max-w-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Nenhuma categoria encontrada
              </p>
              <h4 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                Crie sua primeira categoria
              </h4>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                Cadastre categorias para classificar tarefas por tipo e cor.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
