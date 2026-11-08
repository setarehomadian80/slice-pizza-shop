"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import PizzaModal from "@/components/pizzas/PizzaModal";
import { pizzas } from "@/constants/pizzas";
import type { Pizza } from "@/types/product";

type PizzaCardProps = {
  pizza: Pizza;
  onPick: (pizza: Pizza) => void;
};

function LeafIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 4c-8-2-15 2-15 8a6 6 0 0 0 6 6c6 0 10-7 9-14Z" />
      <path d="m4 21 11-11" />
    </svg>
  );
}

function PizzaCard({ pizza, onPick }: PizzaCardProps) {
  return (
    <article className="group flex overflow-hidden rounded-[24px] border border-[#e6d9c7] bg-[#fffcf5] shadow-[0_4px_0_#e9ddcc] transition-shadow hover:shadow-[0_8px_20px_rgba(48,21,8,0.1)] sm:flex-col">
      {/* Pizza image */}
      <div className="flex w-28 shrink-0 items-center justify-center bg-[#ffedbd] p-3 sm:w-full sm:p-6">
        <Image
          src={pizza.image}
          alt={`${pizza.name} pizza`}
          width={240}
          height={240}
          sizes="(max-width: 639px) 88px, 240px"
          className="aspect-square w-full max-w-[240px] object-contain drop-shadow-[0_8px_8px_rgba(90,45,10,0.12)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-105"
        />
      </div>

      {/* Card content */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <h3 className="text-lg font-extrabold tracking-tight text-[#301508]">
            {pizza.name}
          </h3>

          <p className="whitespace-nowrap text-sm font-bold text-[#a52817]">
            From £{pizza.price}
          </p>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#735b4b]">
          {pizza.description}
        </p>

        {/* Dietary labels */}
        <div className="mb-5 mt-4 flex flex-wrap items-center gap-2">
          {pizza.diet && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e7efdb] px-2 py-1 text-[11px] font-bold text-[#28613a]">
              <LeafIcon />
              {pizza.diet}
            </span>
          )}

          <span className="rounded-full bg-[#f1eadf] px-2 py-1 text-[11px] font-semibold text-[#705b49]">
            GF base
            <span className="sr-only"> available</span>
          </span>

          {pizza.spicy && (
            <span className="rounded-full bg-[#ffe4d8] px-2 py-1 text-[11px] font-bold text-[#a52b18]">
              Spicy
            </span>
          )}
        </div>

        {/* Open pizza modal */}
        <button
          type="button"
          onClick={() => onPick(pizza)}
          aria-haspopup="dialog"
          aria-label={`Choose size and add ${pizza.name}`}
          className="mt-auto flex min-h-[44px] items-center justify-center rounded-full border-b-[3px] border-[#971f10] bg-[#d42b15] px-3 py-2.5 text-center text-sm font-bold text-[#fff6e3] transition-colors hover:bg-[#b92312] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d42b15]"
        >
          Choose size &amp; add
        </button>
      </div>
    </article>
  );
}

export default function BestsellersSection() {
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(
    null
  );

  function handlePick(pizza: Pizza) {
    setSelectedPizza(pizza);
  }

  function handleClose() {
    setSelectedPizza(null);
  }

  return (
    <section
      dir="ltr"
      aria-labelledby="bestsellers-title"
      className="bg-[#fff6e3] py-16 text-[#301508] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#a52817]">
              Bestsellers
            </p>

            <h2
              id="bestsellers-title"
              className="mt-2 max-w-3xl font-serif text-4xl font-black italic leading-tight tracking-tight sm:text-5xl"
            >
              The ones everyone orders
            </h2>
          </div>

          <Link
            href="/menu"
            className="shrink-0 font-bold text-[#922513] underline decoration-2 underline-offset-4 transition-colors hover:text-[#d42b15] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            See the full menu <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Products */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              onPick={handlePick}
            />
          ))}
        </div>
      </div>

      {/* Selected pizza */}
      {selectedPizza && (
        <PizzaModal
          key={selectedPizza.id}
          pizza={selectedPizza}
          onClose={handleClose}
        />
      )}
    </section>
  );
}