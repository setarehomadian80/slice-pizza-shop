"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Image from "next/image";

import type { Deal, DealCartItem, DealTheme } from "@/types/deal";
import { dealFields } from "@/constants/deal-options";

type DealModalProps = {
  deal: Deal;
  onClose: () => void;
  onAdd: (item: DealCartItem) => void | Promise<void>;
  initialItem?: DealCartItem;
  onUpdate?: (item: DealCartItem) => void | Promise<void>;
};

const panelStyles: Record<DealTheme, string> = {
  yellow: "bg-[#ffca38] text-[#301508]",
  red: "bg-[#d42b15] text-[#fff6e3]",
  green: "bg-[#1d6b3c] text-[#fff6e3]",
};

function formatPrice(pence: number) {
  return `£${(pence / 100).toFixed(2)}`;
}

export default function DealModal({
  deal,
  onClose,
  onAdd,
  initialItem,
  onUpdate,
}: DealModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submittingRef = useRef(false);
  const titleId = useId();
  const descriptionId = useId();
  const fieldPrefix = useId();

  const fields = dealFields[deal.id] ?? [];
  const isEditing = Boolean(initialItem);

  const [quantity, setQuantity] = useState(initialItem?.quantity ?? 1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};

    for (const field of fields) {
      if (field.kind === "select") {
        const savedValue = initialItem?.selections[field.id];

        initial[field.id] =
          savedValue && field.options.includes(savedValue)
            ? savedValue
            : field.defaultValue;
      }
    }

    return initial;
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, []);

  const total = deal.priceInPence * quantity;
  const originalTotal = deal.originalPriceInPence * quantity;
  const saving = originalTotal - total;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;

    const valid =
      fields.length > 0 &&
      fields.every(
        (field) =>
          field.kind === "included" ||
          field.options.includes(selections[field.id] ?? ""),
      );

    if (!valid) {
      setError("Please choose an option for every item.");
      return;
    }

    if (isEditing && !onUpdate) {
      setError("Could not update this deal. Please try again.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError("");

    const item: DealCartItem = {
      id: crypto.randomUUID(),
      dealId: deal.id,
      title: deal.title,
      image: deal.images[0]?.src ?? "/image/margherita.svg",
      quantity,
      unitPriceInPence: deal.priceInPence,
      selections: { ...selections },
      included: fields.flatMap((field) =>
        field.kind === "included" ? [field.label] : [],
      ),
    };

    try {
      if (initialItem && onUpdate) {
        await onUpdate(item);
      } else {
        await onAdd(item);
      }
    } catch {
      submittingRef.current = false;
      setSubmitting(false);
      setError(
        isEditing
          ? "Could not update this deal. Please try again."
          : "Could not add this deal. Please try again.",
      );
      return;
    }

    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      dir="ltr"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();

        if (!submittingRef.current) {
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        if (submittingRef.current) return;

        const bounds = event.currentTarget.getBoundingClientRect();

        const outside =
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom;

        if (outside) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-[900px] overflow-y-auto overscroll-contain rounded-[28px] border-0 bg-[#fff6e3] p-0 text-[#301508] shadow-2xl backdrop:bg-[#301508]/55 md:overflow-hidden"
    >
      <div className="relative grid md:h-[min(760px,90dvh)] md:grid-cols-[0.85fr_1.15fr]">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#301508]/10 bg-[#fffcf5] text-2xl shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
        >
          <span aria-hidden="true">×</span>
        </button>

        {/* Left illustration panel */}
        <div
          className={`flex flex-col items-center justify-center gap-5 px-6 py-8 md:py-12 ${panelStyles[deal.theme]}`}
        >
          <Image
            src="/image/margherita.svg"
            alt="Margherita pizza"
            width={300}
            height={300}
            sizes="(max-width: 767px) 160px, 300px"
            className="h-auto w-40 max-w-full object-contain drop-shadow-lg md:w-[300px]"
          />

          <p className="max-w-[280px] text-center text-xs font-black uppercase tracking-[0.12em]">
            {deal.availability}
          </p>
        </div>

        {/* Right form panel */}
        <form
          onSubmit={handleSubmit}
          aria-busy={submitting}
          className="flex min-h-0 min-w-0 flex-col"
        >
          <div className="px-5 pb-6 pt-8 sm:px-8 md:min-h-0 md:flex-1 md:overflow-y-auto">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#922513]">
              Deal
            </p>

            <h2
              id={titleId}
              className="mt-1 pr-10 font-serif text-3xl font-black italic leading-tight sm:text-4xl"
            >
              {deal.title}
            </h2>

            <p
              id={descriptionId}
              className="mt-3 text-sm leading-6 text-[#705a4b]"
            >
              {deal.description}. Deal pizzas come on our classic sourdough;
              extras aren’t included.
            </p>

            <fieldset disabled={submitting} className="mt-6 space-y-4">
              <legend className="sr-only">Choose your bundle items</legend>

              {fields.map((field) => {
                if (field.kind === "included") {
                  return (
                    <div
                      key={field.id}
                      className="flex items-center gap-3 rounded-2xl bg-[#f8e8ca] px-4 py-3"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1d6b3c] text-[10px] text-white"
                      >
                        ✓
                      </span>

                      <span className="text-sm font-bold">{field.label}</span>

                      <span className="ml-auto text-xs font-semibold text-[#705a4b]">
                        Included
                      </span>
                    </div>
                  );
                }

                const inputId = `${fieldPrefix}-${field.id}`;

                return (
                  <div key={field.id}>
                    <label
                      htmlFor={inputId}
                      className="mb-2 block text-sm font-bold"
                    >
                      {field.label}
                    </label>

                    <div className="relative">
                      <select
                        id={inputId}
                        name={field.id}
                        required
                        value={selections[field.id] ?? ""}
                        onChange={(event) => {
                          const value = event.target.value;

                          setSelections((current) => ({
                            ...current,
                            [field.id]: value,
                          }));

                          setError("");
                        }}
                        className="min-h-12 w-full appearance-none rounded-2xl border-2 border-[#ded5c8] bg-[#fffcf5] py-3 pl-4 pr-10 text-sm outline-none focus:border-[#301508] disabled:opacity-60"
                      >
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </fieldset>
          </div>

          <div className="shrink-0 border-t border-[#301508]/10 bg-[#fff6e3] px-5 py-4 sm:px-8">
            <p className="text-sm leading-6 text-[#705a4b]">
              Worth {formatPrice(originalTotal)} on its own.{" "}
              <strong className="text-[#1d6b3c]">
                You save {formatPrice(saving)}.
              </strong>
            </p>

            {error && (
              <p role="alert" className="mt-2 text-sm text-[#b92312]">
                {error}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div
                role="group"
                aria-label="Quantity"
                className="flex items-center rounded-full bg-[#f8e8ca]"
              >
                <button
                  type="button"
                  disabled={quantity <= 1 || submitting}
                  onClick={() => setQuantity((value) => value - 1)}
                  aria-label={`One fewer ${deal.title}`}
                  className="h-11 w-10 rounded-full text-xl font-bold focus-visible:outline disabled:opacity-30"
                >
                  −
                </button>

                <output
                  aria-live="polite"
                  className="min-w-7 text-center font-extrabold"
                >
                  {quantity}
                </output>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label={`One more ${deal.title}`}
                  className="h-11 w-10 rounded-full text-xl font-bold focus-visible:outline disabled:opacity-30"
                >
                  +
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting || fields.length === 0}
                className="flex min-h-[52px] min-w-[180px] flex-1 items-center justify-between gap-4 rounded-full border-b-4 border-[#991b0c] bg-[#d42b15] px-6 py-3 text-sm font-extrabold text-[#fff6e3] hover:bg-[#bb2512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d42b15] disabled:cursor-wait disabled:opacity-60"
              >
                <span>
                  {submitting
                    ? isEditing
                      ? "Saving…"
                      : "Adding…"
                    : isEditing
                      ? "Save changes"
                      : "Add deal"}
                </span>

                <span>{formatPrice(total)}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
