export type LocationId = "wooster-square" | "westville";

export type LocationCard = {
  id: LocationId;
  name: string;
  address: string;
  todayHours: string;
  openUntil: string;
  description: string;
  mapUrl: string;
  orderUrl: string;
};