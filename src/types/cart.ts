import type { DealCartItem } from "@/types/deal";

// محصول پیتزایی داخل سبد
export type PizzaCartItem = {
  id: string;
  pizzaId: string;
  title: string;
  quantity: number;
  unitPriceInPence: number;
  selections: Record<string, string>;
  included: string[];
  image?: string;
};

// سبد می‌تواند بستهٔ تخفیفی یا پیتزای تکی داشته باشد.
export type CartItem = DealCartItem | PizzaCartItem;

export type CartStore = {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  updateItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};