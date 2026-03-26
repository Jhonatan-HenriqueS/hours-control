"use client";

import { useState, useTransition } from "react";

import { useAppContext } from "@/components/app/app-provider";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  DashboardIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { InputField } from "@/components/ui/input-field";
import { LogoMark } from "@/components/ui/logo-mark";
import type { AuthMode } from "@/types/app";

const initialForm = {
  name: "",
  email: "",
  password: "",
};

const authHighlights = [
  "Dashboard premium com leitura rápida das prioridades.",
  "Persistência local de tema, sessão e tarefas.",
  "Fluxo pronto para futura integração com backend real.",
];

export function AuthScreen() {
  const { login, register } = useAppContext();
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    startTransition(() => {
      const result = mode === "login" ? login(form) : register(form);

      if (!result.ok) {
        setErrorMessage(result.message ?? "Não foi possível continuar.");
      }
    });
  }

  const title = mode === "login" ? "Entrar na sua operação" : "Criar sua conta";
  const subtitle =
    mode === "login"
      ? "Acesse seu ambiente com visual refinado e foco total nas entregas."
      : "Ative seu workspace pessoal e comece a organizar tarefas com clareza.";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.14),transparent_30%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <section className="surface-panel animate-fade-in relative hidden overflow-hidden rounded-[36px] p-10 lg:flex lg:min-h-180 lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(15,118,110,0.08),transparent_40%,rgba(56,189,248,0.08))]" />
          <div className="relative z-10">
            <LogoMark />
            <div className="mt-14 max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <SparklesIcon className="size-4" />
                Workspace pessoal premium
              </span>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.05em] text-(--text-primary)">
                Tarefas, prioridades e rituais em um fluxo mais claro.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-(--text-muted)">
                Uma interface desenhada para parecer produto real: precisa,
                elegante e preparada para crescer sem ruído visual.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="surface-card rounded-[28px] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">
                  Foco
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-(--text-primary)">
                  12h
                </p>
                <p className="mt-2 text-sm text-(--text-muted)">
                  Ganho médio semanal com contexto organizado.
                </p>
              </div>
              <div className="surface-card rounded-[28px] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">
                  Clareza
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-(--text-primary)">
                  2x
                </p>
                <p className="mt-2 text-sm text-(--text-muted)">
                  Leitura mais rápida do que exige ação imediata.
                </p>
              </div>
              <div className="surface-card rounded-[28px] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">
                  Ritmo
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-(--text-primary)">
                  100%
                </p>
                <p className="mt-2 text-sm text-(--text-muted)">
                  Persistência local pronta para uso imediato.
                </p>
              </div>
            </div>

            <div className="surface-card rounded-[28px] p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-(--accent-soft) text-(--accent)">
                  <DashboardIcon className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold tracking-[-0.03em] text-(--text-primary)">
                    Tudo pronto para evoluir
                  </h2>
                  <p className="text-sm text-(--text-muted)">
                    Base limpa para autenticação real, API e múltiplos módulos.
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {authHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-(--border) bg-(--panel-soft) px-4 py-3"
                  >
                    <span className="mt-1 size-2 rounded-full bg-(--accent)" />
                    <p className="text-sm leading-6 text-(--text-muted)">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="surface-card animate-fade-in rounded-[36px] p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-center justify-between">
            <LogoMark compact />
            <span className="rounded-full border border-(--border) bg-(--panel-soft) px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
              {mode === "login" ? "Acesso" : "Cadastro"}
            </span>
          </div>

          <div className="max-w-md">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
              {subtitle}
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Nome"
              placeholder="Seu nome completo"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              autoComplete="name"
            />
            <InputField
              label="Email"
              type="email"
              placeholder="voce@empresa.com"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              autoComplete="email"
            />
            <InputField
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              hint={
                mode === "register"
                  ? "Use no mínimo 6 caracteres."
                  : "Se o email já estiver cadastrado, a senha será validada."
              }
            />

            {errorMessage ? (
              <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
                {errorMessage}
              </div>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              trailingIcon={<ArrowRightIcon className="size-4" />}
              loading={isPending}
            >
              {mode === "login" ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <div className="mt-6 rounded-[28px] border border-[var(--border)] bg-[var(--panel-soft)] p-5">
            <p className="text-sm text-[var(--text-muted)]">
              {mode === "login" ? "Não possui cadastro?" : "Já possui conta?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setMode((current) =>
                  current === "login" ? "register" : "login",
                );
              }}
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition hover:opacity-80"
            >
              {mode === "login" ? "Criar conta" : "Voltar para login"}
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
