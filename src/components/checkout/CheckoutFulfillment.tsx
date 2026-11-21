"use client";

import { useId, type FormEvent } from "react";
import { Check, ShoppingBag, Truck } from "lucide-react";

import { checkoutShops } from "@/constants/checkout";
import type {
  CheckoutOrderType,
  CheckoutShop,
} from "@/types/checkout";

type CheckoutFulfillmentProps = {
  orderType: CheckoutOrderType;
  onOrderTypeChange: (type: CheckoutOrderType) => void;
  postcode: string;
  onPostcodeChange: (postcode: string) => void;
  postcodeVerified: boolean;
  postcodeMessage: string;
  selectedShopId: string;
  onShopChange: (shopId: string) => void;
  onCheckPostcode: (postcode: string) => void;
};

function ShopCard({
  shop,
  selected,
  onSelect,
}: {
  shop: CheckoutShop;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`relative min-h-[94px] rounded-2xl border-2 p-3 text-left transition-colors sm:p-4 ${
        selected
          ? "border-[#301508] bg-[#ffe4a3]"
          : "border-[#e5dacf] bg-[#fffaf3] hover:border-[#c9b8a4]"
      }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-[#301508] text-white">
          <Check size={13} aria-hidden="true" />
        </span>
      )}

      <span className="block pr-7 text-sm font-black sm:text-base">
        {shop.name}
      </span>

      <span className="mt-1 block text-xs leading-5 text-[#715c4d]">
        {shop.address}
      </span>

      <span className="mt-2 block text-xs font-bold text-[#715c4d]">
        {shop.openingMessage}
      </span>
    </button>
  );
}

export default function CheckoutFulfillment({
  orderType,
  onOrderTypeChange,
  postcode,
  onPostcodeChange,
  postcodeVerified,
  postcodeMessage,
  selectedShopId,
  onShopChange,
  onCheckPostcode,
}: CheckoutFulfillmentProps) {
  const postcodeId = useId();

  function handlePostcodeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCheckPostcode(postcode);
  }

  return (
    <section
      aria-labelledby="checkout-fulfillment-title"
      className="rounded-[24px] border border-[#e7ddcc] bg-[#fffaf3] p-4 text-[#301508] shadow-[0_8px_20px_rgba(48,21,8,0.06)] sm:p-5"
    >
      <h2
        id="checkout-fulfillment-title"
        className="flex items-center gap-2 text-lg font-black"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d42b15] text-sm text-white">
          1
        </span>
        Delivery or pickup
      </h2>

      <div
        role="group"
        aria-label="Delivery or pickup"
        className="mt-4 flex rounded-full bg-[#f1e7d8] p-1"
      >
        <button
          type="button"
          aria-pressed={orderType === "delivery"}
          onClick={() => onOrderTypeChange("delivery")}
          className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-extrabold transition-colors ${
            orderType === "delivery"
              ? "bg-[#301508] text-[#fff6e3] shadow-sm"
              : "text-[#715c4d]"
          }`}
        >
          <Truck size={17} aria-hidden="true" />
          Delivery
        </button>

        <button
          type="button"
          aria-pressed={orderType === "pickup"}
          onClick={() => onOrderTypeChange("pickup")}
          className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-extrabold transition-colors ${
            orderType === "pickup"
              ? "bg-[#301508] text-[#fff6e3] shadow-sm"
              : "text-[#715c4d]"
          }`}
        >
          <ShoppingBag size={17} aria-hidden="true" />
          Pickup
        </button>
      </div>

      {orderType === "delivery" ? (
        <form onSubmit={handlePostcodeSubmit} className="mt-4">
          <label
            htmlFor={postcodeId}
            className="mb-2 block text-sm font-bold"
          >
            Delivery ZIP code
          </label>

          <div className="flex gap-2">
            <input
              id={postcodeId}
              name="postcode"
              value={postcode}
              onChange={(event) => onPostcodeChange(event.target.value)}
              placeholder="ZIP code, e.g. 06511"
              autoComplete="postal-code"
              inputMode="numeric"
              aria-invalid={Boolean(postcodeMessage && !postcodeVerified)}
              aria-describedby={
                postcodeMessage ? "checkout-postcode-message" : undefined
              }
              className={`min-h-11 min-w-0 flex-1 rounded-2xl border bg-[#fffaf3] px-3 text-sm outline-none placeholder:text-[#9b8d81] focus:border-[#301508] ${
                postcodeMessage && !postcodeVerified
                  ? "border-[#d42b15]"
                  : "border-[#ded5c8]"
              }`}
            />

            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-full bg-[#301508] px-5 text-sm font-extrabold text-[#fff6e3] transition-colors hover:bg-[#482313]"
            >
              Check
            </button>
          </div>

          {postcodeMessage && (
            <p
              id="checkout-postcode-message"
              role={postcodeVerified ? "status" : "alert"}
              className={`mt-2 text-xs font-semibold ${
                postcodeVerified ? "text-[#1d6b3c]" : "text-[#b92312]"
              }`}
            >
              {postcodeMessage}
            </p>
          )}
        </form>
      ) : (
        <div className="mt-4">
          <p className="mb-2 text-sm font-bold">Choose a shop</p>

          <div className="grid gap-2 sm:grid-cols-2">
            {checkoutShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                selected={selectedShopId === shop.id}
                onSelect={() => onShopChange(shop.id)}
              />
            ))}
          </div>

          <p className="mt-3 text-xs leading-5 text-[#715c4d]">
            Pickup orders are usually ready in about 20 minutes.
          </p>
        </div>
      )}
    </section>
  );
}