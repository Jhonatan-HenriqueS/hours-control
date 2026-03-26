import { LogoMark } from "@/components/ui/logo-mark";

export function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="surface-panel animate-fade-in w-full max-w-md rounded-[32px] p-8 text-center">
        <div className="mx-auto mb-6 flex justify-center">
          <LogoMark compact={false} />
        </div>
        <div className="mx-auto mb-6 h-1.5 w-24 overflow-hidden rounded-full bg-[var(--panel-soft)]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[var(--accent)]" />
        </div>
        <h1 className="text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
          Preparando seu ambiente
        </h1>
        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
          Carregando preferências, sessão e tarefas salvas localmente.
        </p>
      </div>
    </main>
  );
}
