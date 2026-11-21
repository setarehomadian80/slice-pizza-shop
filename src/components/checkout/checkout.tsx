"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CheckoutCustomerDetails from "@/components/checkout/CheckoutCustomerDetails";
import CheckoutFulfillment from "@/components/checkout/CheckoutFulfillment";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import CheckoutPayment from "@/components/checkout/CheckoutPayment";
import CheckoutWhen, {
  type CheckoutSelectOption,
} from "@/components/checkout/CheckoutWhen";

import { checkoutPromoCodes, checkoutShops } from "@/constants/checkout";
import { calculateCheckoutTotals, findDeliveryZone } from "@/lib/checkout";
import { getScheduleDays } from "@/lib/checkout-schedule";
import { useCartStore } from "@/store/cart-store";
import { checkoutSchema } from "@/schemas/checkout.schema";
import type { CheckoutSchemaValues } from "@/schemas/checkout.schema";
import type {
  CheckoutCustomerDetails as CustomerDetails,
  CheckoutOrderType,
  CheckoutPaymentMethod,
  CheckoutTiming,
} from "@/types/checkout";

import { supportedDeliveryPostcodes } from "@/constants/checkout";

import { useRouter } from "next/navigation";
import { saveCheckoutReceipt } from "@/lib/checkout-receipt";
import { getItemImage } from "@/lib/cart-item-image";
import { useProducts } from "@/hooks/useProducts";
const timeOptions: CheckoutSelectOption[] = [
  { value: "12:15-12:30", label: "12:15 PM–12:30 PM" },
  { value: "12:45-1:00", label: "12:45 PM–1:00 PM" },
  { value: "1:15-1:30", label: "1:15 PM–1:30 PM" },
  { value: "1:45-2:00", label: "1:45 PM–2:00 PM" },
  { value: "2:15-2:30", label: "2:15 PM–2:30 PM" },
  { value: "2:45-3:00", label: "2:45 PM–3:00 PM" },
  { value: "3:15-3:30", label: "3:15 PM–3:30 PM" },
  { value: "3:45-4:00", label: "3:45 PM–4:00 PM" },
  { value: "4:15-4:30", label: "4:15 PM–4:30 PM" },
  { value: "4:45-5:00", label: "4:45 PM–5:00 PM" },
  { value: "5:15-5:30", label: "5:15 PM–5:30 PM" },
  { value: "5:45-6:00", label: "5:45 PM–6:00 PM" },
];

const defaultValues: CheckoutSchemaValues = {
  orderType: "delivery",
  shopId: checkoutShops[0]?.id ?? "",
  timing: "asap",
  deliveryDate: "",
  deliveryTime: "",
  postcode: "",
  customer: {
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    deliveryInstructions: "",
  },
  paymentMethod: "card",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvc: "",
};

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  const [postcodeVerified, setPostcodeVerified] = useState(false);
  const [postcodeMessage, setPostcodeMessage] = useState("");
  const [scheduleDays, setScheduleDays] = useState<CheckoutSelectOption[]>([]);
  const [promoMessage, setPromoMessage] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
const { data: products = [] } = useProducts();
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutSchemaValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
    mode: "onTouched",
  });

  const orderType = watch("orderType");
  const postcode = watch("postcode");
  const selectedShopId = watch("shopId");
  const timing = watch("timing");
  const selectedDate = watch("deliveryDate");
  const selectedTime = watch("deliveryTime");
  const customer = watch("customer");
  const paymentMethod = watch("paymentMethod");

  const cardDetails = {
    cardNumber: watch("cardNumber"),
    cardName: watch("cardName"),
    cardExpiry: watch("cardExpiry"),
    cardCvc: watch("cardCvc"),
  };

  const selectedShop = checkoutShops.find((shop) => shop.id === selectedShopId);

  const totals = useMemo(
    () =>
      calculateCheckoutTotals({
        items,
        orderType,
        postcode: postcodeVerified ? postcode : "",
      }),
    [items, orderType, postcode, postcodeVerified],
  );

  function handlePostcodeChange(value: string) {
    setValue("postcode", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setPostcodeVerified(false);
    setPostcodeMessage("");
    setOrderMessage("");
    clearErrors("postcode");
  }

  function handleCheckPostcode(value: string) {
    const zone = findDeliveryZone(value);

    if (!value.trim()) {
      setPostcodeVerified(false);
      setPostcodeMessage("Enter your ZIP code.");
      setError("postcode", {
        type: "manual",
        message: "Enter your ZIP code.",
      });
      return;
    }

    if (!zone) {
      const message =
        `Sorry, we don’t deliver to ${value.trim()} yet. ` +
        `You can still pick up from either shop. ` +
        `We deliver to: ${supportedDeliveryPostcodes.join(", ")}.`;

      setPostcodeVerified(false);
      setPostcodeMessage(message);
      setError("postcode", {
        type: "manual",
        message: "We don’t deliver to this ZIP code.",
      });
      return;
    }

    setPostcodeVerified(true);
    setPostcodeMessage(`Delivery available · ${zone.name}`);
    clearErrors("postcode");
  }

  function handleOrderTypeChange(nextType: CheckoutOrderType) {
    setValue("orderType", nextType, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setPostcodeVerified(false);
    setPostcodeMessage("");
    setOrderMessage("");
    clearErrors("postcode");
  }

  function handleTimingChange(nextTiming: CheckoutTiming) {
    setValue("timing", nextTiming, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setOrderMessage("");

    if (nextTiming === "scheduled" && scheduleDays.length === 0) {
      setScheduleDays(getScheduleDays());
    }

    if (nextTiming === "asap") {
      setValue("deliveryDate", "");
      setValue("deliveryTime", "");
    }
  }

  function handleCustomerChange(field: keyof CustomerDetails, value: string) {
    const nextCustomer = {
      ...customer,
      [field]: value,
    } as CustomerDetails;

    setValue("customer", nextCustomer, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setOrderMessage("");
  }

  function handleCardDetailsChange(
    field: keyof typeof cardDetails,
    value: string,
  ) {
    setValue(field, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setOrderMessage("");
  }

  function handleApplyPromo(code: string) {
    const isValid = checkoutPromoCodes.includes(
      code as (typeof checkoutPromoCodes)[number],
    );

    setPromoMessage(
      isValid
        ? `${code} is recognized. Discount calculation is not connected yet.`
        : `We couldn’t find the code ${code}.`,
    );
  }

  function placeOrder(values: CheckoutSchemaValues) {
    if (items.length === 0) {
      setOrderMessage("Your order is empty. Add items before checking out.");
      return;
    }

    if (values.orderType === "delivery" && !postcodeVerified) {
      setError("postcode", {
        type: "manual",
        message: "Check your ZIP code before placing the order.",
      });
      setPostcodeMessage("Check your ZIP code before placing the order.");
      return;
    }

    const finalTotals = calculateCheckoutTotals({
      items,
      orderType: values.orderType,
      postcode: values.orderType === "delivery" ? values.postcode : "",
    });

    const selectedShop = checkoutShops.find(
      (shop) => shop.id === values.shopId,
    );

    const receipt = {
      orderNumber: `SL-${Date.now().toString().slice(-8)}`,
      orderType: values.orderType,
      postcode: values.orderType === "delivery" ? values.postcode : "",
      shopName: selectedShop?.name ?? "",
      shopAddress: selectedShop?.address ?? "",
      timing: values.timing,
      deliveryDate: values.deliveryDate,
      deliveryTime: values.deliveryTime,
      customer: values.customer,
      paymentMethod: values.paymentMethod,
      cardLastFour:
        values.paymentMethod === "card"
          ? values.cardNumber.replace(/\D/g, "").slice(-4)
          : "",
      items: items.map((item) => ({
  ...item,
  image: getItemImage(item, products),
})),
      subtotalInPence: finalTotals.subtotalInPence,
      deliveryFeeInPence: finalTotals.deliveryFeeInPence ?? 0,
      totalInPence: finalTotals.totalInPence,
    };

    saveCheckoutReceipt(receipt);
    clearCart();
    router.push("/checkout/confirmation");
  }
  function handlePlaceOrder() {
    setOrderMessage("");
    void handleSubmit(placeOrder)();
  }

  return (
    <main className="min-h-screen bg-[#fff5e2] px-4 py-8 text-[#301508] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a52817]">
              Almost there
            </p>
            <h1 className="mt-1 font-[family-name:var(--font-shrikhand)] text-4xl leading-tight sm:text-5xl">
              Checkout
            </h1>
          </div>

          <Link
            href="/menu"
            className="text-sm font-bold text-[#715c4d] underline underline-offset-4 hover:text-[#c52c18]"
          >
            Back to menu
          </Link>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.9fr)] lg:gap-6">
          <div className="space-y-4">
            <CheckoutFulfillment
              orderType={orderType}
              onOrderTypeChange={handleOrderTypeChange}
              postcode={postcode}
              onPostcodeChange={handlePostcodeChange}
              postcodeVerified={postcodeVerified}
              postcodeMessage={postcodeMessage}
              selectedShopId={selectedShopId}
              onShopChange={(shopId) =>
                setValue("shopId", shopId, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              onCheckPostcode={handleCheckPostcode}
            />

            <CheckoutWhen
              timing={timing}
              onTimingChange={handleTimingChange}
              selectedDate={selectedDate}
              onDateChange={(date) =>
                setValue("deliveryDate", date, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              selectedTime={selectedTime}
              onTimeChange={(time) =>
                setValue("deliveryTime", time, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              scheduleDays={scheduleDays}
              availableTimes={timeOptions}
              asapAvailable={selectedShop?.asapAvailable ?? true}
              asapMessage={
                selectedShop?.asapMessage ??
                selectedShop?.openingMessage ??
                "Usually ready in about 20 minutes."
              }
              scheduleNote={
                orderType === "pickup"
                  ? `Times for ${selectedShop?.name ?? "your shop"}, including preparation time.`
                  : "Delivery times include preparation and travel time."
              }
            />

            <CheckoutCustomerDetails
              orderType={orderType}
              value={customer}
              onChange={handleCustomerChange}
              selectedShop={selectedShop}
              fieldErrors={{
                fullName: errors.customer?.fullName?.message,
                phone: errors.customer?.phone?.message,
                email: errors.customer?.email?.message,
                streetAddress: errors.customer?.streetAddress?.message,
              }}
            />

            <CheckoutPayment
              fieldErrors={{
                cardNumber: errors.cardNumber?.message,
                cardName: errors.cardName?.message,
                cardExpiry: errors.cardExpiry?.message,
                cardCvc: errors.cardCvc?.message,
              }}
              orderType={orderType}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={(method: CheckoutPaymentMethod) =>
                setValue("paymentMethod", method, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              cardDetails={cardDetails}
              onCardDetailsChange={handleCardDetailsChange}
            />

            {Object.keys(errors).length > 0 && (
              <p
                role="alert"
                className="rounded-xl bg-[#fce2dc] p-3 text-sm font-semibold text-[#b92312]"
              >
                Some information is missing or invalid. Check the highlighted
                fields.
              </p>
            )}
          </div>

          <div>
            <CheckoutOrderSummary
              items={items}
              orderType={orderType}
              subtotalInPence={totals.subtotalInPence}
              deliveryFeeInPence={totals.deliveryFeeInPence}
              totalInPence={totals.totalInPence}
              canPlaceOrder={items.length > 0}
              onEditOrder={() => {
                window.location.href = "/menu";
              }}
              onApplyPromo={handleApplyPromo}
              onPlaceOrder={handlePlaceOrder}
            />

            {promoMessage && (
              <p role="status" className="mt-2 text-sm font-semibold">
                {promoMessage}
              </p>
            )}

            {orderMessage && (
              <p
                role="status"
                className="mt-3 rounded-2xl bg-[#ffe4a3] p-3 text-sm font-semibold leading-5"
              >
                {orderMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
