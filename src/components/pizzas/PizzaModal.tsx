"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import { pizzas } from "@/constants/pizzas";
import {
  crustOptions,
  toppingGroups,
  toppingPriceBySize,
  MAX_TOPPINGS,
  MAX_PIZZA_QUANTITY,
} from "@/constants/pizza-options";

import { useCartStore } from "@/store/cart-store";
import type { Pizza, PizzaSize } from "@/types/product";
import type { CrustId } from "@/types/pizza-options";

type PizzaModalProps = {
  pizza: Pizza;
  onClose: () => void;
};

type PizzaPreviewProps = {
  pizza: Pizza;
  otherHalf?: Pizza;
};

const allToppings = toppingGroups.flatMap((group) => group.options);

const focusClasses =
  "focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-[#d42b15]";

const optionClasses =
  "block h-full rounded-2xl border-2 border-[#e6dfd3] " +
  "bg-[#fffcf5] transition-colors " +
  "peer-checked:border-[#301508] peer-checked:bg-[#ffeba8] " +
  "peer-focus-visible:outline peer-focus-visible:outline-2 " +
  "peer-focus-visible:outline-offset-2 " +
  "peer-focus-visible:outline-[#d42b15] " +
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-40";

function money(amount: number): string {
  return `£${(amount / 100).toFixed(2)}`;
}

function validPrice(amount: number): boolean {
  return Number.isSafeInteger(amount) && amount >= 0;
}

function PizzaPreview({ pizza, otherHalf }: PizzaPreviewProps) {
  return (
    <div
      role="img"
      aria-label={
        otherHalf
          ? `Half ${pizza.name}, half ${otherHalf.name}`
          : `${pizza.name} pizza`
      }
      className="relative mx-auto aspect-square w-full max-w-[320px] drop-shadow-[0_12px_12px_rgba(90,45,10,0.12)]"
    >
      <Image
        src={pizza.image}
        alt=""
        fill
        sizes="(max-width: 767px) 220px, 320px"
        className="object-contain"
        style={
          otherHalf
            ? { clipPath: "inset(0 50% 0 0)" }
            : undefined
        }
      />

      {otherHalf && (
        <Image
          src={otherHalf.image}
          alt=""
          fill
          sizes="(max-width: 767px) 220px, 320px"
          className="object-contain"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        />
      )}
    </div>
  );
}

export default function PizzaModal({
  pizza,
  onClose,
}: PizzaModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const addingRef = useRef(false);

  const titleId = useId();
  const descriptionId = useId();
  const sizeName = useId();
  const crustName = useId();
  const otherHalfId = useId();
  const toppingsHintId = useId();

  const sizes = pizza.sizes ?? [];

  const [size, setSize] = useState<PizzaSize>(
    sizes.find((option) => option.size === "regular")?.size ??
      sizes[0]?.size ??
      "small"
  );

  const [crustId, setCrustId] = useState<CrustId>("classic");
  const [halfEnabled, setHalfEnabled] = useState(false);
  const [otherHalfIdValue, setOtherHalfIdValue] = useState("");
  const [toppingIds, setToppingIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  const selectedSize = sizes.find((option) => option.size === size);
  const crust = crustOptions.find((option) => option.id === crustId);

  const halfChoices = pizzas.filter(
    (candidate) =>
      candidate.id !== pizza.id &&
      candidate.sizes?.some(
        (option) =>
          option.size === size && validPrice(option.priceInPence)
      )
  );

  const canHalf =
    size !== "small" &&
    crustId !== "gluten-free" &&
    halfChoices.length > 0;

  const otherHalf =
    halfEnabled && canHalf
      ? halfChoices.find(
          (candidate) => candidate.id === otherHalfIdValue
        ) ?? halfChoices[0]
      : undefined;

  const otherHalfSize = otherHalf?.sizes?.find(
    (option) => option.size === size
  );

  // ترتیب ثابت: ترتیب کلیک روی افزودنی‌ها روی تشخیص
  // محصولات یکسان در سبد تأثیری نمی‌گذارد.
  const selectedToppings = allToppings.filter((topping) =>
    toppingIds.includes(topping.id)
  );

  const extraPrice = toppingPriceBySize[size];

  const basePrice = Math.max(
    selectedSize?.priceInPence ?? 0,
    otherHalfSize?.priceInPence ?? 0
  );

  const unitPriceInPence =
    basePrice +
    (crust?.priceInPence ?? 0) +
    selectedToppings.length * extraPrice;

  const totalPriceInPence = unitPriceInPence * quantity;

  const canAdd =
    selectedSize !== undefined &&
    crust !== undefined &&
    validPrice(selectedSize.priceInPence) &&
    (!crust.onlySize || crust.onlySize === size) &&
    (!halfEnabled ||
      (canHalf &&
        otherHalfSize !== undefined &&
        validPrice(otherHalfSize.priceInPence))) &&
    selectedToppings.length <= MAX_TOPPINGS &&
    validPrice(unitPriceInPence) &&
    validPrice(totalPriceInPence) &&
    Number.isSafeInteger(quantity) &&
    quantity >= 1 &&
    quantity <= MAX_PIZZA_QUANTITY;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) dialog.showModal();

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;

      if (
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected
      ) {
        previousFocus.focus();
      }
    };
  }, []);

  function handleSize(nextSize: PizzaSize) {
    setSize(nextSize);
    setNotice("");
    setError("");

    if (nextSize === "small") {
      setHalfEnabled(false);
    }

    if (crust?.onlySize && crust.onlySize !== nextSize) {
      setCrustId("classic");
      setNotice(
        "Gluten-free base is Small only. Crust changed to classic sourdough."
      );
    }

    const nextHalfChoices = pizzas.filter(
      (candidate) =>
        candidate.id !== pizza.id &&
        candidate.sizes?.some(
          (option) =>
            option.size === nextSize &&
            validPrice(option.priceInPence)
        )
    );

    if (nextHalfChoices.length === 0) {
      setHalfEnabled(false);
    }
  }

  function handleCrust(nextId: CrustId) {
    const nextCrust = crustOptions.find(
      (option) => option.id === nextId
    );

    if (!nextCrust) return;

    if (
      nextCrust.onlySize &&
      !sizes.some((option) => option.size === nextCrust.onlySize)
    ) {
      return;
    }

    setCrustId(nextId);
    setNotice("");
    setError("");

    if (nextCrust.onlySize) {
      setSize(nextCrust.onlySize);
      setHalfEnabled(false);
      setNotice(
        "Gluten-free base comes in Small 10″ only. Half & half is unavailable on Small."
      );
    }
  }

  function toggleTopping(id: string) {
    setToppingIds((current) => {
      if (current.includes(id)) {
        return current.filter((value) => value !== id);
      }

      if (current.length >= MAX_TOPPINGS) return current;

      return [...current, id];
    });
  }

  function handleAdd() {
    if (
      !canAdd ||
      !selectedSize ||
      !crust ||
      addingRef.current
    ) {
      return;
    }

    addingRef.current = true;
    setError("");

    const selections: Record<string, string> = {
      Size: `${selectedSize.label} ${selectedSize.inches}″`,
      Crust: crust.name,
    };

    if (otherHalf) {
      selections["Other half"] = otherHalf.name;

      // شناسه برای تشخیص دقیق انتخاب، حتی با نام‌های مشابه
      selections["Other half ID"] = otherHalf.id;
    }

    try {
      addItem({
        id: crypto.randomUUID(),
        pizzaId: pizza.id,
        title: otherHalf
          ? `${pizza.name} / ${otherHalf.name}`
          : pizza.name,
        quantity,
        unitPriceInPence,
        selections,
        included: selectedToppings.map((topping) => topping.name),
      });
    } catch {
      addingRef.current = false;
      setError("Could not add your pizza. Please try again.");
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
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const bounds = event.currentTarget.getBoundingClientRect();

        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          onClose();
        }
      }}
      className="fixed inset-0 m-auto h-[92dvh] max-h-[960px] w-[calc(100%_-_1rem)] max-w-[900px] overflow-hidden rounded-[28px] border-0 bg-[#fff6e3] p-0 text-[#301508] shadow-2xl backdrop:bg-[#301508]/55 sm:w-[calc(100%_-_2rem)]"
    >
      <div className="relative grid h-full min-h-0 grid-cols-1 md:grid-cols-[0.85fr_1.15fr]">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close pizza options"
          className={`absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#e6dfd3] bg-[#fffcf5] shadow-sm hover:bg-[#f5e6ce] ${focusClasses}`}
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Desktop preview */}
        <aside className="hidden min-h-0 flex-col items-center justify-center overflow-y-auto bg-[#ffeba8] px-7 py-10 md:flex">
          <PizzaPreview pizza={pizza} otherHalf={otherHalf} />

          {!otherHalf && pizza.diet && (
            <span className="mt-6 rounded-full bg-[#e7efdb] px-3 py-1 text-xs font-bold text-[#28613a]">
              {pizza.diet} base pizza
            </span>
          )}

          <p className="mt-4 text-center text-xs leading-5 text-[#735b4b]">
            Dietary suitability depends on your selected crust
            and toppings.
          </p>

          <p className="mt-3 text-center text-xs leading-5 text-[#735b4b]">
            For allergen information, please ask us before ordering.
          </p>

          {crustId === "gluten-free" && (
            <p className="mt-3 text-center text-xs font-semibold leading-5">
              Gluten-free bases are made in a kitchen that handles flour.
            </p>
          )}
        </aside>

        <div className="flex min-h-0 min-w-0 flex-col">
          {/* Scrollable options */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-7 pt-16 sm:px-8 md:pt-8">
            <div className="mb-6 rounded-2xl bg-[#ffeba8] p-5 md:hidden">
              <div className="mx-auto max-w-[220px]">
                <PizzaPreview pizza={pizza} otherHalf={otherHalf} />
              </div>
            </div>

            <h2
              id={titleId}
              style={{ fontFamily: "var(--font-shrikhand)" }}
              className="pr-8 text-3xl font-black italic tracking-tight"
            >
              {pizza.name}
            </h2>

            <p
              id={descriptionId}
              className="mt-3 text-sm leading-6 text-[#735b4b]"
            >
              {pizza.description}
            </p>

            {/* Size */}
            <fieldset className="mt-6">
              <legend className="text-sm font-extrabold">
                Size
              </legend>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {sizes.map((option) => (
                  <label key={option.size} className="cursor-pointer">
                    <input
                      type="radio"
                      name={sizeName}
                      value={option.size}
                      checked={size === option.size}
                      onChange={() => handleSize(option.size)}
                      className="peer sr-only"
                    />

                    <span
                      className={`${optionClasses} px-2 py-3 text-center`}
                    >
                      <span aria-hidden="true" className="block text-2xl">
                        🍕
                      </span>

                      <span className="mt-1 block text-sm font-extrabold">
                        {option.label}
                      </span>

                      <span className="mt-1 block text-xs text-[#735b4b]">
                        {option.inches}″
                      </span>

                      <span className="mt-1 block text-sm font-bold">
                        {money(
                          option.priceInPence +
                            (crust &&
                            (!crust.onlySize ||
                              crust.onlySize === option.size)
                              ? crust.priceInPence
                              : 0)
                        )}
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              {sizes.length === 0 && (
                <p className="mt-3 text-sm text-[#a52817]">
                  No sizes are available for this pizza.
                </p>
              )}
            </fieldset>

            {/* Crust */}
            <fieldset className="mt-6">
              <legend className="text-sm font-extrabold">
                Crust
              </legend>

              <div className="mt-3 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
                {crustOptions.map((option) => {
                  const unavailable =
                    option.onlySize !== undefined &&
                    !sizes.some(
                      (pizzaSize) => pizzaSize.size === option.onlySize
                    );

                  return (
                    <label key={option.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name={crustName}
                        value={option.id}
                        checked={crustId === option.id}
                        disabled={unavailable}
                        onChange={() => handleCrust(option.id)}
                        className="peer sr-only"
                      />

                      <span className={`${optionClasses} p-3`}>
                        <span className="flex items-start justify-between gap-2">
                          <span className="text-sm font-extrabold">
                            {option.name}
                          </span>

                          <span className="shrink-0 text-xs font-bold">
                            {option.priceInPence === 0
                              ? "Free"
                              : `+${money(option.priceInPence)}`}
                          </span>
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-[#735b4b]">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <p
              role="status"
              className={
                notice
                  ? "mt-3 rounded-xl bg-[#ffeba8] p-3 text-xs leading-5"
                  : "sr-only"
              }
            >
              {notice}
            </p>

            {/* Half and half */}
            <div className="mt-6 rounded-[22px] bg-[#fae8ca] p-4">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span>
                  <span className="block text-sm font-extrabold">
                    Make it half &amp; half
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-[#735b4b]">
                    {canHalf
                      ? "Two pizzas on one base, charged at the pricier half."
                      : "Available on Regular and Large with an eligible second pizza."}
                  </span>
                </span>

                <input
                  type="checkbox"
                  checked={halfEnabled}
                  disabled={!canHalf}
                  onChange={(event) => {
                    setHalfEnabled(event.target.checked);
                    setError("");
                  }}
                  className="peer sr-only"
                />

                <span
                  aria-hidden="true"
                  className="relative h-7 w-12 shrink-0 rounded-full bg-[#b5a995] transition-colors after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-[#28613a] peer-checked:after:translate-x-5 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#d42b15] peer-disabled:opacity-40"
                />
              </label>

              {halfEnabled && canHalf && (
                <div className="mt-4">
                  <label
                    htmlFor={otherHalfId}
                    className="text-sm font-bold"
                  >
                    Other half
                  </label>

                  <select
                    id={otherHalfId}
                    value={otherHalf?.id ?? ""}
                    onChange={(event) =>
                      setOtherHalfIdValue(event.target.value)
                    }
                    className={`mt-2 min-h-12 w-full rounded-2xl border border-[#d9cbb8] bg-[#fffcf5] px-3 text-sm ${focusClasses}`}
                  >
                    {halfChoices.map((candidate) => {
                      const option = candidate.sizes?.find(
                        (entry) => entry.size === size
                      );

                      return (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.name}
                          {option
                            ? ` (${money(option.priceInPence)})`
                            : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>

            {/* Toppings */}
            <fieldset className="mt-6" aria-describedby={toppingsHintId}>
              <legend className="text-sm font-extrabold">
                Extra toppings
              </legend>

              <p
                id={toppingsHintId}
                className="mt-1 text-xs leading-5 text-[#735b4b]"
              >
                Up to {MAX_TOPPINGS}, added to the whole pizza.
              </p>

              <p
                role="status"
                className="mt-2 text-xs font-bold text-[#28613a]"
              >
                {selectedToppings.length} / {MAX_TOPPINGS} selected
                {selectedToppings.length === MAX_TOPPINGS &&
                  " — remove one to choose another."}
              </p>

              {toppingGroups.map((group) => (
                <div key={group.id} className="mt-5">
                  <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#735b4b]">
                    {group.title}
                  </h3>

                  <div className="mt-2 space-y-2">
                    {group.options.map((topping) => {
                      const checked = toppingIds.includes(topping.id);
                      const disabled =
                        !checked &&
                        toppingIds.length >= MAX_TOPPINGS;

                      return (
                        <label
                          key={topping.id}
                          className={`flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2 ${
                            checked
                              ? "border-[#301508] bg-[#ffeba8]"
                              : "border-[#e6dfd3] bg-[#fffcf5]"
                          } ${
                            disabled
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            onChange={() => toggleTopping(topping.id)}
                            className={`h-4 w-4 shrink-0 accent-[#28613a] ${focusClasses}`}
                          />

                          <span className="flex-1 text-sm">
                            {topping.name}
                          </span>

                          <span className="shrink-0 text-xs font-bold">
                            +{money(extraPrice)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </fieldset>

            <p className="mt-6 text-xs leading-5 text-[#735b4b] md:hidden">
              Dietary suitability depends on your selections.
              Ask us for allergen information before ordering.
              {crustId === "gluten-free" &&
                " Gluten-free bases are made in a kitchen that handles flour."}
            </p>
          </div>

          {/* Fixed bottom actions */}
          <footer className="shrink-0 border-t border-[#e6dfd3] bg-[#fff6e3] px-4 py-4 sm:px-8">
            {error && (
              <p role="alert" className="mb-3 text-sm text-[#a52817]">
                {error}
              </p>
            )}

            <div className="flex items-center gap-3">
              <div
                role="group"
                aria-label="Quantity"
                className="flex shrink-0 items-center rounded-full bg-[#fae8ca] p-1"
              >
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label={`One fewer ${pizza.name}`}
                  className={`flex h-10 w-9 items-center justify-center rounded-full disabled:opacity-30 ${focusClasses}`}
                >
                  <Minus size={16} aria-hidden="true" />
                </button>

                <span
                  aria-live="polite"
                  aria-atomic="true"
                  className="min-w-6 text-center text-sm font-extrabold tabular-nums"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  disabled={quantity >= MAX_PIZZA_QUANTITY}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(MAX_PIZZA_QUANTITY, current + 1)
                    )
                  }
                  aria-label={`One more ${pizza.name}`}
                  className={`flex h-10 w-9 items-center justify-center rounded-full disabled:opacity-30 ${focusClasses}`}
                >
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                disabled={!canAdd}
                onClick={handleAdd}
                className={`flex min-h-12 min-w-0 flex-1 flex-wrap items-center justify-between gap-x-2 gap-y-1 rounded-full border-b-[3px] border-[#971f10] bg-[#d42b15] px-4 py-3 text-xs font-extrabold text-[#fff6e3] hover:bg-[#b92312] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm ${focusClasses}`}
              >
                <span>Add to order</span>
                <span className="tabular-nums">
                  {money(totalPriceInPence)}
                </span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </dialog>
  );
}