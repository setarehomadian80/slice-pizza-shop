"use client";

import { useState } from "react";
import { Rubik, Shrikhand } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const promoCodes = [
  {
    code: "SLICE10",
    description: "10% off menu items",
  },
  {
    code: "FREEDELIVERY",
    description: "Free delivery in any zone",
  },
  {
    code: "FIRSTSLICE",
    description: "$5 off orders over $30",
  },
];

export default function PromoCodes() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  async function handleCopy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      window.setTimeout(() => {
        setCopiedCode((current) => (current === code ? null : current));
      }, 1600);
    } catch {
      setCopiedCode(null);
    }
  }

  return (
    <section
      id="promo-codes"
      aria-labelledby="promo-codes-title"
      className={`${rubik.className} bg-[#fff6e3] px-5 py-12 text-[#301508] sm:px-8 sm:py-16`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[32px] bg-[#f7e5c8] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#922513]">
            Promo codes
          </p>

          <h2
            id="promo-codes-title"
            className={`${shrikhand.className} mt-2 text-4xl leading-tight sm:text-5xl`}
          >
            Got a code?
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-[#705a4b]">
            Enter it in your order before checkout. One code per order.
            Percentage codes apply to menu items, not deals or bundles. Codes
            running now:
          </p>
        </div>

        <ul className="space-y-3">
          {promoCodes.map(({ code, description }) => (
            <li
              key={code}
              className="flex items-center justify-between gap-4 rounded-[20px] bg-[#fff8eb] px-4 py-4 sm:px-5"
            >
              <div className="min-w-0">
                <p className="break-all text-sm font-black tracking-[0.12em]">
                  {code}
                </p>
                <p className="mt-1 text-sm text-[#705a4b]">{description}</p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(code)}
                aria-label={`Copy ${code}`}
                className="min-h-10 shrink-0 rounded-full border-2 border-[#301508] px-4 text-sm font-extrabold transition hover:bg-[#301508] hover:text-[#fff6e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#301508]"
              >
                {copiedCode === code ? "Copied" : "Copy"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}