import { z } from "zod";

import {
  checkoutDeliveryZones,
  supportedDeliveryPostcodes,
} from "@/constants/checkout";

const customerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),

  phone: z
    .string()
    .trim()
    .refine(
      (value) => value.replace(/\D/g, "").length === 10,
      "Enter a valid 10-digit phone number.",
    ),

  email: z.string().trim().email("Enter a valid email address."),
  streetAddress: z.string(),
  deliveryInstructions: z.string(),
});

export const checkoutSchema = z
  .object({
    orderType: z.enum(["delivery", "pickup"]),
    shopId: z.string(),

    timing: z.enum(["asap", "scheduled"]),
    deliveryDate: z.string(),
    deliveryTime: z.string(),

    postcode: z.string(),
    customer: customerSchema,

    paymentMethod: z.enum(["card", "rider"]),
    cardNumber: z.string(),
    cardName: z.string(),
    cardExpiry: z.string(),
    cardCvc: z.string(),
  })
  .superRefine((values, context) => {
    if (values.orderType === "delivery") {
      const postcode = values.postcode.replace(/\s/g, "").toUpperCase();

      if (!postcode) {
        context.addIssue({
          code: "custom",
          path: ["postcode"],
          message: "Enter your ZIP code.",
        });
      } else if (
        !checkoutDeliveryZones.some((zone) => zone.postcodes.includes(postcode))
      ) {
        context.addIssue({
          code: "custom",
          path: ["postcode"],
          message: `We don’t deliver to this ZIP code. Try: ${supportedDeliveryPostcodes.join(", ")}.`,
        });
      }

      if (values.customer.streetAddress.trim().length < 4) {
        context.addIssue({
          code: "custom",
          path: ["customer", "streetAddress"],
          message: "Enter your street address.",
        });
      }
    }

    if (values.orderType === "pickup" && !values.shopId) {
      context.addIssue({
        code: "custom",
        path: ["shopId"],
        message: "Choose a pickup shop.",
      });
    }

    if (
      values.timing === "scheduled" &&
      (!values.deliveryDate || !values.deliveryTime)
    ) {
      context.addIssue({
        code: "custom",
        path: ["deliveryDate"],
        message: "Choose a day and time for your order.",
      });
    }

    if (values.paymentMethod === "card") {
      const cardDigits = values.cardNumber.replace(/\D/g, "");

      if (cardDigits.length !== 16) {
        context.addIssue({
          code: "custom",
          path: ["cardNumber"],
          message: "Enter exactly 16 digits.",
        });
      }

      if (!values.cardName.trim()) {
        context.addIssue({
          code: "custom",
          path: ["cardName"],
          message: "Enter the name on your card.",
        });
      }

      // فاصله‌های نمایشی حذف می‌شوند؛ مثلاً «02 / 05» به «02/05».
      const expiry = values.cardExpiry.replace(/\s/g, "");
      const expiryMatch = expiry.match(/^(\d{2})\/(\d{2})$/);

      if (!expiryMatch) {
        context.addIssue({
          code: "custom",
          path: ["cardExpiry"],
          message: "Enter the date as MM/YY.",
        });
      } else {
        const month = Number(expiryMatch[1]);

        if (month < 1 || month > 12) {
          context.addIssue({
            code: "custom",
            path: ["cardExpiry"],
            message: "Enter a month between 01 and 12.",
          });
        }
      }

      const cvcDigits = values.cardCvc.replace(/\D/g, "");

      if (cvcDigits.length < 3 || cvcDigits.length > 4) {
        context.addIssue({
          code: "custom",
          path: ["cardCvc"],
          message: "Enter 3 or 4 digits.",
        });
      }
    }
  });

export type CheckoutSchemaValues = z.infer<typeof checkoutSchema>;
