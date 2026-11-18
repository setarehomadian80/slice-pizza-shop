"use client";

import { useController } from "react-hook-form";
import type {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "date" | "time";
  placeholder?: string;
  hint?: string;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  autoComplete?: string;
  className?: string;
};

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  hint,
  required = false,
  min,
  max,
  step,
  autoComplete,
  className = "",
}: FormInputProps<T>) {
  const { field, fieldState } = useController({ control, name });

  const inputId = `catering-${String(name).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const describedBy = [
    hint ? hintId : null,
    fieldState.error ? errorId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-bold text-[#301508]"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[#a52817]">
            *
          </span>
        )}
      </label>

      <input
        {...field}
        id={inputId}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        value={field.value ?? ""}
        onChange={(event) => {
          if (type === "number") {
            field.onChange(
              event.target.value === ""
                ? undefined
                : Number(event.target.value),
            );
            return;
          }

          field.onChange(event);
        }}
        aria-invalid={fieldState.invalid}
        aria-describedby={describedBy}
        className="min-h-12 w-full rounded-[16px] border-2 border-[#e5dacf] bg-[#fffaf3] px-4 text-sm text-[#301508] outline-none transition-colors placeholder:text-[#9b8d81] focus:border-[#301508] disabled:cursor-not-allowed disabled:bg-[#eee8e2]"
      />

      {hint && !fieldState.error && (
        <p id={hintId} className="mt-1.5 text-xs leading-5 text-[#715c4d]">
          {hint}
        </p>
      )}

      {fieldState.error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-xs leading-5 text-[#a52817]"
        >
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}