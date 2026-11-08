import type { LocationCard } from "@/types/location";

export const locations: LocationCard[] = [
  {
    id: "wooster-square",
    name: "Wooster Square",
    address: "42 Franklin Street, New Haven, CT 06511",
    todayHours: "12:00 PM–9:00 PM",
    openUntil: "9:00 PM",
    description:
      "Our first shop, in an old carriage-factory outbuilding. 24 seats, a walk-up window for slices and the big dough fridge.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=42+Franklin+Street+New+Haven+CT+06511",
    orderUrl: "#",
  },
  {
    id: "westville",
    name: "Westville",
    address: "317 Fountain Street, New Haven, CT 06515",
    todayHours: "12:00 PM–9:00 PM",
    openUntil: "9:00 PM",
    description:
      "The little sibling, with a sunny back patio, a dog water bowl and the pistachio gelato from down the road.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=317+Fountain+Street+New+Haven+CT+06515",
    orderUrl: "#",
  },
];