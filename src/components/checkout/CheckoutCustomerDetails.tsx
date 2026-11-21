"use client";

import { useId } from "react";

import type {
  CheckoutCustomerDetails as CustomerDetails,
  CheckoutOrderType,
  CheckoutShop,
} from "@/types/checkout";

type CustomerFieldErrors = Partial<
  Record<keyof CustomerDetails, string | undefined>
>;

type CheckoutCustomerDetailsProps = {
  orderType: CheckoutOrderType;
  value: CustomerDetails;
  onChange: (field: keyof CustomerDetails, value: string) => void;
  selectedShop?: CheckoutShop;
  fieldErrors: CustomerFieldErrors;
};

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p role="alert" className="mt-1 text-xs font-semibold text-[#b92312]">
      {message}
    </p>
  );
}

export default function CheckoutCustomerDetails({
  orderType,
  value,
  onChange,
  selectedShop,
  fieldErrors,
}: CheckoutCustomerDetailsProps) {
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
      aria-labelledby="checkout-details-title"
      className="rounded-[24px] border border-[#e7ddcc] bg-[#fffaf3] p-4 text-[#301508] shadow-[0_8px_20px_rgba(48,21,8,0.06)] sm:p-5"
    >
      <h2
        id="checkout-details-title"
        className="flex items-center gap-2 text-lg font-black"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d42b15] text-sm text-white">
          3
        </span>
        Your details
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor={`${id}-full-name`}
            className="mb-1.5 block text-xs font-bold"
          >
            Full name
          </label>

          <input
            id={`${id}-full-name`}
            type="text"
            autoComplete="name"
            value={value.fullName}
            onChange={(event) => onChange("fullName", event.target.value)}
            aria-invalid={Boolean(fieldErrors.fullName)}
            className={inputClass(fieldErrors.fullName)}
          />

          <ErrorText message={fieldErrors.fullName} />
        </div>

        <div>
          <label
            htmlFor={`${id}-phone`}
            className="mb-1.5 block text-xs font-bold"
          >
            Cell number
          </label>

          <input
            id={`${id}-phone`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={value.phone}
            onChange={(event) => onChange("phone", event.target.value)}
            placeholder="(203) 555-0147"
            aria-invalid={Boolean(fieldErrors.phone)}
            className={inputClass(fieldErrors.phone)}
          />

          <ErrorText message={fieldErrors.phone} />

          {!fieldErrors.phone && (
            <p className="mt-1 text-[11px] leading-4 text-[#715c4d]">
              We’ll text you if the rider can’t find you.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${id}-email`}
            className="mb-1.5 block text-xs font-bold"
          >
            Email
          </label>

          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            value={value.email}
            onChange={(event) => onChange("email", event.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(fieldErrors.email)}
            className={inputClass(fieldErrors.email)}
          />

          <ErrorText message={fieldErrors.email} />

          {!fieldErrors.email && (
            <p className="mt-1 text-[11px] leading-4 text-[#715c4d]">
              For your receipt.
            </p>
          )}
        </div>

        {orderType === "delivery" ? (
          <>
            <div className="sm:col-span-2">
              <label
                htmlFor={`${id}-street-address`}
                className="mb-1.5 block text-xs font-bold"
              >
                Street address
              </label>

              <input
                id={`${id}-street-address`}
                type="text"
                autoComplete="street-address"
                value={value.streetAddress}
                onChange={(event) =>
                  onChange("streetAddress", event.target.value)
                }
                placeholder="12 Orange Street, Apt 4"
                aria-invalid={Boolean(fieldErrors.streetAddress)}
                className={inputClass(fieldErrors.streetAddress)}
              />

              <ErrorText message={fieldErrors.streetAddress} />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor={`${id}-delivery-instructions`}
                className="mb-1.5 block text-xs font-bold"
              >
                Instructions for the rider{" "}
                <span className="font-normal text-[#715c4d]">(optional)</span>
              </label>

              <textarea
                id={`${id}-delivery-instructions`}
                rows={3}
                value={value.deliveryInstructions}
                onChange={(event) =>
                  onChange("deliveryInstructions", event.target.value)
                }
                placeholder="Buzzer 4, side gate, please don’t knock..."
                className="w-full resize-y rounded-xl border border-[#ded5c8] bg-[#fffaf3] px-3 py-3 text-sm text-[#301508] outline-none placeholder:text-[#9b8d81] focus:border-[#301508]"
              />
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-[#fae8ca] p-3 text-sm leading-5 sm:col-span-2">
            <p className="font-bold">Pickup from</p>

            <p className="mt-1 text-[#715c4d]">
              {selectedShop
                ? `${selectedShop.name} · ${selectedShop.address}`
                : "Choose a shop above to see its address."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}