export type DealTheme = "yellow" | "red" | "green";

export type DealImage = {
  src: string;
  alt: string;
};

export type Deal = {
  id: string;
  title: string;
  description: string;
  availability: string;
  originalPriceInPence: number;
  priceInPence: number;
  theme: DealTheme;
  badge?: string;
  images: DealImage[];
};

export type DealField =
  | {
      kind: "select";
      id: string;
      label: string;
      options: readonly string[];
      defaultValue: string;
    }
  | {
      kind: "included";
      id: string;
      label: string;
    };

export type DealCartItem = {
  id: string;
  dealId: string;
  title: string;
  quantity: number;
  unitPriceInPence: number;
  selections: Record<string, string>;
  included: string[];
  image?: string;
};