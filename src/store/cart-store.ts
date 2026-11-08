"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem, CartStore } from "@/types/cart";

// آیا محتویات دو بسته دقیقاً یکسان است؟
function isSameItem(first: CartItem, second: CartItem): boolean {
  // پیتزا با پیتزا و بسته با بسته مقایسه می‌شود.
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
    firstIncluded.every(
      (value, index) => value === secondIncluded[index]
    );

  return (
    first.unitPriceInPence === second.unitPriceInPence &&
    sameSelections &&
    sameIncluded
  );
}

// تعداد باید یک عدد صحیح و مثبت باشد.
function isValidQuantity(quantity: number): boolean {
  return Number.isSafeInteger(quantity) && quantity > 0;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      // اضافه‌کردن بسته به سبد
      addItem: (item) => {
        if (!isValidQuantity(item.quantity)) return;

        if (
          !Number.isSafeInteger(item.unitPriceInPence) ||
          item.unitPriceInPence < 0
        ) {
          return;
        }

        set((state) => {
          const existingItem = state.items.find((current) =>
            isSameItem(current, item)
          );

          // بستهٔ یکسان قبلاً وجود دارد: فقط تعداد بیشتر می‌شود.
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

          // بستهٔ جدید یا با انتخاب‌های متفاوت
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

      // حذف یک ردیف از سبد
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      // تغییر تعداد؛ صفر یعنی حذف آن ردیف
      updateQuantity: (id, quantity) => {
        if (!Number.isSafeInteger(quantity) || quantity < 0) {
          return;
        }

        set((state) => ({
          items:
            quantity === 0
              ? state.items.filter((item) => item.id !== id)
              : state.items.map((item) =>
                  item.id === id ? { ...item, quantity } : item
                ),
        }));
      },

      // خالی‌کردن کل سبد
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "slice-cart",
      version: 1,

      storage: createJSONStorage(() => localStorage),

      // فقط اطلاعات سبد ذخیره می‌شود، نه توابع.
      partialize: (state) => ({
        items: state.items,
      }),

      // بازیابی را بعد از آماده‌شدن مرورگر انجام می‌دهیم.
      skipHydration: true,
    }
  )
); 