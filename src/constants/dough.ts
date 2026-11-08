import type { DoughStat } from "@/types/dough";

export const doughContent = {
  eyebrow: "The dough",
  title: "48 hours of doing absolutely nothing.",
  description:
    "Our starter, Big Brenda, has been fed every morning since 2016. We mix her with stoneground New York flour, then leave the dough in the fridge for two days. That’s where the flavor and the leopard-spotted, airy crust come from.",
  linkLabel: "Read our story",
  linkHref: "/about",
};

export const doughStats: DoughStat[] = [
  {
    id: "starter",
    value: "2016",
    description: "Big Brenda, our sourdough starter, is born",
  },
  {
    id: "fermentation",
    value: "48 h",
    description: "Cold ferment for every dough ball",
  },
  {
    id: "temperature",
    value: "850°",
    description: "Fahrenheit in our wood-and-gas ovens",
  },
  {
    id: "baking",
    value: "90 s",
    description: "From oven door to pizza box",
  },
];