"use client";

import { useController } from "react-hook-form";
import type {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";

export type RadioOption = {
  value: string;
  label: string;
};

type FormRadioGroupProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: readonly RadioOption[];
  className?: string;
};

export default function FormRadioGroup<T extends FieldValues>({
  control,
  name,
  label,
  options,
  className = "",
}: FormRadioGroupProps<T>) {
  const { field, fieldState } = useController({ control, name });

  const groupId = `catering-${String(name).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  const errorId = `${groupId}-error`;

  return (
    <fieldset
      className={className}
      aria-describedby={fieldState.error ? errorId : undefined}
      aria-invalid={fieldState.invalid}
    >
      <legend className="text-sm font-bold text-[#301508]">{label}</legend>

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option, index) => {
          const selected = field.value === option.value;
          const inputId = `${groupId}-${index}`;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`inline-flex min-h-10 cursor-pointer items-center rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                selected
                  ? "border-[#301508] bg-[#ffe4a3] text-[#301508]"
                  : "border-[#e5dacf] bg-[#fffaf3] text-[#301508] hover:border-[#301508]"
              }`}
            >
              <input
                ref={index === 0 ? field.ref : undefined}
                id={inputId}
                name={field.name}
                type="radio"
                value={option.value}
                checked={selected}
                onChange={() => field.onChange(option.value)}
                onBlur={field.onBlur}
                className="sr-only"
              />

              <span
                aria-hidden="true"
                className={`mr-2 flex h-4 w-4 items-center justify-center rounded-full border ${
                  selected
                    ? "border-[#1d6b3c]"
                    : "border-[#b8a99b]"
                }`}
              >
                {selected && (
                  <span className="h-2 w-2 rounded-full bg-[#1d6b3c]" />
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