"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export default function CartHydration() {
  useEffect(() => {
    if (!useCartStore.persist.hasHydrated()) {
      void useCartStore.persist.rehydrate();
    }
  }, []);

  return null;
}