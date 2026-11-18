
"use client";

import { useMemo, useState } from "react";

type HungerLevel = "snacking" | "lunch" | "starving";

const hungerOptions: { id: HungerLevel; label: string }[] = [
  { id: "snacking", label: "Snacking" },
  { id: "lunch", label: "Lunch" },
  { id: "starving", label: "Starving" },
];

const pizzaRate: Record<HungerLevel, number> = {
  snacking: 0.25,
  lunch: 0.4,
  starving: 0.5,
};

const costPerGuest: Record<HungerLevel, number> = {
  snacking: 6.83,
  lunch: 10.33,
  starving: 13.18,
};

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function formatEstimatedTotal(value: number) {
  return `$${Math.round(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function CateringCalculator() {
  const [guests, setGuests] = useState(30);
  const [hunger, setHunger] = useState<HungerLevel>("lunch");

  const estimate = useMemo(() => {
    const pizzas = Math.ceil(guests * pizzaRate[hunger]);
    const sides = Math.ceil(guests / 8);

    const veggie = Math.round(pizzas * 0.35);
    const vegan = Math.round(pizzas * 0.15);
    const meaty = pizzas - veggie - vegan;

    const discount =
      pizzas >= 20 ? 0.15 : pizzas >= 10 ? 0.1 : 0;

    const originalTotal = guests * costPerGuest[hunger];
    const total = originalTotal * (1 - discount);

    return {
      pizzas,
      sides,
      veggie,
      vegan,
      meaty,
      discount,
      total,
      perHead: total / guests,
    };
  }, [guests, hunger]);

  const orderSummary =
    `Roughly ${estimate.pizzas} large pizzas ` +
    `(${estimate.veggie} veggie, ${estimate.vegan} vegan, ${estimate.meaty} meaty) ` +
    `and ${estimate.sides} sides.`;

  function useNumbersInInquiry() {
    window.dispatchEvent(
      new CustomEvent("catering:prefill", {
        detail: {
          guests,
          summary: orderSummary,
        },
      }),
    );

    document.querySelector("#enquiry")?.scrollIntoView({
      behavior: "smooth",
    });

    requestAnimationFrame(() => {
      document
        .querySelector<HTMLInputElement>("#c-name")
        ?.focus({ preventScroll: true });
    });
  }

  return (
    <section
      id="cater-calc"
      aria-labelledby="calc-title"
      className="bg-[#fff5e2] px-5 py-14 sm:px-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1
       gap-6 rounded-[30px] bg-[#301508] p-5
        text-[#fff6e3] sm:gap-8 sm:p-7
         lg:grid-cols-[1.05fr_1fr] lg:items-center
          lg:gap-8 lg:p-8">

        {/* LEFT SIDE */}
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ffca38]">
            Pizza calculator
          </p>

          <h2
            id="calc-title"
            className="mt-2 font-[family-name:var(--font-shrikhand)]
             text-3xl italic leading-tight sm:text-4xl"
          >
            How many pizzas?
          </h2>

          {/* Guests slider */}
          <div className="mt-6 sm:mt-7">
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="cat-guests"
                className="text-sm font-extrabold sm:text-base"
              >
                Guests
              </label>

              <output
                htmlFor="cat-guests"
                className="font-[family-name:var(--font-shrikhand)] text-3xl italic text-[#ffca38] sm:text-4xl"
              >
                {guests}
              </output>
            </div>

            <input
              id="cat-guests"
              type="range"
              min={10}
              max={300}
              step={1}
              value={guests}
              onChange={(event) =>
                setGuests(Number(event.target.value))
              }
              className="h-2 w-full cursor-pointer accent-[#ffca38]"
            />
          </div>

          {/* Hunger selector */}
          <fieldset className="mt-7">
            <legend className="mb-3 text-sm font-extrabold sm:text-base">
              How hungry?
            </legend>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {hungerOptions.map((option) => {
                const selected = hunger === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setHunger(option.id)}
                    className={`min-h-10 rounded-full border-2 px-3 py-2 text-xs font-extrabold transition-colors sm:text-sm ${
                      selected
                        ? "border-[#ffca38] bg-[#ffca38] text-[#301508]"
                        : "border-[#715c4d] bg-transparent text-[#fff6e3] hover:border-[#ffca38]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* RIGHT SIDE */}
        <div className="min-w-0 rounded-[24px] bg-[#fff5e2] p-4 text-[#301508] sm:p-6">

          {/* Pizza and sides */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[18px] bg-[#ffca38] p-4">
              <p className="text-xs font-extrabold sm:text-sm">
                Large 16″ pizzas
              </p>

              <p className="mt-1 font-[family-name:var(--font-shrikhand)] text-4xl leading-none sm:text-5xl">
                {estimate.pizzas}
              </p>
            </div>

            <div className="rounded-[18px] bg-[#f7e6c9] p-4">
              <p className="text-xs font-extrabold sm:text-sm">
                Sides to share
              </p>

              <p className="mt-1 font-[family-name:var(--font-shrikhand)] text-4xl leading-none sm:text-5xl">
                {estimate.sides}
              </p>
            </div>
          </div>

          {/* Suggested mix */}
          <div className="mt-3 rounded-[18px] bg-[#f7e6c9] p-4">
            <p className="text-xs font-extrabold sm:text-sm">
              Suggested mix
            </p>

            <p className="mt-2 text-sm font-black sm:text-base">
              {estimate.veggie} veggie, {estimate.vegan} vegan,{" "}
              {estimate.meaty} meaty
            </p>
          </div>

          {/* Estimated cost */}
          <div className="mt-3 flex min-h-[78px] items-end justify-between gap-3 rounded-[18px] bg-[#dcedd4] p-4">
            <p className="text-xs font-extrabold sm:text-sm">
              Estimated cost
            </p>

            <div className="text-right">
              <p className="text-2xl font-black sm:text-3xl">
                {formatEstimatedTotal(estimate.total)}
              </p>

              <p className="mt-1 text-xs text-[#715c4d] sm:text-sm">
                {formatPrice(estimate.perHead)} a head
                {estimate.discount > 0 &&
                  `, with ${estimate.discount * 100}% off`}
              </p>
            </div>
          </div>

          {/* Inquiry button */}
          <button
            type="button"
            onClick={useNumbersInInquiry}
            className="mt-4 min-h-12 w-full rounded-full border-b-4 border-[#a51f12] bg-[#d42b15] px-4 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-[#b92312] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d42b15]"
          >
            Use these numbers in my inquiry
          </button>

          <p className="mt-3 text-center text-[11px] leading-5 text-[#715c4d] sm:text-xs">
            10% off 10+ pizzas, 15% off 20+. Delivery included within our zones.
          </p>
        </div>
      </div>
    </section>
  );
}
