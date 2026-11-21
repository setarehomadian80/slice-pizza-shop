"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/types/cart";
import type { CheckoutOrderType } from "@/types/checkout";
import { formatPrice } from "@/lib/checkout";
import { getItemImage } from "@/lib/cart-item-image";

type CheckoutOrderSummaryProps = {
  items: CartItem[];
  orderType: CheckoutOrderType;
  subtotalInPence: number;
  deliveryFeeInPence: number | null;
  totalInPence: number;
  canPlaceOrder: boolean;
  onEditOrder: () => void;
  onApplyPromo: (code: string) => void;
  onPlaceOrder: () => void;
};

function getItemDetails(item: CartItem): string {
  const selections = Object.entries(item.selections)
    .filter(([key, value]) => !key.endsWith("ID") && Boolean(value))
    .map(([, value]) => value);

  return [...selections, ...item.included].join(" · ");
}

export default function CheckoutOrderSummary({
  items,
  orderType,
  subtotalInPence,
  deliveryFeeInPence,
  totalInPence,
  canPlaceOrder,
  onEditOrder,
  onApplyPromo,
  onPlaceOrder,
}: CheckoutOrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const { data: products = [] } = useProducts();

  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  function handlePromoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const code = promoCode.trim().toUpperCase();
    if (code) onApplyPromo(code);
  }

  return (
    <aside
      aria-labelledby="checkout-summary-title"
      className="h-fit rounded-[28px] border border-[#e7ddcc] bg-[#fffaf3] p-5 text-[#301508] shadow-[0_10px_25px_rgba(48,21,8,0.08)] sm:p-6 lg:sticky lg:top-28"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="checkout-summary-title"
          className="font-[family-name:var(--font-shrikhand)] text-2xl"
        >
          Your order
        </h2>

        <button
          type="button"
          onClick={onEditOrder}
          className="shrink-0 text-sm font-bold underline underline-offset-4 hover:text-[#c52c18]"
        >
          Edit order
        </button>
      </div>

      <ul className="mt-4 max-h-[45dvh] overflow-y-auto overscroll-contain pr-2 divide-y divide-dashed divide-[#e7ddcc]">
        {items.map((item) => {
          const image = getItemImage(item, products);
          const details = getItemDetails(item);

          return (
            <li key={item.id} className="flex gap-3 py-3 first:pt-0">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[#fae8ca]">
                {image && (
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-extrabold leading-5">
                    {item.quantity} × {item.title}
                  </p>

                  <p className="shrink-0 text-sm font-extrabold tabular-nums">
                    {formatPrice(item.unitPriceInPence * item.quantity)}
                  </p>
                </div>

                {details && (
                  <p className="mt-1 text-xs leading-5 text-[#715c4d]">
                    {details}
                  </p>
                )}

                <div className="mt-2 flex items-center gap-2">
                  <div
                    role="group"
                    aria-label={`Quantity of ${item.title}`}
                    className="flex items-center rounded-full bg-[#fae8ca]"
                  >
                    <button
                      type="button"
                      aria-label={`Decrease ${item.title} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="grid h-8 w-8 place-items-center rounded-full hover:bg-[#f3dcb7]"
                    >
                      <Minus size={15} aria-hidden="true" />
                    </button>

                    <span
                      aria-live="polite"
                      className="min-w-6 text-center text-sm font-extrabold tabular-nums"
                    >
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.title} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="grid h-8 w-8 place-items-center rounded-full hover:bg-[#f3dcb7]"
                    >
                      <Plus size={15} aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex min-h-8 items-center gap-1 rounded-full px-2 text-xs font-bold text-[#715c4d] underline underline-offset-2 hover:text-[#b92312]"
                  >
                    <Trash2 size={13} aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <form onSubmit={handlePromoSubmit} className="mt-5">
        <label htmlFor="checkout-promo" className="sr-only">
          Promo code
        </label>

        <div className="flex gap-2">
          <input
            id="checkout-promo"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
            placeholder="Promo code"
            autoComplete="off"
            className="min-h-11 min-w-0 flex-1 rounded-2xl border border-[#ded5c8] bg-[#fffaf3] px-3 text-sm outline-none placeholder:text-[#9b8d81] focus:border-[#301508]"
          />

          <button
            type="submit"
            className="min-h-11 shrink-0 rounded-full border border-[#715c4d] px-4 text-sm font-bold hover:bg-[#fae8ca]"
          >
            Apply
          </button>
        </div>

        <p className="mt-2 text-[10px] leading-4 text-[#715c4d]">
          Codes running now: SLICE10, FREEDELIVERY, FIRSTSLICE
        </p>
      </form>

      <p className="mt-4 rounded-2xl bg-[#ffe4a3] px-3 py-2.5 text-xs font-bold leading-5">
        Check your ZIP code to see delivery fees, or switch to pickup.
      </p>

      <dl className="mt-4 space-y-2 border-b border-dashed border-[#e7ddcc] pb-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotalInPence)}</dd>
        </div>

        <div className="flex justify-between gap-4">
          <dt>{orderType === "pickup" ? "Pickup" : "Delivery"}</dt>
          <dd className="text-right tabular-nums">
            {orderType === "pickup"
              ? "Free"
              : deliveryFeeInPence === null
                ? "Add ZIP code"
                : deliveryFeeInPence === 0
                  ? "Free"
                  : formatPrice(deliveryFeeInPence)}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex items-center justify-between gap-4 text-lg font-black">
        <span>Total</span>
        <span className="tabular-nums">{formatPrice(totalInPence)}</span>
      </div>

      <button
        type="button"
        disabled={!canPlaceOrder}
        onClick={onPlaceOrder}
        className="mt-4 flex min-h-12 w-full items-center justify-center rounded-full border-b-4 border-[#94190b] bg-[#cc2a16] px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#b52212] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Place order · {formatPrice(totalInPence)}
      </button>

      <p className="mt-3 text-center text-[10px] leading-4 text-[#715c4d]">
        Allergy? Add it to your kitchen notes or call the shop before you
        order. Prices and totals don’t include Connecticut sales tax.
      </p>
    </aside>
  );
}