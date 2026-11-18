"use client";

import { useState } from "react";

import { useProducts } from "@/hooks/useProducts";
import BundleIntro from "./BundleIntro";
import BundleProductList, {
  type BundleProduct,
} from "./BundleProductList";
import BundleSummary from "./BundleSummary";

type BundleSelection = {
  items: {
    product: BundleProduct;
    quantity: number;
  }[];
  totalPriceInPence: number;
};

type BundleBuilderProps = {
  onAddBundle?: (bundle: BundleSelection) => void;
};

export default function BundleBuilder({
  onAddBundle,
}: BundleBuilderProps) {
  const { data, isLoading, isError } = useProducts();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const products = (
    Array.isArray(data) ? data : []
  ) as unknown as BundleProduct[];

  function handleQuantityChange(
    productId: string | number,
    amount: number
  ) {
    const id = String(productId);

    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[id] ?? 0) + amount);

      if (nextQuantity === 0) {
        const { [id]: _removed, ...remaining } = current;
        return remaining;
      }

      return {
        ...current,
        [id]: nextQuantity,
      };
    });
  }

  function handleReset() {
    setQuantities({});
  }

  return (
    <section
      id="bundle"
      aria-labelledby="bundle-title"
      className="bg-[#fff6e3] px-5 py-14 text-[#301508] sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <BundleIntro />

        {isLoading ? (
          <p className="mt-10 text-sm text-[#705a4b]">
            Loading products…
          </p>
        ) : isError ? (
          <p role="alert" className="mt-10 text-sm text-[#b92312]">
            Could not load products. Please try again.
          </p>
        ) : (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.45fr_0.95fr]">
            <BundleProductList
              products={products}
              quantities={quantities}
              onQuantityChange={handleQuantityChange}
            />

            <BundleSummary
              products={products}
              quantities={quantities}
              onReset={handleReset}
              onAddBundle={onAddBundle}
            />
          </div>
        )}
      </div>
    </section>
  );
}