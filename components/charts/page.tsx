"use client";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, HourglassIcon } from "@/components/ui/icons";

export default function ChartsPage() {
  const { setCurrentView } = useAppContext();

  return (
    <section className="surface-panel flex h-[95%] items-center justify-center rounded-[34px] p-6 sm:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full border border-[var(--border)] bg-[var(--panel-soft)] text-[var(--accent)] shadow-[0_18px_40px_rgba(15,118,110,0.12)]">
          <HourglassIcon className="size-9 animate-spin" />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
          Módulo em construção
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-4xl">
          Página em desenvolvimento
        </h2>
        <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
          Em breve seus rendimentos estarão disponíveis nesta área com gráficos
          e detalhes avançados.
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setCurrentView("dashboard")}
            leadingIcon={<ArrowRightIcon className="size-4 rotate-180" />}
          >
            Voltar para home
          </Button>
        </div>
      </div>
    </section>
  );
}
