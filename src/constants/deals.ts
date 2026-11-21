import type { Deal } from "@/types/deal";

export const deals: Deal[] = [
  {
    id: "solo-lunch",
    title: "Solo Lunch",
    description: "Any small pizza and a cold drink",
    availability: "Every day until 4pm, pickup or delivery",
    originalPriceInPence: 970,
    priceInPence: 750,
    theme: "yellow",
    images: [
      {
        src: "/image/margherita.svg",
        alt: "Margherita pizza",
      },
    ],
  },
  {
    id: "date-night-duo",
    title: "Date Night Duo",
    description: "Two regular pizzas, garlic knots and two dips",
    availability: "Any day, all day",
    originalPriceInPence: 2380,
    priceInPence: 2150,
    theme: "red",
    badge: "MOST ORDERED",
    images: [
      {
        src: "/image/pepperoni.png",
        alt: "Pepperoni pizza",
      },
      {
        src: "/image/Green-Machine.png",
        alt: "Green Machine pizza",
      },
    ],
  },
  {
    id: "family-feast",
    title: "Family Feast",
    description: "Two large pizzas, two sides, four dips and a dessert",
    availability: "Any day, all day",
    originalPriceInPence: 4960,
    priceInPence: 3600,
    theme: "green",
    images: [
      {
        src: "/image/Hot-Honey.png",
        alt: "Hot Honey Pepperoni pizza",
      },
      {
        src: "/image/pepperoni.png",
        alt: "Pepperoni pizza",
      },
    ],
  },
];