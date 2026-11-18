"use client";

import { useController } from "react-hook-form";
import type {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";

export type CheckboxOption = {
  value: string;
  label: string;
};

type FormCheckboxGroupProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: readonly CheckboxOption[];
  helperText?: string;
  className?: string;
};

export default function FormCheckboxGroup<T extends FieldValues>({
  control,
  name,
  label,
  options,
  helperText,
  className = "",
}: FormCheckboxGroupProps<T>) {
  const { field, fieldState } = useController({ control, name });

  const selectedValues: string[] = Array.isArray(field.value)
    ? field.value
    : [];

  const groupId = `catering-${String(name).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  const errorId = `${groupId}-error`;
  const helperId = `${groupId}-helper`;

  function toggleOption(value: string) {
    const nextValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    field.onChange(nextValues);
  }

  return (
    <fieldset
      className={className}
      aria-describedby={
        fieldState.error ? errorId : helperText ? helperId : undefined
      }
      aria-invalid={fieldState.invalid}
      onBlur={field.onBlur}
    >
      <legend className="text-sm font-bold text-[#301508]">
        {label}
      </legend>

      {helperText && (
        <p id={helperId} className="mt-1 text-xs text-[#715c4d]">
          {helperText}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option, index) => {
          const checked = selectedValues.includes(option.value);
          const inputId = `${groupId}-${index}`;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                checked
                  ? "border-[#301508] bg-[#ffe4a3] text-[#301508]"
                  : "border-[#e5dacf] bg-[#fffaf3] text-[#301508] hover:border-[#301508]"
              }`}
            >
              <input
                ref={index === 0 ? field.ref : undefined}
                id={inputId}
                name={field.name}
                type="checkbox"
                value={option.value}
                checked={checked}
                onChange={() => toggleOption(option.value)}
                onBlur={field.onBlur}
                className="sr-only"
              />

              <span
                aria-hidden="true"
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  checked
                    ? "border-[#1d6b3c] bg-[#1d6b3c] text-white"
                    : "border-[#b8a99b] bg-transparent"
                }`}
              >
                {checked && (
                  <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                    <path
                      d="m3.5 8 3 3 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>

              {option.label}
            </label>
          );
        })}
      </div>

      {fieldState.error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-[#a52817]">
          {fieldState.error.message}
        </p>
      )}
    </fieldset>
  );
}