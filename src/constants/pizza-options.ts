import type { PizzaSize } from "@/types/product";
import type {
  CrustOption,
  ToppingGroup,
} from "@/types/pizza-options";

export const MAX_TOPPINGS = 6;
export const MAX_PIZZA_QUANTITY = 99;

// قیمت‌های تمرینی، برحسب پنس
export const toppingPriceBySize: Record<PizzaSize, number> = {
  small: 200,
  regular: 250,
  large: 300,
};

export const crustOptions: CrustOption[] = [
  {
    id: "classic",
    name: "Classic sourdough",
    description: "Puffy, blistered, chewy",
    priceInPence: 0,
  },
  {
    id: "thin",
    name: "Thin & crispy",
    description: "Rolled thin, extra crunch",
    priceInPence: 0,
  },
  {
    id: "stuffed",
    name: "Garlic-butter stuffed crust",
    description: "Mozzarella-filled rim",
    priceInPence: 300,
  },
  {
    id: "gluten-free",
    name: "Gluten-free base",
    description: "Small only, made in a kitchen that handles gluten",
    priceInPence: 300,
    onlySize: "small",
  },
];

export const toppingGroups: ToppingGroup[] = [
  {
    id: "cheese",
    title: "Cheese",
    options: [
      { id: "extra-cheese", name: "Extra fior di latte" },
      { id: "vegan-cheese", name: "Vegan mozzarella" },
      { id: "burrata", name: "Burrata (added after the bake)" },
    ],
  },
  {
    id: "meat-fish",
    title: "Meat & fish",
    options: [
      { id: "pepperoni", name: "Pepperoni" },
      { id: "nduja", name: "Nduja" },
      { id: "sausage", name: "Fennel sausage" },
      { id: "ham", name: "Cooked ham" },
      { id: "anchovies", name: "Anchovies" },
    ],
  },
  {
    id: "veg-finishes",
    title: "Veg & finishes",
    options: [
      { id: "mushrooms", name: "Roasted mushrooms" },
      { id: "onion", name: "Red onion" },
      { id: "peppers", name: "Roasted peppers" },
      { id: "olives", name: "Kalamata olives" },
      { id: "jalapenos", name: "Pickled jalapeños" },
      { id: "pineapple", name: "Pineapple" },
      { id: "tomatoes", name: "Cherry tomatoes" },
      { id: "rocket", name: "Rocket" },
      { id: "Hot-Honey", name: "Scotch bonnet hot honey" },
      { id: "chilli", name: "Chilli flakes" },
    ],
  },
];