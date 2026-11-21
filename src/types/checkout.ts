export type CheckoutOrderType = "delivery" | "pickup";

export type CheckoutTiming = "asap" | "scheduled";

export type CheckoutPaymentMethod = "card" | "rider";

import type { CartItem } from "@/types/cart";

export type CheckoutShop = {
  id: string;
  name: string;
  address: string;
  postcode: string;
  openingMessage: string;
  asapAvailable: boolean;
  asapMessage?: string;
};

export type CheckoutDeliveryZone = {
  name: string;
  postcodes: readonly string[];
  feeInPence: number;
  minimumInPence: number;
  deliveryTime: string;
};

export type CheckoutCustomerDetails = {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  deliveryInstructions: string;
};

export type CheckoutFormValues = {
  orderType: CheckoutOrderType;
  shopId: string;
  timing: CheckoutTiming;
  deliveryDate: string;
  deliveryTime: string;
  postcode: string;
  customer: CheckoutCustomerDetails;
  paymentMethod: CheckoutPaymentMethod;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
};

export type CheckoutPromoCode = {
  code: string;
  discountPercent?: number;
  freeDelivery?: boolean;
};

export type CheckoutReceipt = {
  orderNumber: string;
  orderType: CheckoutOrderType;
  postcode: string;
  shopName: string;
  shopAddress: string;
  timing: CheckoutTiming;
  deliveryDate: string;
  deliveryTime: string;
  customer: CheckoutCustomerDetails;
  paymentMethod: CheckoutPaymentMethod;
  cardLastFour: string;
  items: Array<CartItem & { image?: string }>;
  subtotalInPence: number;
  deliveryFeeInPence: number;
  totalInPence: number;
};