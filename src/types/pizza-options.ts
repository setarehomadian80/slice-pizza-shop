import type { PizzaSize } from "@/types/product";

export type CrustId = "classic" | "thin" | "stuffed" | "gluten-free";

export type CrustOption = {
  id: CrustId;
  name: string;
  description: string;
  priceInPence: number;
  onlySize?: PizzaSize;
};

export type ToppingOption = {
  id: string;
  name: string;
};

export type ToppingGroup = {
  id: string;
  title: string;
  options: ToppingOption[];
};