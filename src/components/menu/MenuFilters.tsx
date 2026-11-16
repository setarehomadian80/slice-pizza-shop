
"use client";

import { Flame, X } from "lucide-react";

export type MenuFilterKey =
  | "vegan"
  | "vegetarian"
  | "glutenFree"
  | "spicy";

export type MenuFilterState = Record<MenuFilterKey, boolean>;

type MenuFiltersProps = {
  filters: MenuFilterState;
  onFiltersChange: (filters: MenuFilterState) => void;
  totalItems: number;
  visibleItems: number;
};

const categories = [
  { label: "Pizzas", id: "pizzas" },
  { label: "Sides", id: "sides" },
  { label: "Dips", id: "dips" },
  { label: "Desserts", id: "desserts" },
  { label: "Drinks", id: "drinks" },
];

const filterOptions: {
  label: string;
  key: MenuFilterKey;
}[] = [
  { label: "Vegan", key: "vegan" },
  { label: "Vegetarian", key: "vegetarian" },
  { label: "Gluten-free", key: "glutenFree" },
  { label: "Spicy", key: "spicy" },
];

export default function MenuFilters({
  filters,
  onFiltersChange,
  totalItems,
  visibleItems,
}: MenuFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(Boolean);

  const toggleFilter = (key: MenuFilterKey) => {
    onFiltersChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      spicy: false,
    });
  };

  const hideScrollbar = `
    [scrollbar-width:none]
    [-ms-overflow-style:none]
    [&::-webkit-scrollbar]:hidden
  `;

  return (
    <section
      aria-label="Menu navigation and filters"
      className="
        sticky
        top-[106px]
        md:top-[109px]
        lg:top-[117px]
        z-[50]
        w-full
        bg-[#fff5e2]
        text-[#301508]
        shadow-[0_4px_12px_rgba(48,21,8,0.07)]
      "
    >
      <div
        className="
          mx-auto flex w-full max-w-7xl
          flex-col px-5
          pt-5 pb-3
          sm:px-8
          lg:flex-row lg:items-start
          lg:justify-between lg:gap-8
          lg:py-5
        "
      >
        {/* Category Navigation */}
        <nav
          aria-label="Menu categories"
          className="min-w-0 lg:flex-1"
        >
          <div
            className={`
              flex min-w-0 items-center
              gap-5 overflow-x-auto overflow-y-hidden
              whitespace-nowrap
              pb-4
              sm:gap-7
              lg:gap-8 lg:pb-0
              lg:overflow-visible
              ${hideScrollbar}
            `}
          >
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="
                  shrink-0
                  text-[12px]
                  font-extrabold
                  leading-none
                  transition-colors
                  hover:text-[#a52817]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#a52817]
                  sm:text-[13px]
                "
              >
                {category.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Dietary Filters */}
        <div
          className="
            min-w-0 pt-5
            lg:shrink-0 lg:pt-0
          "
        >
          <div
            className={`
              flex min-w-0 items-center
              gap-2 overflow-x-auto overflow-y-hidden
              whitespace-nowrap
              lg:justify-end
              lg:overflow-visible
              ${hideScrollbar}
            `}
          >
            {filterOptions.map((option) => {
              const isActive = filters[option.key];

              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleFilter(option.key)}
                  className={`
                    inline-flex min-h-8 shrink-0
                    items-center justify-center
                    gap-1.5 rounded-full
                    border px-3 py-1.5
                    text-[11px] font-bold
                    leading-none
                    transition-all duration-200
                    sm:px-3.5 sm:text-xs
                    ${
                      isActive
                        ? "border-[#a52817] bg-[#a52817] text-white"
                        : "border-[#301508]/20 bg-transparent text-[#301508] hover:border-[#a52817] hover:text-[#a52817]"
                    }
                  `}
                >
                  {option.key === "spicy" && (
                    <Flame
                      size={12}
                      strokeWidth={2.5}
                    />
                  )}

                  {option.label}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  inline-flex min-h-8 shrink-0
                  items-center gap-1
                  px-2 text-[11px]
                  font-bold text-[#a52817]
                  transition-opacity
                  hover:opacity-70
                  sm:text-xs
                "
              >
                <X size={13} />
                Clear
              </button>
            )}
          </div>

          {/* Results Count */}
          <p
            aria-live="polite"
            className="
              mt-3 text-[11px]
              font-medium leading-none
              text-[#301508]/60
              sm:text-xs
              lg:text-right
            "
          >
            {hasActiveFilters
              ? `Showing ${visibleItems} of ${totalItems} items.`
              : `Showing all ${totalItems} items.`}
          </p>
        </div>
      </div>
    </section>
  );
}
