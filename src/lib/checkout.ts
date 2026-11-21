import type { CartItem } from "@/types/cart";
import type { CheckoutOrderType } from "@/types/checkout";

import {
  checkoutDeliveryZones,
  freeDeliveryThresholdInPence,
} from "@/constants/checkout";

export function formatPrice(amountInPence: number): string {
  return `£${(amountInPence / 100).toFixed(2)}`;
}

export function normalizePostcode(postcode: string): string {
  return postcode.replace(/\s+/g, "").toUpperCase();
}

export function findDeliveryZone(postcode: string) {
  const normalizedPostcode = normalizePostcode(postcode);

  if (!normalizedPostcode) return undefined;

  return checkoutDeliveryZones.find((zone) =>
    zone.postcodes.includes(normalizedPostcode)
  );
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.unitPriceInPence * item.quantity,
    0
  );
}

type CheckoutTotalsInput = {
  items: CartItem[];
  orderType: CheckoutOrderType;
  postcode: string;
};

export function calculateCheckoutTotals({
  items,
  orderType,
  postcode,
}: CheckoutTotalsInput) {
  const subtotalInPence = calculateSubtotal(items);
  const deliveryZone =
    orderType === "delivery" ? findDeliveryZone(postcode) : undefined;

  const deliveryFeeInPence =
    orderType === "pickup"
      ? 0
      : deliveryZone
        ? subtotalInPence >= freeDeliveryThresholdInPence
          ? 0
          : deliveryZone.feeInPence
        : null;

  const totalInPence =
    subtotalInPence + (deliveryFeeInPence ?? 0);

  return {
    subtotalInPence,
    deliveryZone,
    deliveryFeeInPence,
    totalInPence,
    isDeliveryPostcodeSupported:
      orderType === "pickup" || deliveryZone !== undefined,
  };
}