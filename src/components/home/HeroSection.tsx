"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import type { DeliveryType, ShopId } from "@/types/shop";
import { deliveryTypes, shops } from "@/constants/shop";

type PostcodeResult = {
  message: string;
};

type HeroSectionProps = {
  onCheckPostcode?: (
    postcode: string
  ) => PostcodeResult | Promise<PostcodeResult>;
};

type OrderIconProps = {
  pickup: boolean;
};

function OrderIcon({ pickup }: OrderIconProps) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {pickup ? (
        <>
          <path d="M5 7h14l-1 14H6L5 7Z" />
          <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        </>
      ) : (
        <>
          <path d="M3 7h11v10H8M14 10h4l3 4v3h-3M3 11h5M2 14h4" />
          <circle cx={6} cy={18} r={2} />
          <circle cx={16} cy={18} r={2} />
        </>
      )}
    </svg>
  );
}

export default function HeroSection({
  onCheckPostcode,
}: HeroSectionProps) {
  const [deliveryType, setDeliveryType] =
    useState<DeliveryType>("delivery");

  const [selectedShop, setSelectedShop] =
    useState<ShopId>("ancoats");

  const [postcode, setPostcode] = useState("");
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);

  async function handleCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (checking) return;

    const value = postcode.trim();

    if (!value) {
      setMessage("Please enter your postcode.");
      return;
    }

    if (!onCheckPostcode) {
      setMessage("Delivery availability checking is not connected yet.");
      return;
    }

    setChecking(true);
    setMessage("");

    try {
      const result = await onCheckPostcode(value);
      setMessage(result.message);
    } catch {
      setMessage("Unable to check your postcode. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  const orderUrl =
    deliveryType === "pickup"
      ? `/menu?type=pickup&location=${selectedShop}`
      : `/menu?type=delivery&postcode=${encodeURIComponent(postcode.trim())}`;

  return (
    <section
      dir="ltr"
      className="relative isolate overflow-hidden bg-[#d42b15] text-[#fff6e3]"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffc668 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-24 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pb-28 lg:pt-16">
        <div>
          <div className="mb-7 inline-flex -rotate-2 items-center gap-2 rounded-full bg-[#ffca38] px-4 py-2 text-xs font-black text-[#301508] sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#d42b15]" />
            Hot from the oven in Ancoats &amp; Chorlton
          </div>

          <h1 className="font-serif text-[clamp(3.3rem,10vw,6rem)] font-black italic leading-[0.98] tracking-[-0.045em]">
            Blistered,
            <br />
            bubbly &amp; at
            <br />
            your door in
            <br />
            30.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed sm:text-lg lg:text-xl">
            Proper sourdough pizza, made with dough we leave alone for 48
            hours and bake for 90 seconds. Order for delivery, or grab it
            on your way home.
          </p>

          {/* Order panel */}
          <div className="mt-8 max-w-lg rounded-[30px] bg-[#fff6e3] p-5 text-[#301508] shadow-[0_16px_30px_rgba(74,17,4,0.2)] sm:p-6">
            <fieldset disabled={checking}>
              <legend className="sr-only">Delivery or pickup</legend>

              <div className="grid grid-cols-2 rounded-full bg-[#ede2d1] p-1">
                {deliveryTypes.map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input
                      type="radio"
                      name="delivery-type"
                      value={type}
                      checked={deliveryType === type}
                      onChange={() => {
                        setDeliveryType(type);
                        setMessage("");
                      }}
                      className="peer sr-only"
                    />

                    <span className="flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-bold transition-colors peer-checked:bg-[#301508] peer-checked:text-[#fff6e3] peer-checked:shadow-md peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#301508] peer-disabled:cursor-wait">
                      <OrderIcon pickup={type === "pickup"} />
                      {type === "delivery" ? "Delivery" : "Pickup"}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {deliveryType === "delivery" ? (
              <form
                onSubmit={handleCheck}
                aria-busy={checking}
                className="mt-5"
              >
                <label
                  htmlFor="hero-postcode"
                  className="mb-2 block text-sm font-bold"
                >
                  Your postcode
                </label>

                <div className="flex items-stretch gap-2">
                  <input
                    id="hero-postcode"
                    name="postcode"
                    type="text"
                    value={postcode}
                    onChange={(event) => {
                      setPostcode(event.target.value);
                      setMessage("");
                    }}
                    autoComplete="postal-code"
                    placeholder="Postcode, e.g. M4 6AJ"
                    required
                    disabled={checking}
                    aria-describedby={
                      message ? "postcode-message" : undefined
                    }
                    className="min-w-0 flex-1 rounded-2xl border-2 border-[#e1d7ca] bg-[#fffaf2] px-3 py-3 text-sm outline-none transition focus:border-[#301508] disabled:opacity-70 sm:px-4 sm:text-base"
                  />

                  <button
                    type="submit"
                    disabled={checking}
                    className="shrink-0 rounded-full border-b-4 border-black bg-[#301508] px-5 py-3 text-sm font-bold text-[#fff6e3] transition hover:bg-[#482313] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#301508] disabled:cursor-wait disabled:opacity-70 sm:px-6"
                  >
                    {checking ? "Checking…" : "Check"}
                  </button>
                </div>

                <p
                  id="postcode-message"
                  role="status"
                  className={
                    message ? "mt-3 text-sm leading-relaxed" : "sr-only"
                  }
                >
                  {message}
                </p>
              </form>
            ) : (
              <div className="mt-5">
                <fieldset>
                  <legend className="mb-2 text-sm font-bold">
                    Collect from
                  </legend>

                  <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
                    {shops.map((shop) => (
                      <label key={shop.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="pickup-shop"
                          value={shop.id}
                          checked={selectedShop === shop.id}
                          onChange={() => setSelectedShop(shop.id)}
                          className="peer sr-only"
                        />

                        <span className="block h-full rounded-[18px] border-2 border-[#e5dcd1] bg-[#fffaf2] p-3.5 transition-colors peer-checked:border-[#301508] peer-checked:bg-[#ffe9a5] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#301508]">
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-base font-extrabold">
                              {shop.name}
                            </span>

                            <span
                              aria-hidden="true"
                              className={`flex h-4 w-4 items-center justify-center rounded-full bg-[#301508] text-[10px] text-white ${
                                selectedShop === shop.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            >
                              ✓
                            </span>
                          </span>

                          <span className="mt-1 block text-sm text-[#705a4b]">
                            {shop.address}
                          </span>

                          <span className="mt-2 flex items-center gap-2 text-[11px] font-bold">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-[#29a35a]" />
                            {shop.hours}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <p className="mt-3 text-sm leading-relaxed text-[#705a4b]">
                  Collection orders are usually ready in about 20 minutes.
                </p>
              </div>
            )}

            <Link
              href={orderUrl}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-full border-b-4 border-[#991b0c] bg-[#d42b15] px-5 py-3.5 font-bold text-[#fff6e3] transition hover:bg-[#bb2512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d42b15] active:translate-y-0.5"
            >
              Start your order
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Pizza image */}
        <div className="mx-auto w-full max-w-[600px]">
          <Image
            src="/image/hero-pizza.svg"
            alt="Pizza with pepperoni, mushrooms and basil"
            width={600}
            height={600}
            loading="eager"
            unoptimized
            className="h-auto w-full object-contain drop-shadow-[0_28px_25px_rgba(83,20,2,0.25)]"
          />
        </div>
      </div>

      {/* Bottom edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-6"
        style={{
          backgroundImage:
            "radial-gradient(circle at 24px 24px, #fff6e3 24px, transparent 25px)",
          backgroundSize: "48px 48px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </section>
  );
}