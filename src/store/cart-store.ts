"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem, CartStore } from "@/types/cart";

function isSameItem(first: CartItem, second: CartItem): boolean {
  let sameProduct = false;

  if ("pizzaId" in first && "pizzaId" in second) {
    sameProduct = first.pizzaId === second.pizzaId;
  } else if ("dealId" in first && "dealId" in second) {
    sameProduct = first.dealId === second.dealId;
  }

  if (!sameProduct) return false;

  const firstKeys = Object.keys(first.selections);
  const secondKeys = Object.keys(second.selections);

  const sameSelections =
    firstKeys.length === secondKeys.length &&
    firstKeys.every(
      (key) => first.selections[key] === second.selections[key]
    );

  const firstIncluded = [...first.included].sort();
  const secondIncluded = [...second.included].sort();

  const sameIncluded =
    firstIncluded.length === secondIncluded.length &&
    firstIncluded.every((value, index) => value === secondIncluded[index]);

  return (
    first.unitPriceInPence === second.unitPriceInPence &&
    sameSelections &&
    sameIncluded
  );
}

function isValidQuantity(quantity: number): boolean {
  return Number.isSafeInteger(quantity) && quantity > 0;
}

function isValidItem(item: CartItem): boolean {
  return (
    isValidQuantity(item.quantity) &&
    Number.isSafeInteger(item.unitPriceInPence) &&
    item.unitPriceInPence >= 0
  );
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) => {
        if (!isValidItem(item)) return;

        set((state) => {
          const existingItem = state.items.find((current) =>
            isSameItem(current, item)
          );

          if (existingItem) {
            const nextQuantity =
              existingItem.quantity + item.quantity;

            if (!isValidQuantity(nextQuantity)) return state;

            return {
              items: state.items.map((current) =>
                current.id === existingItem.id
                  ? { ...current, quantity: nextQuantity }
                  : current
              ),
            };
          }

          const newItem: CartItem = {
            ...item,
            id: crypto.randomUUID(),
            selections: { ...item.selections },
            included: [...item.included],
          };

          return {
            items: [...state.items, newItem],
          };
        });
      },

      updateItem: (item) => {
        if (!isValidItem(item)) return;

        set((state) => {
          const exists = state.items.some(
            (current) => current.id === item.id
          );

          if (!exists) return state;

          return {
            items: state.items.map((current) =>
              current.id === item.id
                ? {
                    ...item,
                    selections: { ...item.selections },
                    included: [...item.included],
                  }
                : current
            ),
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (!Number.isSafeInteger(quantity) || quantity < 0) return;

        set((state) => ({
          items:
            quantity === 0
              ? state.items.filter((item) => item.id !== id)
              : state.items.map((item) =>
                  item.id === id ? { ...item, quantity } : item
                ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "slice-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
      skipHydration: true,
    }
  )
);