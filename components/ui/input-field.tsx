import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

interface BaseFieldProps {
  label: string;
  hint?: string;
  icon?: ReactNode;
}

interface InputFieldProps
  extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {}

interface TextareaFieldProps
  extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function InputField({
  label,
  hint,
  icon,
  className,
  ...props
}: InputFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[var(--text-primary)]">
        {label}
      </span>
      <span
        className={cn(
          "input-shell flex h-13 items-center gap-3 rounded-2xl px-4 transition duration-200 ease-out",
          className,
        )}
      >
        {icon ? (
          <span className="text-[var(--text-muted)] [&>svg]:size-[18px]">
            {icon}
          </span>
        ) : null}
        <input
          className="w-full border-0 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-faint)]"
          {...props}
        />
      </span>
      {hint ? (
        <span className="text-xs text-[var(--text-muted)]">{hint}</span>
      ) : null}
    </label>
  );
}

export function TextareaField({
  label,
  hint,
  icon,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[var(--text-primary)]">
        {label}
      </span>
      <span
        className={cn(
          "input-shell flex max-h-24 gap-3 rounded-2xl px-4 py-3 transition duration-200 ease-out",
          className,
        )}
      >
        {icon ? (
          <span className="mt-1 text-[var(--text-muted)] [&>svg]:size-[18px]">
            {icon}
          </span>
        ) : null}
        <textarea
          className="min-h-24 w-full resize-none border-0 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-faint)]"
          {...props}
        />
      </span>
      {hint ? (
        <span className="text-xs text-[var(--text-muted)]">{hint}</span>
      ) : null}
    </label>
  );
}
