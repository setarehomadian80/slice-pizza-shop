export type DeliveryType = "delivery" | "pickup";

export type ShopId = "ancoats" | "chorlton";

export type Shop = {
  id: ShopId;
  name: string;
  address: string;
  hours: string;
};