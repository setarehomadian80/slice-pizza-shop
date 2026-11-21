import type {
  CheckoutDeliveryZone,
  CheckoutShop,
} from "@/types/checkout";

export const checkoutShops: CheckoutShop[] = [
  {
    id: "wooster-square",
    name: "Wooster Square",
    address: "42 Franklin Street, New Haven, CT 06511",
    postcode: "06511",
    openingMessage: "Opens today at 12:00 PM",
    asapAvailable: true,
  },
  {
    id: "westville",
    name: "Westville",
    address: "317 Fountain Street, New Haven, CT 06515",
    postcode: "06515",
    openingMessage: "Opens today at 4:00 PM",
    asapAvailable: true,
  },
];

export const checkoutDeliveryZones: CheckoutDeliveryZone[] = [
  {
    name: "Downtown & Wooster Square",
    postcodes: ["06510", "06511"],
    feeInPence: 299,
    minimumInPence: 2000,
    deliveryTime: "25–35 min",
  },
  {
    name: "Hamden, Fair Haven & The Hill",
    postcodes: ["06512", "06513", "06514", "06517", "06518", "06519"],
    feeInPence: 499,
    minimumInPence: 2500,
    deliveryTime: "35–50 min",
  },
  {
    name: "Westville & Woodbridge",
    postcodes: ["06515", "06525"],
    feeInPence: 299,
    minimumInPence: 2000,
    deliveryTime: "25–35 min",
  },
  {
    name: "West Haven, Allingtown & Orange",
    postcodes: ["06477", "06516"],
    feeInPence: 499,
    minimumInPence: 2500,
    deliveryTime: "35–50 min",
  },
];

export const supportedDeliveryPostcodes = [
  ...new Set(checkoutDeliveryZones.flatMap((zone) => zone.postcodes)),
];

export const checkoutPromoCodes = [
  "SLICE10",
  "FREEDELIVERY",
  "FIRSTSLICE",
] as const;

export const freeDeliveryThresholdInPence = 3500;

export const pickupPreparationMinutes = 20;