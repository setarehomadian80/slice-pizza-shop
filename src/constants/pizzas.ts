import type { Pizza } from "@/types/product";

export const pizzas: Pizza[] = [
  {
    id: "margherita",
    name: "Margherita",
    price: "7.50",
    image: "/image/margherita.svg",
    description:
      "Tomato, fior di latte, basil, a good glug of olive oil. The one we judge every new pizzaiolo on.",
    diet: "Vegetarian",
    spicy: false,
    sizes: [
      {
        size: "small",
        label: "Small",
        inches: 10,
        priceInPence: 750,
      },
      {
        size: "regular",
        label: "Regular",
        inches: 12,
        priceInPence: 950,
      },
      {
        size: "large",
        label: "Large",
        inches: 16,
        priceInPence: 1350,
      },
    ],
  },
  {
    id: "Pepperoni",
    name: "Pepperoni Party",
    price: "10.50",
    image: "/image/pepperoni.png",
    description:
      "A double layer of cup-and-char Pepperoni on tomato and fior di latte. Crispy edges, little pools of joy.",
    diet: null,
    spicy: false,
    sizes: [
      {
        size: "small",
        label: "Small",
        inches: 10,
        priceInPence: 1050,
      },
      {
        size: "regular",
        label: "Regular",
        inches: 12,
        priceInPence: 1250,
      },
      {
        size: "large",
        label: "Large",
        inches: 16,
        priceInPence: 1650,
      },
    ],
  },
  {
    id: "Hot-Honey",
    name: "Hot Honey Pep",
    price: "11.50",
    image: "/image/Hot-Honey.png",
    description:
      "Pepperoni, fior di latte and tomato, finished with Scotch bonnet hot honey and chilli flakes.",
    diet: null,
    spicy: true,
    sizes: [
      {
        size: "small",
        label: "Small",
        inches: 10,
        priceInPence: 1150,
      },
      {
        size: "regular",
        label: "Regular",
        inches: 12,
        priceInPence: 1350,
      },
      {
        size: "large",
        label: "Large",
        inches: 16,
        priceInPence: 1750,
      },
    ],
  },
  {
    id: "Green-Machine",
    name: "Green Machine",
    price: "10.00",
    image: "/image/Green-Machine.png",
    description:
      "Nut-free basil pesto, courgette, cherry tomatoes, vegan mozzarella and a handful of rocket.",
    diet: "Vegan",
    spicy: false,
    sizes: [
      {
        size: "small",
        label: "Small",
        inches: 10,
        priceInPence: 1000,
      },
      {
        size: "regular",
        label: "Regular",
        inches: 12,
        priceInPence: 1200,
      },
      {
        size: "large",
        label: "Large",
        inches: 16,
        priceInPence: 1600,
      },
    ],
  },
];