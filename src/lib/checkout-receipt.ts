import type { CheckoutReceipt } from "@/types/checkout";

const RECEIPT_STORAGE_KEY = "slice-checkout-receipt";

export function saveCheckoutReceipt(receipt: CheckoutReceipt): void {
  sessionStorage.setItem(RECEIPT_STORAGE_KEY, JSON.stringify(receipt));
}

export function getCheckoutReceipt(): CheckoutReceipt | null {
  const value = sessionStorage.getItem(RECEIPT_STORAGE_KEY);

  if (!value) return null;

  try {
    return JSON.parse(value) as CheckoutReceipt;
  } catch {
    return null;
  }
}