"use client";

import { useState } from "react";

import DealCard from "./DealCard";
import DealModal from "./DealModal";
import type { Deal, DealCartItem } from "@/types/deal";

const deals: Deal[] = [
  {
    id: "solo-lunch",
    title: "Solo Lunch",
    description: "Any small pizza and a cold drink",
    availability: "Every day until 4 PM, pickup or delivery",
    originalPriceInPence: 1500,
    priceInPence: 1200,
    theme: "yellow",
    images: [
      {
        src: "/image/pepperoni.png",
        alt: "Solo Lunch pizza",
      },
    ],
  },
  {
    id: "date-night-duo",
    title: "Date Night Duo",
    description: "Two regular pizzas, garlic knots and two dips",
    availability: "Any day, all day",
    originalPriceInPence: 3750,
    priceInPence: 3400,
    theme: "red",
    badge: "MOST ORDERED",
    images: [
      {
        src: "/image/marinara.png",
        alt: "First Date Night pizza",
      },
      {
        src: "/image/vegan-diavola.png",
        alt: "Second Date Night pizza",
      },
    ],
  },
  {
    id: "family-feast",
    title: "Family Feast",
    description: "Two large pizzas, two sides, four dips and a dessert",
    availability: "Any day, all day",
    originalPriceInPence: 7800,
    priceInPence: 5600,
    theme: "green",
    images: [
      {
        src: "/image/pepperoni.png",
        alt: "First Family Feast pizza",
      },
      {
        src: "/image/vegan-diavola.png",
        alt: "Second Family Feast pizza",
      },
    ],
  },
];

type SetDealsProps = {
  onAdd?: (item: DealCartItem) => void | Promise<void>;
};

export default function SetDeals({ onAdd }: SetDealsProps) {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  return (
    <section
      aria-labelledby="set-deals-title"
      className="w-full bg-[#fff6e3] px-5 pb-14 pt-8 text-[#301508] sm:px-8 sm:pb-16"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="set-deals-title" className="sr-only">
          Set deals
        </h2>

        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className={`h-full rounded-[32px] ${
                deal.theme === "yellow" ? "bg-[#ffca38]" : ""
              }`}
            >
              <DealCard deal={deal} onPick={setSelectedDeal} />
            </div>
          ))}
        </div>
      </div>

      {selectedDeal && (
        <DealModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
          onAdd={onAdd ?? (() => {})}
        />
      )}
    </section>
  );
}