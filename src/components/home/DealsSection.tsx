"use client";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import Link from "next/link";

import DealCard from "@/components/deals/DealCard";
import DealModal from "@/components/deals/DealModal";

import { deals } from "@/constants/deals";
import type { Deal, DealCartItem } from "@/types/deal";

export default function DealsSection() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [message, setMessage] = useState("");
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  function handlePick(deal: Deal) {
    setMessage("");
    setSelectedDeal(deal);
  }

  function handleClose() {
    setSelectedDeal(null);
  }

  function handleAdd(item: DealCartItem) {
  addItem(item);

  setMessage(
    `${item.quantity} × ${item.title} added to your cart.`
  );
}

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <section
      id="deals"
      dir="ltr"
      aria-labelledby="deals-title"
      className="bg-[#ffca38] py-16 text-[#301508] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em]">
              Deals
            </p>

            <h2
              id="deals-title"
              className="mt-2 font-serif text-4xl font-black italic leading-tight tracking-tight sm:text-5xl"
            >
              More pizza, less money
            </h2>
          </div>

          <Link
            href="/deals"
            className="shrink-0 font-bold underline decoration-2 underline-offset-4 transition-colors hover:text-[#922513] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#301508]"
          >
            Build your own bundle <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Single column until lg */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} onPick={handlePick} />
          ))}
        </div>

        {/* Selection feedback */}
        <p
          role="status"
          className={
            message
              ? "mt-5 rounded-2xl bg-[#fff6e3] px-4 py-3 text-sm font-semibold"
              : "sr-only"
          }
        >
          {message}
          {message && ` Total bundles: ${totalQuantity}.`}
        </p>
      </div>

      {/* Deal popup */}
      {selectedDeal && (
        <DealModal
          key={selectedDeal.id}
          deal={selectedDeal}
          onClose={handleClose}
          onAdd={handleAdd}
        />
      )}
    </section>
  );
}
