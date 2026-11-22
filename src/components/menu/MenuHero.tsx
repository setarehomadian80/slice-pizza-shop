"use client";

import Image from "next/image";

import { useProducts } from "@/hooks/useProducts";

type MenuHeroProps = {
  orderSummary?: string;
  onChangeOrder?: () => void;
};

const heroPizzaOptions = [
  {
    names: ["Margherita"],
    className: "left-0 top-4 size-56 -rotate-12",
    sizes: "224px",
  },
  {
    names: ["Green Machine", "Green-Machine"],
    className: "right-0 top-0 size-64 rotate-6",
    sizes: "256px",
  },
] as const;

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default function MenuHero({
  orderSummary = "Delivery or pickup?",
  onChangeOrder,
}: MenuHeroProps) {
  const { data: products = [] } = useProducts();

  const heroPizzas = heroPizzaOptions.flatMap((option) => {
    const product = products.find((item) =>
      option.names.some(
        (name) => normalizeName(item.name) === normalizeName(name)
      )
    );

    if (!product?.image) return [];

    return [
      {
        src: product.image,
        className: option.className,
        sizes: option.sizes,
      },
    ];
  });

  return (
    <section
      dir="ltr"
      aria-labelledby="menu-title"
      className="relative isolate w-full overflow-hidden bg-[#ce2813] pb-20 pt-12 text-[#fff5e2] sm:pt-16"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em]">
            Order online
          </p>

          <h1
            id="menu-title"
            style={{ fontFamily: "var(--font-shrikhand)" }}
            className="mt-3 text-[44px] leading-[1.1] sm:text-6xl lg:text-7xl"
          >
            The menu
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed">
            Twelve pizzas on 48-hour sourdough, in 10″, 12″ and 16″. Go half
            &amp; half, add extras, swap to a gluten-free base. Every allergen is
            listed on the item.
          </p>

          <div className="mt-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-[#a92110] px-4 py-2 text-sm font-bold">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-5 shrink-0"
            >
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>

            <span>{orderSummary}</span>

            <button
              type="button"
              onClick={onChangeOrder}
              disabled={!onChangeOrder}
              className="rounded-sm underline underline-offset-4 transition-opacity enabled:cursor-pointer enabled:hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff5e2] disabled:cursor-not-allowed"
              aria-label="Change delivery or pickup"
            >
              Change
            </button>
          </div>
        </div>

        <div aria-hidden="true" className="relative hidden lg:block">
          <div className="relative mx-auto h-72 w-full max-w-md">
            {heroPizzas.map((pizza) => (
              <div
                key={pizza.src}
                className={`absolute drop-shadow-[0_20px_20px_rgb(70_10_0/0.35)] ${pizza.className}`}
              >
                <Image
                  src={pizza.src}
                  alt=""
                  fill
                  sizes={pizza.sizes}
                  unoptimized
                  className="select-none object-contain"
                  draggable={false}
                />
              </div>
            ))}

            <svg
              viewBox="0 0 60 60"
              focusable="false"
              className="pointer-events-none absolute -bottom-2 left-1/2 size-12 rotate-[30deg]"
            >
              <path
                d="M30 6c18 6 18 40 0 48C12 46 12 12 30 6Z"
                fill="#2f8a3f"
              />
              <path
                d="M30 10v42"
                stroke="#1d6b2c"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              <path
                d="M30 22l-8-5M30 32l9-6M30 41l-8-5"
                stroke="#1d6b2c"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-[22px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 100%, #fff5e2 21px, transparent 22px)",
          backgroundSize: "44px 22px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </section>
  );
}