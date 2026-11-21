"use client";

import { useId } from "react";
import { Banknote, CreditCard } from "lucide-react";

import type {
  CheckoutOrderType,
  CheckoutPaymentMethod,
} from "@/types/checkout";

type CardField = "cardNumber" | "cardName" | "cardExpiry" | "cardCvc";

type CheckoutPaymentProps = {
  orderType: CheckoutOrderType;
  paymentMethod: CheckoutPaymentMethod;
  onPaymentMethodChange: (method: CheckoutPaymentMethod) => void;
  cardDetails: Record<CardField, string>;
  onCardDetailsChange: (field: CardField, value: string) => void;
  fieldErrors: Partial<Record<CardField, string | undefined>>;
};

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p role="alert" className="mt-1 text-xs font-semibold text-[#b92312]">
      {message}
    </p>
  );
}

export default function CheckoutPayment({
  orderType,
  paymentMethod,
  onPaymentMethodChange,
  cardDetails,
  onCardDetailsChange,
  fieldErrors,
}: CheckoutPaymentProps) {
  const id = useId();

  function inputClass(error?: string) {
    return `min-h-11 w-full rounded-xl border bg-[#fffaf3] px-3 text-sm text-[#301508] outline-none placeholder:text-[#9b8d81] focus:border-[#301508] ${
      error
        ? "border-[#d42b15] bg-[#fff5f2] focus:border-[#d42b15]"
        : "border-[#ded5c8]"
    }`;
  }

  return (
    <section
      aria-labelledby="checkout-payment-title"
      className="rounded-[24px] border border-[#e7ddcc] bg-[#fffaf3] p-4 text-[#301508] shadow-[0_8px_20px_rgba(48,21,8,0.06)] sm:p-5"
    >
      <h2
        id="checkout-payment-title"
        className="flex items-center gap-2 text-lg font-black"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d42b15] text-sm text-white">
          4
        </span>
        Payment
      </h2>

      <p className="mt-4 rounded-xl bg-[#ffe4a3] px-3 py-2.5 text-xs font-bold leading-5">
        No payment is taken on this demo site. Any 16-digit card number will do.
      </p>

      <div
        role="radiogroup"
        aria-label="Payment method"
        className="mt-3 grid gap-2 sm:grid-cols-2"
      >
        <button
          type="button"
          role="radio"
          aria-checked={paymentMethod === "card"}
          onClick={() => onPaymentMethodChange("card")}
          className={`min-h-[72px] rounded-2xl border-2 p-3 text-left transition-colors ${
            paymentMethod === "card"
              ? "border-[#301508] bg-[#ffe4a3]"
              : "border-[#e7ddcc] bg-[#fffaf3]"
          }`}
        >
          <span className="flex items-center gap-2 text-sm font-extrabold">
            <CreditCard size={17} aria-hidden="true" />
            Pay now by card
          </span>
          <span className="mt-1 block text-xs text-[#715c4d]">
            Secure card payment
          </span>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={paymentMethod === "rider"}
          onClick={() => onPaymentMethodChange("rider")}
          className={`min-h-[72px] rounded-2xl border-2 p-3 text-left transition-colors ${
            paymentMethod === "rider"
              ? "border-[#301508] bg-[#ffe4a3]"
              : "border-[#e7ddcc] bg-[#fffaf3]"
          }`}
        >
          <span className="flex items-center gap-2 text-sm font-extrabold">
            <Banknote size={17} aria-hidden="true" />
            {orderType === "pickup" ? "Pay at the shop" : "Pay the rider"}
          </span>
          <span className="mt-1 block text-xs text-[#715c4d]">
            Card or cash
          </span>
        </button>
      </div>

      {paymentMethod === "card" && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor={`${id}-card-number`}
              className="mb-1.5 block text-xs font-bold"
            >
              Card number
            </label>
            <input
              id={`${id}-card-number`}
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              value={cardDetails.cardNumber}
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              aria-invalid={Boolean(fieldErrors.cardNumber)}
              onChange={(event) => {
                const digits = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 16);

                const formatted = digits.match(/.{1,4}/g)?.join(" ") ?? "";
                onCardDetailsChange("cardNumber", formatted);
              }}
              className={inputClass(fieldErrors.cardNumber)}
            />
            <ErrorText message={fieldErrors.cardNumber} />
          </div>

          <div>
            <label
              htmlFor={`${id}-card-name`}
              className="mb-1.5 block text-xs font-bold"
            >
              Name on card
            </label>
            <input
              id={`${id}-card-name`}
              type="text"
              autoComplete="cc-name"
              value={cardDetails.cardName}
              placeholder="Name as shown on card"
              aria-invalid={Boolean(fieldErrors.cardName)}
              onChange={(event) =>
                onCardDetailsChange("cardName", event.target.value)
              }
              className={inputClass(fieldErrors.cardName)}
            />
            <ErrorText message={fieldErrors.cardName} />
          </div>

          <div>
            <label
              htmlFor={`${id}-card-expiry`}
              className="mb-1.5 block text-xs font-bold"
            >
              Expiration date
            </label>
            <input
              id={`${id}-card-expiry`}
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              value={cardDetails.cardExpiry}
              maxLength={7}
              placeholder="MM / YY"
              aria-invalid={Boolean(fieldErrors.cardExpiry)}
              onChange={(event) => {
                const digits = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4);

                const formatted =
                  digits.length > 2
                    ? `${digits.slice(0, 2)} / ${digits.slice(2)}`
                    : digits;

                onCardDetailsChange("cardExpiry", formatted);
              }}
              className={inputClass(fieldErrors.cardExpiry)}
            />
            <ErrorText message={fieldErrors.cardExpiry} />
          </div>

          <div>
            <label
              htmlFor={`${id}-card-cvc`}
              className="mb-1.5 block text-xs font-bold"
            >
              CVC
            </label>
            <input
              id={`${id}-card-cvc`}
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cardDetails.cardCvc}
              maxLength={4}
              placeholder="CVC"
              aria-invalid={Boolean(fieldErrors.cardCvc)}
              onChange={(event) => {
                const digits = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4);

                onCardDetailsChange("cardCvc", digits);
              }}
              className={inputClass(fieldErrors.cardCvc)}
            />
            <ErrorText message={fieldErrors.cardCvc} />
          </div>
        </div>
      )}
    </section>
  );
}