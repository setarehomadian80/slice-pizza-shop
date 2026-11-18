"use client";

import type { BundleProduct } from "./BundleProductList";
import { getProductSection } from "./BundleProductList";

type BundleItem = {
  product: BundleProduct;
  quantity: number;
};

type BundleSummaryProps = {
  products: BundleProduct[];
  quantities: Record<string, number>;
  onReset: () => void;
  onAddBundle?: (bundle: {
    items: BundleItem[];
    totalPriceInPence: number;
  }) => void;
};

function getPriceInPence(price: string | number): number {
  const amount = Number(String(price).replace(/[^0-9.]/g, ""));

  return Number.isFinite(amount) ? Math.round(amount * 100) : 0;
}

function formatPrice(priceInPence: number): string {
  return `£${(priceInPence / 100).toFixed(2)}`;
}

export default function BundleSummary({
  products,
  quantities,
  onReset,
  onAddBundle,
}: BundleSummaryProps) {
  const items: BundleItem[] = products.flatMap((product) => {
    const quantity = quantities[String(product.id)] ?? 0;

    return quantity > 0 ? [{ product, quantity }] : [];
  });

  const counts = items.reduce(
    (total, item) => {
      const section = getProductSection(item.product.category);

      if (section === "pizza") total.pizzas += item.quantity;
      else if (section === "side") total.sides += item.quantity;
      else total.extras += item.quantity;

      return total;
    },
    { pizzas: 0, sides: 0, extras: 0 }
  );

  const usualPrice = items.reduce(
    (total, item) =>
      total +
      getPriceInPence(item.product.price) * item.quantity,
    0
  );

  const discountRate =
    counts.pizzas >= 3 && counts.sides >= 2
      ? 20
      : counts.pizzas >= 2 && counts.sides >= 1
        ? 15
        : 0;

  const saving = Math.round((usualPrice * discountRate) / 100);
  const bundlePrice = usualPrice - saving;
  const canAdd = discountRate > 0 && Boolean(onAddBundle);

  function handleAddBundle() {
    if (!canAdd || !onAddBundle) return;

    onAddBundle({
      items,
      totalPriceInPence: bundlePrice,
    });
  }

  const pizzasNeeded = Math.max(0, 2 - counts.pizzas);
  const sidesNeeded = Math.max(0, 1 - counts.sides);

  return (
    <aside className="rounded-[28px] border border-[#e9ddca] bg-[#fffcf5] p-5 text-[#301508] sm:p-7 lg:sticky lg:top-24">
      <h3 className="font-serif text-3xl font-black italic">
        Your bundle
      </h3>

      <dl className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-[#f8e8ca] px-2 py-3 text-center">
          <dt className="text-xs font-bold text-[#705a4b]">Pizzas</dt>
          <dd className="mt-1 text-2xl font-black">{counts.pizzas}</dd>
        </div>

        <div className="rounded-2xl bg-[#f8e8ca] px-2 py-3 text-center">
          <dt className="text-xs font-bold text-[#705a4b]">Sides</dt>
          <dd className="mt-1 text-2xl font-black">{counts.sides}</dd>
        </div>

        <div className="rounded-2xl bg-[#f8e8ca] px-2 py-3 text-center">
          <dt className="text-xs font-bold text-[#705a4b]">Extras</dt>
          <dd className="mt-1 text-2xl font-black">{counts.extras}</dd>
        </div>
      </dl>

      <div
        role="progressbar"
        aria-label="Bundle discount progress"
        aria-valuemin={0}
        aria-valuemax={20}
        aria-valuenow={discountRate}
        className="mt-5 h-3 overflow-hidden rounded-full bg-[#e9e1d6]"
      >
        <div
          className="h-full rounded-full bg-[#1d6b3c] transition-all duration-300"
          style={{
            width:
              discountRate === 20
                ? "100%"
                : discountRate === 15
                  ? "75%"
                  : `${Math.min(
                      60,
                      (counts.pizzas / 2) * 40 + counts.sides * 20
                    )}%`,
          }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div
          className={`rounded-2xl border p-3 ${
            discountRate >= 15
              ? "border-[#1d6b3c] bg-[#edf5e9]"
              : "border-[#e9ddca]"
          }`}
        >
          <p className="text-sm font-black">15% off</p>
          <p className="mt-1 text-xs text-[#705a4b]">2 pizzas + 1 side</p>
          <p className="mt-1 text-[11px] font-bold text-[#705a4b]">
            {discountRate >= 15 ? "Unlocked" : "Locked"}
          </p>
        </div>

        <div
          className={`rounded-2xl border p-3 ${
            discountRate >= 20
              ? "border-[#1d6b3c] bg-[#edf5e9]"
              : "border-[#e9ddca]"
          }`}
        >
          <p className="text-sm font-black">20% off</p>
          <p className="mt-1 text-xs text-[#705a4b]">3 pizzas + 2 sides</p>
          <p className="mt-1 text-[11px] font-bold text-[#705a4b]">
            {discountRate >= 20 ? "Unlocked" : "Locked"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm font-bold leading-6">
        {discountRate === 20
          ? "You unlocked 20% off your bundle."
          : discountRate === 15
            ? "You unlocked 15% off your bundle."
            : `Add ${pizzasNeeded} more ${
                pizzasNeeded === 1 ? "pizza" : "pizzas"
              } and ${sidesNeeded} more ${
                sidesNeeded === 1 ? "side" : "sides"
              } to unlock 15% off.`}
      </p>

      <dl className="mt-5 space-y-3 border-t border-dashed border-[#d9cdbb] pt-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-[#705a4b]">Usual price</dt>
          <dd className="font-bold">{formatPrice(usualPrice)}</dd>
        </div>

        <div className="flex justify-between gap-4">
          <dt className="text-[#1d6b3c]">Bundle saving</dt>
          <dd className="font-bold text-[#1d6b3c]">
            {formatPrice(saving)}
          </dd>
        </div>

        <div className="flex justify-between gap-4 text-base">
          <dt className="font-extrabold">Bundle price</dt>
          <dd className="font-black">{formatPrice(bundlePrice)}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={handleAddBundle}
        disabled={!canAdd}
        className="mt-5 min-h-12 w-full rounded-full border-b-4 border-[#991b0c] bg-[#d42b15] px-5 py-3 text-sm font-extrabold text-[#fff6e3] transition hover:bg-[#bb2512] disabled:cursor-not-allowed disabled:border-[#d8c9b7] disabled:bg-[#e5ded4] disabled:text-[#705a4b]"
      >
        {discountRate === 0
          ? "Unlock a discount to add"
          : "Add bundle"}
      </button>

      <button
        type="button"
        onClick={onReset}
        className="mt-3 min-h-10 w-full rounded-full text-sm font-bold text-[#705a4b] hover:bg-[#f8e8ca]"
      >
        Start again
      </button>
    </aside>
  );
}