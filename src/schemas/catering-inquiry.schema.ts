
import { z } from "zod";

const dietaryOptions = [
  "vegan",
  "vegetarian",
  "gluten-free",
  "halal",
  "nut-allergy",
] as const;

const orderTypes = [
  "delivery",
  "pickup",
  "mobile-oven",
] as const;

// Validate date with at least 2 days notice
function isValidEventDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const selectedDate = new Date(year, month - 1, day);

  if (
    selectedDate.getFullYear() !== year ||
    selectedDate.getMonth() !== month - 1 ||
    selectedDate.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minimumDate = new Date(today);
  minimumDate.setDate(minimumDate.getDate() + 2);

  return selectedDate >= minimumDate;
}

export const cateringInquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name.")
      .max(80, "Name is too long."),

    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),

    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number.")
      .max(20, "Phone number is too long.")
      .regex(
        /^\+?[0-9().\-\s]+$/,
        "Please enter a valid phone number."
      ),

    guests: z
      .number({
        error: "Please enter the number of guests.",
      })
      .int("Number of guests must be a whole number.")
      .min(1, "Minimum number of guests is 1.")
      .max(300, "Maximum number of guests is 300."),

    date: z
      .string()
      .min(1, "Please select an event date.")
      .refine(isValidEventDate, {
        message: "We need at least two days' notice.",
      }),

    foodAt: z
      .string()
      .min(1, "Please select a serving time.")
      .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Please enter a valid time."
      )
      .refine(
        (value) => value >= "11:00" && value <= "22:00",
        {
          message: "Food must be served between 11 AM and 10 PM.",
        }
      ),

    orderType: z.enum(orderTypes, {
      error: "Please select a delivery method.",
    }),

    zipCode: z.string().trim(),

    dietaryNeeds: z.array(z.enum(dietaryOptions)),

    notes: z
      .string()
      .max(1000, "Maximum 1000 characters allowed."),

    contactConsent: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.orderType === "delivery") {
      if (!data.zipCode) {
        ctx.addIssue({
          code: "custom",
          path: ["zipCode"],
          message: "Delivery ZIP code is required.",
        });
      } else if (!/^\d{5}(-\d{4})?$/.test(data.zipCode)) {
        ctx.addIssue({
          code: "custom",
          path: ["zipCode"],
          message: "Please enter a valid ZIP code.",
        });
      }
    }
  });

export type CateringInquirySchema = z.infer<
  typeof cateringInquirySchema
>;

export type CateringDietaryOption = (typeof dietaryOptions)[number];

export type CateringOrderType = (typeof orderTypes)[number];
