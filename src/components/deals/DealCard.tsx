"use client";
import Image from "next/image";

import type { Deal, DealTheme } from "@/types/deal";

type DealCardProps = {
  deal: Deal;
  onPick: (deal: Deal) => void;
};

type DealStyles = {
  card: string;
  button: string;
  secondaryText: string;
};

const themeStyles: Record<DealTheme, DealStyles> = {
  yellow: {
    card: "bg-transparent text-[#301508]",
    button:
      "border-[#140a04] bg-[#301508] text-[#fff6e3] hover:bg-[#482313] focus-visible:outline-[#301508]",
    secondaryText: "text-[#301508]/80",
  },
  red: {
    card: "bg-[#d42b15] text-[#fff6e3]",
    button:
      "border-[#c58b13] bg-[#ffca38] text-[#301508] hover:bg-[#ffdb70] focus-visible:outline-[#ffca38]",
    secondaryText: "text-[#fff6e3]/90",
  },
  green: {
    card: "bg-[#1d6b3c] text-[#fff6e3]",
    button:
      "border-[#c58b13] bg-[#ffca38] text-[#301508] hover:bg-[#ffdb70] focus-visible:outline-[#ffca38]",
    secondaryText: "text-[#fff6e3]/90",
  },
};

function formatPrice(priceInPence: number): string {
  return `£${(priceInPence / 100).toFixed(2)}`;
}

export default function DealCard({ deal, onPick }: DealCardProps) {
  const styles = themeStyles[deal.theme];

  return (
    <article
      aria-labelledby={`deal-title-${deal.id}`}
      className={`group relative flex h-full flex-col rounded-[32px] p-6 sm:p-8 ${styles.card}`}
    >
      {deal.badge && (
        <span className="absolute right-4 top-4 z-10 rotate-3 rounded-full bg-[#301508] px-3 py-1.5 text-[10px] font-black tracking-wide text-[#fff6e3] sm:text-xs">
          {deal.badge}
        </span>
      )}

      {/* Pizza illustrations */}
      <div aria-hidden="true" className="mb-5 flex h-28 items-center pt-1">
        {deal.images.map((image, index) => (
          <div
            key={`${deal.id}-${image.src}-${index}`}
            className={`relative h-28 w-28 shrink-0 ${
              index > 0 ? "-ml-8 rotate-6" : "-rotate-6"
            } motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-y-[-4px]`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="112px"
              className="object-contain drop-shadow-[0_8px_8px_rgba(48,21,8,0.2)]"
            />
          </div>
        ))}
      </div>

      <h3
        id={`deal-title-${deal.id}`}
        className="font-serif text-3xl font-black italic leading-tight tracking-tight sm:text-[34px]"
      >
        {deal.title}
      </h3>

      <p className="mt-2 text-lg font-bold leading-snug">{deal.description}</p>

      <p className={`mt-2 text-sm leading-6 ${styles.secondaryText}`}>
        {deal.availability}
      </p>

      {/* Price and action */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
        <div>
          <p className="text-xs font-bold">
            <span className="sr-only">Original price: </span>

            <del>Usually {formatPrice(deal.originalPriceInPence)}</del>
          </p>

          <p className="mt-1 text-[38px] font-black leading-none tracking-tight">
            <span className="sr-only">Offer price: </span>
            {formatPrice(deal.priceInPence)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onPick(deal)}
          aria-haspopup="dialog"
          aria-label={`Pick and add ${deal.title}`}
          className={`inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full border-b-4 px-6 py-3 text-sm font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${styles.button}`}
        >
          Pick &amp; add
        </button>
      </div>
    </article>
  );
}
