"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cart-store";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type OrderType = "delivery" | "pickup";

const shops = [
  {
    name: "Wooster Square",
    address: "42 Franklin Street",
    status: "Open until 10:00 PM",
    open: true,
  },
  {
    name: "Westville",
    address: "317 Fountain Street",
    status: "Opens today 4:00 PM",
    open: false,
  },
];

function formatPrice(priceInPence: number): string {
  return `£${(priceInPence / 100).toFixed(2)}`;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { data: products = [] } = useProducts();

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [selectedShop, setSelectedShop] = useState("Wooster Square");
  const [postcode, setPostcode] = useState("");
  const [postcodeMessage, setPostcodeMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const [postcodeVerified, setPostcodeVerified] = useState(false);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotalInPence = items.reduce(
    (total, item) => total + item.unitPriceInPence * item.quantity,
    0,
  );
  function checkPostcode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{5}$/.test(postcode.trim())) {
      setPostcodeVerified(false);
      setPostcodeMessage("Please enter a valid 5-digit ZIP code.");
      return;
    }

    setPostcodeVerified(true);
    setPostcodeMessage(
      "ZIP code added. Delivery availability will be confirmed.",
    );
  }

  function applyPromoCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!promoCode.trim()) {
      setPromoMessage("Enter a promo code first.");
      return;
    }

    setPromoMessage("Promo code will be checked at checkout.");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-[#1b0d08]/55" />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="relative z-10 flex h-full w-full max-w-[560px] flex-col bg-[#fff4e2] text-[#301508] shadow-2xl"
      >
        {/* Drawer header */}
        <div className="flex shrink-0 items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex min-w-0 items-baseline gap-3">
            <h2
              id="cart-title"
              className="truncate font-[family-name:var(--font-shrikhand)] text-3xl leading-none sm:text-4xl"
            >
              Your order
            </h2>

            <span className="shrink-0 text-sm font-bold text-[#715c4d]">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order"
            className="ml-3 grid size-11 shrink-0 place-items-center rounded-full bg-[#fae7c8] transition-colors hover:bg-[#f2d9ae]"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable drawer content */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-8">
          {/* Delivery / pickup */}
          <section
            aria-label="Choose delivery or pickup"
            className="rounded-[28px] bg-[#f7e4c5] p-3"
          >
            <div className="flex rounded-full bg-[#ead9bd] p-1">
              <button
                type="button"
                aria-pressed={orderType === "delivery"}
                onClick={() => setOrderType("delivery")}
                className={`min-h-12 flex-1 rounded-full px-3 text-sm font-extrabold transition-colors ${
                  orderType === "delivery"
                    ? "bg-[#301508] text-[#fff6e3] shadow-[0_3px_0_rgba(48,21,8,0.25)]"
                    : "text-[#715c4d]"
                }`}
              >
                Delivery
              </button>

              <button
                type="button"
                aria-pressed={orderType === "pickup"}
                onClick={() => setOrderType("pickup")}
                className={`min-h-12 flex-1 rounded-full px-3 text-sm font-extrabold transition-colors ${
                  orderType === "pickup"
                    ? "bg-[#301508] text-[#fff6e3] shadow-[0_3px_0_rgba(48,21,8,0.25)]"
                    : "text-[#715c4d]"
                }`}
              >
                Pickup
              </button>
            </div>

            {orderType === "delivery" ? (
              <form onSubmit={checkPostcode} className="mt-3">
                <div className="flex gap-2">
                  <label htmlFor="cart-postcode" className="sr-only">
                    ZIP code
                  </label>

                  <input
                    id="cart-postcode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="ZIP code, e.g. 06511"
                    value={postcode}
                    onChange={(event) => {
                      setPostcode(event.target.value);
                      setPostcodeMessage("");
                    }}
                    className="min-h-12 min-w-0 flex-1 rounded-[18px] border-2 border-[#e5dacf] bg-[#fffaf3] px-4 text-sm outline-none placeholder:text-[#9b8d81] focus:border-[#301508]"
                  />

                  <button
                    type="submit"
                    className="min-h-12 shrink-0 rounded-full border-b-4 border-[#140a04] bg-[#301508] px-5 text-sm font-extrabold text-[#fff6e3] transition-colors hover:bg-[#482313]"
                  >
                    Check
                  </button>
                </div>

                {postcodeMessage && (
                  <p role="status" className="px-1 pt-2 text-xs font-semibold">
                    {postcodeMessage}
                  </p>
                )}
              </form>
            ) : (
              <div className="mt-3">
                <p className="mb-2 text-sm font-bold">Pick up from</p>

                <div className="grid grid-cols-2 gap-2">
                  {shops.map((shop) => {
                    const isSelected = selectedShop === shop.name;

                    return (
                      <button
                        key={shop.name}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedShop(shop.name)}
                        className={`relative min-h-[105px] rounded-[20px] border-2 p-3 text-left transition-colors ${
                          isSelected
                            ? "border-[#301508] bg-[#ffe4a3]"
                            : "border-[#e5dacf] bg-[#fffaf3]"
                        }`}
                      >
                        {isSelected && (
                          <span
                            aria-hidden="true"
                            className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-[#301508] text-xs font-black text-[#fff6e3]"
                          >
                            ✓
                          </span>
                        )}

                        <span className="block pr-6 text-sm font-black leading-5">
                          {shop.name}
                        </span>
                        <span className="mt-1 block text-xs text-[#715c4d]">
                          {shop.address}
                        </span>
                        <span className="mt-2 flex items-center gap-1.5 text-[11px] font-bold">
                          <span
                            aria-hidden="true"
                            className={`size-2.5 shrink-0 rounded-full ${
                              shop.open ? "bg-[#2ca65a]" : "bg-[#d42b15]"
                            }`}
                          />
                          {shop.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* Cart items */}
          <div className="mt-2">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-[family-name:var(--font-shrikhand)] text-2xl">
                  Your basket is empty
                </p>

                <p className="mt-2 text-sm text-[#715c4d]">
                  Add something delicious from the menu.
                </p>

                <Link
                  href="/menu"
                  onClick={onClose}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#cc2a16] px-6 text-sm font-extrabold text-white hover:bg-[#a52011]"
                >
                  Browse menu
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const pizza =
                  "pizzaId" in item
                    ? products.find((product) => product.id === item.pizzaId)
                    : undefined;

                const imageSrc = pizza?.image ?? "/image/hero-pizza.svg";

                const details = [
                  ...Object.values(item.selections),
                  ...item.included,
                ].filter(Boolean);

                return (
                  <article
                    key={item.id}
                    className="flex gap-4 border-b-2 border-dashed border-[#eadfce] py-5"
                  >
                    <div className="relative size-[88px] shrink-0 overflow-hidden rounded-[22px] bg-[#f7e4c5]">
                      <Image
                        src={imageSrc}
                        alt=""
                        fill
                        sizes="88px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-black leading-5">{item.title}</h3>

                        <p className="shrink-0 font-black">
                          {formatPrice(item.unitPriceInPence * item.quantity)}
                        </p>
                      </div>

                      {details.length > 0 && (
                        <p className="mt-1.5 text-sm leading-5 text-[#715c4d]">
                          {details.join(" · ")}
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex min-h-9 items-center gap-3 rounded-full bg-[#fae7c8] px-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label={`Decrease quantity of ${item.title}`}
                            className="grid size-7 place-items-center"
                          >
                            <Minus size={15} aria-hidden="true" />
                          </button>

                          <span className="min-w-4 text-center text-sm font-black">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label={`Increase quantity of ${item.title}`}
                            className="grid size-7 place-items-center"
                          >
                            <Plus size={15} aria-hidden="true" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-bold text-[#715c4d] underline decoration-2 underline-offset-4 hover:text-[#cc2a16]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {items.length > 0 && (
            <>
              {/* Kitchen notes */}
              <div className="border-b-2 border-dashed border-[#eadfce] py-5">
                <label
                  htmlFor="kitchen-notes"
                  className="mb-2 block text-sm font-extrabold"
                >
                  Notes for the kitchen
                </label>

                <textarea
                  id="kitchen-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Well done crusts, cut into squares, ring the top bell..."
                  rows={2}
                  className="w-full resize-y rounded-[18px] border-2 border-[#e5dacf] bg-[#fffaf3] px-4 py-3 text-sm outline-none placeholder:text-[#9b8d81] focus:border-[#301508]"
                />
              </div>

              {/* Promo code */}
              <form
                onSubmit={applyPromoCode}
                className="border-b-2 border-dashed border-[#eadfce] py-5"
              >
                <div className="flex gap-2">
                  <label htmlFor="promo-code" className="sr-only">
                    Promo code
                  </label>

                  <input
                    id="promo-code"
                    value={promoCode}
                    onChange={(event) => {
                      setPromoCode(event.target.value);
                      setPromoMessage("");
                    }}
                    placeholder="Promo code"
                    className="min-h-12 min-w-0 flex-1 rounded-full border-2 border-[#e5dacf] bg-[#fffaf3] px-4 text-sm outline-none placeholder:text-[#9b8d81] focus:border-[#301508]"
                  />

                  <button
                    type="submit"
                    className="min-h-12 rounded-full border-2 border-[#715c4d] px-5 text-sm font-extrabold hover:bg-[#fae7c8]"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage ? (
                  <p role="status" className="mt-2 text-xs text-[#715c4d]">
                    {promoMessage}
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-[#715c4d]">
                    Codes running now: SLICE10, FREEDELIVERY, FIRSTSLICE
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        {/* Fixed totals and checkout */}
        {items.length > 0 && (
          <div className="shrink-0 border-t-2 border-dashed border-[#eadfce] bg-[#fffaf3] px-5 pb-5 pt-4 sm:px-8">
            {orderType === "delivery" && !postcodeVerified && (
              <p className="mb-4 rounded-[20px] bg-[#ffe6a6] px-4 py-3 text-sm font-bold leading-5">
                Check your ZIP code to see delivery fees, or switch to pickup.
              </p>
            )}

            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(subtotalInPence)}</span>
            </div>

            <div className="mt-2 flex items-center justify-between border-b-2 border-dashed border-[#eadfce] pb-3 text-sm">
              <span>
                {orderType === "pickup"
                  ? `Pickup from ${selectedShop}`
                  : "Delivery"}
              </span>

              <span className="text-[#715c4d]">
                {orderType === "pickup"
                  ? "Free"
                  : postcodeVerified
                    ? "Calculated at checkout"
                    : "Add ZIP code"}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 text-lg font-black">
              <span>Total</span>
              <span>{formatPrice(subtotalInPence)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              aria-disabled={orderType === "delivery" && !postcodeVerified}
              className={`flex min-h-[58px] items-center justify-center rounded-full border-b-[5px] border-[#94190b] bg-[#cc2a16] px-5 text-center font-extrabold text-white transition-colors hover:bg-[#b52212] ${
                orderType === "delivery" && !postcodeVerified
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              Checkout · {formatPrice(subtotalInPence)}
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
