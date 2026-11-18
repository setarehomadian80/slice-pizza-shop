"use client";

import Image from "next/image";
import { Shrikhand } from "next/font/google";

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export type BundleProduct = {
  id: string | number;
  name: string;
  category: string;
  price: string | number;
  image?: string;
};

type ProductSection = {
  id: "pizza" | "side" | "dessert" | "drink";
  title: string;
  subtitle?: string;
};

type BundleProductListProps = {
  products: BundleProduct[];
  quantities: Record<string, number>;
  onQuantityChange: (productId: string | number, amount: number) => void;
};

const sections: ProductSection[] = [
  { id: "pizza", title: "Pizzas", subtitle: "Regular 12″" },
  { id: "side", title: "Sides" },
  { id: "dessert", title: "Desserts" },
  { id: "drink", title: "Drinks" },
];

export function getProductSection(category: string): ProductSection["id"] | "" {
  const value = category.toLowerCase();

  if (value.includes("pizza")) return "pizza";
  if (value.includes("side")) return "side";
  if (value.includes("dessert") || value.includes("sweet")) return "dessert";
  if (value.includes("drink") || value.includes("beverage")) return "drink";

  return "";
}

function formatPrice(price: string | number): string {
  const amount = Number(String(price).replace(/[^0-9.]/g, ""));

  return `£${(Number.isFinite(amount) ? amount : 0).toFixed(2)}`;
}

export default function BundleProductList({
  products,
  quantities,
  onQuantityChange,
}: BundleProductListProps) {
  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const sectionProducts = products.filter(
          (product) => getProductSection(product.category) === section.id
        );

        if (sectionProducts.length === 0) return null;

        return (
          <section
            key={section.id}
            aria-labelledby={`bundle-section-${section.id}`}
          >
            <h3
              id={`bundle-section-${section.id}`}
              className="mb-4 text-[#301508]"
            >
              <span className={`${shrikhand.className} text-2xl`}>
                {section.title}
              </span>

              {section.subtitle && (
                <span className="ml-1 text-sm font-bold">
                  ({section.subtitle})
                </span>
              )}
            </h3>

            <div className="grid gap-2 sm:grid-cols-2">
              {sectionProducts.map((product) => {
                const quantity = quantities[String(product.id)] ?? 0;

                return (
                  <article
                    key={product.id}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#e9ddca] bg-[#fffcf5] p-3"
                  >
                    <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f8e8ca]">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="48px"
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <span className="px-1 text-center text-[8px] font-bold text-[#705a4b]">
                          Image
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-extrabold text-[#301508]">
                        {product.name}
                      </h4>
                      <p className="mt-0.5 text-xs font-semibold text-[#705a4b]">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {quantity === 0 ? (
                      <button
                        type="button"
                        onClick={() => onQuantityChange(product.id, 1)}
                        aria-label={`Add ${product.name}`}
                        className="min-h-10 shrink-0 rounded-full bg-[#f8e8ca] px-4 text-sm font-extrabold text-[#301508] transition hover:bg-[#f2dcb4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#301508]"
                      >
                        Add
                      </button>
                    ) : (
                      <div
                        role="group"
                        aria-label={`${product.name} quantity`}
                        className="flex shrink-0 items-center rounded-full bg-[#f8e8ca]"
                      >
                        <button
                          type="button"
                          onClick={() => onQuantityChange(product.id, -1)}
                          aria-label={`Remove one ${product.name}`}
                          className="size-9 rounded-full text-lg font-bold text-[#301508]"
                        >
                          −
                        </button>

                        <output
                          aria-live="polite"
                          className="min-w-5 text-center text-sm font-extrabold"
                        >
                          {quantity}
                        </output>

                        <button
                          type="button"
                          onClick={() => onQuantityChange(product.id, 1)}
                          aria-label={`Add one ${product.name}`}
                          className="size-9 rounded-full text-lg font-bold text-[#301508]"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}