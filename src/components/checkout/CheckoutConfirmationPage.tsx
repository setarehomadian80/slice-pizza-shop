"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { formatPrice } from "@/lib/checkout";
import type { CheckoutReceipt } from "@/types/checkout";

const RECEIPT_STORAGE_KEY = "slice-checkout-receipt";

function subscribe(callback: () => void) {
  window.addEventListener("focus", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("focus", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return sessionStorage.getItem(RECEIPT_STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

function parseReceipt(value: string | null): CheckoutReceipt | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as CheckoutReceipt;
  } catch {
    return null;
  }
}

export default function CheckoutConfirmationPage() {
  const serializedReceipt = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const receipt = parseReceipt(serializedReceipt);

  if (!receipt) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#fff5e2] px-5 text-center text-[#301508]">
        <div>
          <h1 className="font-[family-name:var(--font-shrikhand)] text-3xl">
            No order found
          </h1>
          <p className="mt-3 text-[#715c4d]">
            Place an order first to see its confirmation.
          </p>
          <Link
            href="/menu"
            className="mt-5 inline-flex rounded-full bg-[#cc2a16] px-6 py-3 font-bold text-white"
          >
            Back to menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff5e2] px-4 py-10 text-[#301508] sm:px-6">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-[#e7ddcc] bg-[#fffaf3] p-5 shadow-[0_10px_25px_rgba(48,21,8,0.08)] sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1d6b3c]">
          Order received
        </p>

        <h1 className="mt-2 font-[family-name:var(--font-shrikhand)] text-4xl">
          Thank you!
        </h1>

        <p className="mt-2 text-sm text-[#715c4d]">
          Order number: <strong>{receipt.orderNumber}</strong>
        </p>

        <section className="mt-7">
          <h2 className="text-lg font-black">Your order</h2>

          <ul className="mt-3 divide-y divide-dashed divide-[#e7ddcc]">
            {receipt.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[#fae8ca]">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  )}
                </div>

                <p className="min-w-0 flex-1 text-sm font-bold">
                  {item.quantity} × {item.title}
                </p>

                <p className="shrink-0 text-sm font-extrabold">
                  {formatPrice(item.quantity * item.unitPriceInPence)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 grid gap-5 border-t border-[#e7ddcc] pt-5 sm:grid-cols-2">
          <div>
            <h2 className="font-black">Customer</h2>
            <p className="mt-2 text-sm">{receipt.customer.fullName}</p>
            <p className="mt-1 text-sm">{receipt.customer.phone}</p>
            <p className="mt-1 text-sm">{receipt.customer.email}</p>

            {receipt.orderType === "delivery" && (
              <p className="mt-1 text-sm">
                {receipt.customer.streetAddress}
                {receipt.postcode ? ` · ${receipt.postcode}` : ""}
              </p>
            )}
          </div>

          <div>
            <h2 className="font-black">Order details</h2>
            <p className="mt-2 text-sm">
              {receipt.orderType === "delivery" ? "Delivery" : "Pickup"}
            </p>

            {receipt.orderType === "pickup" && (
              <p className="mt-1 text-sm">
                {receipt.shopName} · {receipt.shopAddress}
              </p>
            )}

            <p className="mt-1 text-sm">
              {receipt.timing === "asap"
                ? "As soon as possible"
                : `${receipt.deliveryDate} · ${receipt.deliveryTime}`}
            </p>

            <p className="mt-1 text-sm">
              Payment:{" "}
              {receipt.paymentMethod === "card"
                ? `Card ending in ${receipt.cardLastFour}`
                : "Pay on pickup / delivery"}
            </p>
          </div>
        </section>

        <dl className="mt-6 space-y-2 border-t border-dashed border-[#e7ddcc] pt-4 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatPrice(receipt.subtotalInPence)}</dd>
          </div>

          <div className="flex justify-between">
            <dt>Delivery</dt>
            <dd>
              {receipt.deliveryFeeInPence === 0
                ? "Free"
                : formatPrice(receipt.deliveryFeeInPence)}
            </dd>
          </div>

          <div className="flex justify-between border-t border-[#e7ddcc] pt-3 text-lg font-black">
            <dt>Total</dt>
            <dd>{formatPrice(receipt.totalInPence)}</dd>
          </div>
        </dl>

        <Link
          href="/menu"
          className="mt-6 flex min-h-12 items-center justify-center rounded-full border-b-4 border-[#94190b] bg-[#cc2a16] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#b52212]"
        >
          Back to menu
        </Link>
      </div>
    </main>
  );
}