import type { CartItem } from "@/types/cart";
import { pizzas } from "@/constants/pizzas";
import { deals } from "@/constants/deals";

export type ProductImage = {
  id: string;
  name: string;
  image?: string | null;
};

export function getItemImage(
  item: CartItem,
  products: ProductImage[]
): string | undefined {
  if (
    "image" in item &&
    typeof item.image === "string" &&
    item.image.trim()
  ) {
    return item.image;
  }

  const productId =
    "productId" in item && typeof item.productId === "string"
      ? item.productId
      : "menuItemId" in item && typeof item.menuItemId === "string"
        ? item.menuItemId
        : "pizzaId" in item
          ? item.pizzaId
          : undefined;

  const apiProduct =
    products.find((product) => product.id === productId) ??
    products.find((product) => product.name === item.title);

  if (apiProduct?.image) return apiProduct.image;

  if ("pizzaId" in item) {
    const pizza = pizzas.find((entry) => entry.id === item.pizzaId);
    if (pizza?.image) return pizza.image;
  }

  if ("dealId" in item) {
    return deals.find((deal) => deal.id === item.dealId)?.images[0]?.src;
  }

  return undefined;
}