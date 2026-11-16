"use client";

import Image from "next/image";

export type MenuProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  options: string[];
  Allergens: string[];
  image: string;
};

type MenuProductCardProps = {
  product: MenuProduct;
  onSelect: (product: MenuProduct) => void;
};

const bestsellers = new Set(["Margherita", "Pepperoni Party", "Hot Honey Pep"]);

const imageBackgrounds = [
  "#FFE7AA",
  "#dee8c1",
  "#FBD9CF",
  "#f6e2c1",
  "#ffd2c1",
];

export default function MenuProductCard({
  product,
  onSelect,
}: MenuProductCardProps) {
  const isPizza = product.category.toLowerCase() === "pizza";

  const productIndex = Number(product.id);

  const backgroundIndex = Number.isFinite(productIndex)
    ? (Math.max(1, productIndex) - 1) % imageBackgrounds.length
    : 0;

  const backgroundColor = imageBackgrounds[backgroundIndex];

  const options = product.options ?? [];
  const allergens = product.Allergens ?? [];

  const isBestseller = bestsellers.has(product.name);

  const imageSrc = product.image?.trim() ?? "";

  return (
    <article
      className="
        group flex h-full min-w-0 flex-col
        overflow-hidden rounded-[24px]
        border border-[#E6D8C5]
        bg-[#FFFAF2]
        shadow-[0_5px_12px_rgba(60,32,16,0.06)]
        transition-shadow duration-200
        hover:shadow-[0_9px_22px_rgba(60,32,16,0.12)]
      "
    >
      {/* IMAGE AREA */}
      <div
        className="
          relative flex h-[240px] w-full
          shrink-0 items-center justify-center
          overflow-hidden
        "
        style={{ backgroundColor }}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="
              object-contain p-3
              transition-transform duration-300
              group-hover:scale-105
            "
          />
        )}

        {isBestseller && (
          <span
            className="
              absolute left-[13px] top-[15px] z-10
              -rotate-[7deg] rounded-full
              bg-[#D52A16] px-[11px] py-[5px]
              text-[11px] font-black
              uppercase leading-none
              tracking-[0.02em] text-white
              shadow-[0_2px_0_#A91C0C]
            "
          >
            Bestseller
          </span>
        )}
      </div>

      {/* CARD CONTENT */}
      <div
        className="
          flex min-h-[242px] flex-1
          flex-col px-[20px]
          pb-[17px] pt-[20px]
        "
      >
        {/* NAME + PRICE */}
        <div className="mb-[10px] flex items-start justify-between gap-2">
          <h3
            className="
              min-w-0 pt-[1px]
              text-[17px] font-black
              leading-[1.35] tracking-[-0.4px]
              text-[#29160E]
            "
          >
            {product.name}
          </h3>

          <span
            className="
              shrink-0 whitespace-nowrap
              rounded-full bg-[#FFBD35]
              px-[10px] py-[6px]
              text-[12px] font-black
              leading-none text-[#24150E]
            "
          >
            {product.price}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[12px] font-normal leading-[21px] text-[#713F2C]">
          {product.description}
        </p>

        <div className="mt-auto pt-[15px]">
          {/* OPTIONS */}
          {options.length > 0 && (
            <div className="mb-[9px] flex flex-wrap gap-[5px]">
              {options.map((option, index) => {
                const normalized = option.trim().toLowerCase();

                const isVegetarian = normalized === "vegetarian";

                const isVegan = normalized === "vegan";

                const isGF =
                  normalized.includes("gf") || normalized.includes("gluten");

                const isSpicy = normalized.includes("spicy");

                let background = "#F2E6D6";
                let color = "#4A2D1F";

                if (isVegetarian || isVegan) {
                  background = "#DCEFCF";
                  color = "#24552B";
                }

                if (isGF) {
                  background = "#FFE5A1";
                  color = "#67420B";
                }

                if (isSpicy) {
                  background = "#FAD5C9";
                  color = "#A52B17";
                }

                return (
                  <span
                    key={`${option}-${index}`}
                    className="
                      inline-flex items-center
                      rounded-full px-[9px] py-[4px]
                      text-[10px] font-extrabold
                      leading-none
                    "
                    style={{
                      backgroundColor: background,
                      color,
                    }}
                  >
                    {option}
                  </span>
                );
              })}
            </div>
          )}

          {/* ALLERGENS */}
          <p className="mb-[17px] text-[10px] leading-[15px] text-[#754532]">
            <span className="font-extrabold">Allergens:</span>{" "}
            {allergens.length > 0 ? allergens.join(", ") : "None"}
          </p>

          {/* ORDER BUTTON */}
          <button
            type="button"
            onClick={() => onSelect(product)}
            aria-label={
              isPizza
                ? `Choose size and add ${product.name}`
                : `Add ${product.name} to order`
            }
            className="
              flex h-[41px] w-full
              items-center justify-center
              rounded-full bg-[#D52A16]
              px-4 text-center
              text-[12px] font-black
              text-white
              shadow-[0_3px_0_#931C0D]
              transition-all duration-150
              hover:bg-[#BB2412]
              active:translate-y-[2px]
              active:shadow-none
            "
          >
            {isPizza ? "Choose size & add" : "Add to order"}
          </button>
        </div>
      </div>
    </article>
  );
}
