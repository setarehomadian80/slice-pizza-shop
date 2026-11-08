import type { DeliveryType, Shop } from "@/types/shop";

export const deliveryTypes: DeliveryType[] = ["delivery", "pickup"];

export const shops: Shop[] = [
  {
    id: "ancoats",
    name: "Ancoats",
    address: "42 Blossom Street",
    hours: "Open until 21:00",
  },
  {
    id: "chorlton",
    name: "Chorlton",
    address: "317 Barlow Moor Road",
    hours: "Open until 21:00",
  },
];