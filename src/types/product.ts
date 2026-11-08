export type PizzaSize = "small" | "regular" | "large";

export type PizzaSizeOption = {
  size: PizzaSize;
  label: string;
  inches: number;
  priceInPence: number;
};

export type Pizza = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  diet: "Vegetarian" | "Vegan" | null;
  spicy: boolean;

  sizes?: PizzaSizeOption[];
};