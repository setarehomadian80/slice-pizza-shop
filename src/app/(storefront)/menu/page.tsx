"use client";

import { useMemo, useState } from "react";
import MenuDietaryInfo from "@/components/menu/MenuDietaryInfo";
import MenuHero from "@/components/menu/MenuHero";
import MenuFilters, {
  type MenuFilterState,
} from "@/components/menu/MenuFilters";
import MenuProductCard, {
  type MenuProduct,
} from "@/components/menu/MenuProductCard";

import PizzaModal from "@/components/pizzas/PizzaModal";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cart-store";
import type { Pizza } from "@/types/product";

const categories = [
  { id: "pizzas", value: "pizza", title: "Pizzas" },
  { id: "sides", value: "sides", title: "Sides" },
  { id: "dips", value: "dips", title: "Dips" },
  { id: "desserts", value: "desserts", title: "Desserts" },
  { id: "drinks", value: "drinks", title: "Drinks" },
];

const initialFilters: MenuFilterState = {
  vegan: false,
  vegetarian: false,
  glutenFree: false,
  spicy: false,
};

function getOptions(product: MenuProduct): string[] {
  return Array.isArray(product.options)
    ? product.options.map((option) => option.toLowerCase().trim())
    : [];
}

function matchesFilters(
  product: MenuProduct,
  filters: MenuFilterState,
): boolean {
  const options = getOptions(product);

  const isVegan = options.includes("vegan");

  const isVegetarian = isVegan || options.includes("vegetarian");

  const isGlutenFree = options.some(
    (option) =>
      option.includes("gluten-free") ||
      option.includes("gluten free") ||
      option.includes("gf base"),
  );

  const isSpicy = options.some((option) => option.includes("spicy"));

  return (
    (!filters.vegan || isVegan) &&
    (!filters.vegetarian || isVegetarian) &&
    (!filters.glutenFree || isGlutenFree) &&
    (!filters.spicy || isSpicy)
  );
}

function getPriceInPence(price: string): number {
  const match = price.match(/\d+(?:\.\d+)?/);

  if (!match) return 0;

  return Math.round(Number(match[0]) * 100);
}

function convertToPizza(product: MenuProduct): Pizza {
  const options = getOptions(product);

  const diet: Pizza["diet"] = options.includes("vegan")
    ? "Vegan"
    : options.includes("vegetarian")
      ? "Vegetarian"
      : null;

  return {
    id: product.id,
    name: product.name,
    price: (getPriceInPence(product.price) / 100).toFixed(2),
    image: product.image ?? "",
    description: product.description ?? "",
    diet,
    spicy: options.includes("spicy"),
  };
}

export default function MenuPage() {
  const { data, isPending, isError, refetch } = useProducts();

  const addItem = useCartStore((state) => state.addItem);

  const [filters, setFilters] = useState<MenuFilterState>(initialFilters);

  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  // Temporary compatibility with the existing API service type.
  const products = useMemo(
    () => (data ?? []) as unknown as MenuProduct[],
    [data],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => matchesFilters(product, filters));
  }, [products, filters]);

  const handleSelectProduct = (product: MenuProduct) => {
    if (product.category.toLowerCase() === "pizza") {
      setSelectedPizza(convertToPizza(product));
      return;
    }

    const priceInPence = getPriceInPence(product.price);

    if (priceInPence <= 0) return;

    addItem({
      id: `menu-${product.id}`,
      pizzaId: product.id,
      title: product.name,
      quantity: 1,
      unitPriceInPence: priceInPence,
      selections: {},
      included: [],
    });
  };

  return (
    <main className="min-h-screen bg-[#fff5e2] text-[#301508]">
      <MenuHero />

      <MenuFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalItems={products.length}
        visibleItems={filteredProducts.length}
      />

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        {isPending && (
          <div role="status" className="py-20 text-center">
            <p className="text-lg font-bold">Loading our delicious menu...</p>
          </div>
        )}

        {isError && (
          <div role="alert" className="py-20 text-center">
            <p className="mb-5 font-bold">
              Something went wrong loading the menu.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-full bg-[#a52817] px-6 py-3 font-bold text-white"
            >
              Try again
            </button>
          </div>
        )}

        {!isPending && !isError && (
          <>
            {categories.map((category) => {
              const categoryProducts = filteredProducts.filter((product) => {
                const value = product.category?.toLowerCase().trim();

                return value === category.value || value === category.id;
              });

              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="
                    scroll-mt-[250px]
                     md:scroll-mt-[250px]
                    lg:scroll-mt-[220px]
                     py-10
                      "
                >
                  <h2
                    className="mb-8 
                  font-[family-name:var(--font-shrikhand)] 
                  text-3xl "
                  >
                    {category.title}
                  </h2>

                  {categoryProducts.length === 0 ? (
                    <p className="text-sm text-[#301508]/60">
                      No items to show.
                    </p>
                  ) : (
                    <div
                      className="grid grid-cols-1 gap-5 
                    sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                      {categoryProducts.map((product) => (
                        <MenuProductCard
                          key={product.id}
                          product={product}
                          onSelect={handleSelectProduct}
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </>
        )}
      </div>

      <MenuDietaryInfo />

      {selectedPizza && (
        <PizzaModal
          key={selectedPizza.id}
          pizza={selectedPizza}
          onClose={() => setSelectedPizza(null)}
        />
      )}
    </main>
  );
}
