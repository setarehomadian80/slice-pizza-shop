"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import FormCheckboxGroup from "@/components/catering/inquiry/FormCheckboxGroup";
import FormInput from "@/components/catering/inquiry/FormInput";
import FormRadioGroup from "@/components/catering/inquiry/FormRadioGroup";
import {
  cateringInquirySchema,
} from "@/schemas/catering-inquiry.schema";
import type { CateringInquirySchema } from "@/schemas/catering-inquiry.schema";
import type { CateringInquiryFormProps } from "@/types/catering-inquiry";

const orderTypeOptions = [
  { value: "delivery", label: "We’ll deliver" },
  { value: "pickup", label: "I’ll pick up" },
  { value: "mobile-oven", label: "Bring the mobile oven" },
] as const;

const dietaryOptions = [
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "halal", label: "Halal" },
  { value: "nut-allergy", label: "Nut allergy" },
] as const;

type CalculatorPrefill = {
  guests: number;
  summary: string;
};

export default function InquiryForm({
  initialValues,
  onSubmit,
}: CateringInquiryFormProps) {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CateringInquirySchema>({
    resolver: zodResolver(cateringInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: 10,
      date: "",
      foodAt: "",
      zipCode: "",
      dietaryNeeds: [],
      notes: "",
      contactConsent: false,
      ...initialValues,
    },
  });

  const orderType = useWatch({
    control,
    name: "orderType",
  });

  useEffect(() => {
    function handleCalculatorPrefill(event: Event) {
      const detail = (event as CustomEvent<CalculatorPrefill>).detail;

      if (!detail) return;

      setValue("guests", detail.guests, {
        shouldDirty: true,
        shouldValidate: true,
      });

      setValue("notes", detail.summary, {
        shouldDirty: true,
        shouldValidate: true,
      });

      requestAnimationFrame(() => {
        document
          .getElementById("catering-name")
          ?.focus({ preventScroll: true });
      });
    }

    window.addEventListener("catering:prefill", handleCalculatorPrefill);

    return () => {
      window.removeEventListener("catering:prefill", handleCalculatorPrefill);
    };
  }, [setValue]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[30px] border border-[#e4d7c5] bg-[#fffaf3] p-5 shadow-[0_10px_24px_rgba(48,21,8,0.08)] sm:p-8"
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <FormInput
          control={control}
          name="name"
          label="Your name"
          autoComplete="name"
          required
          className="sm:col-span-1"
        />

        <FormInput
          control={control}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
        />

        <FormInput
          control={control}
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          required
        />

        <FormInput
          control={control}
          name="guests"
          label="Number of guests"
          type="number"
          min={10}
          max={300}
          step={1}
          hint="10 to 300 people."
          required
        />

        <FormInput
          control={control}
          name="date"
          label="Date"
          type="date"
          required
        />

        <FormInput
          control={control}
          name="foodAt"
          label="Food at"
          type="time"
          min="11:00"
          max="22:00"
          hint="Between 11:00 AM and 10:00 PM."
          required
        />
      </div>

      <FormRadioGroup
        control={control}
        name="orderType"
        label="Delivery or pickup?"
        options={orderTypeOptions}
        className="mt-6"
      />

      {orderType === "delivery" && (
        <FormInput
          control={control}
          name="zipCode"
          label="ZIP code"
          autoComplete="postal-code"
          placeholder="e.g. 06511"
          required
          className="mt-5 max-w-sm"
        />
      )}

      <FormCheckboxGroup
        control={control}
        name="dietaryNeeds"
        label="Dietary needs"
        helperText="Check any that apply."
        options={dietaryOptions}
        className="mt-6"
      />

      <div className="mt-6">
        <label
          htmlFor="catering-notes"
          className="mb-2 block text-sm font-bold text-[#301508]"
        >
          Anything else?
        </label>

        <textarea
          id="catering-notes"
          rows={4}
          placeholder="Venue, budget, favorite pizzas, whether the boss hates olives…"
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "catering-notes-error" : undefined}
          className="w-full resize-y rounded-[16px] border-2 border-[#e5dacf] bg-[#fffaf3] px-4 py-3 text-sm text-[#301508] outline-none transition-colors placeholder:text-[#9b8d81] focus:border-[#301508]"
          {...register("notes")}
        />

        {errors.notes && (
          <p
            id="catering-notes-error"
            role="alert"
            className="mt-1.5 text-xs text-[#a52817]"
          >
            {errors.notes.message}
          </p>
        )}
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#301508]">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-[#1d6b3c]"
          {...register("contactConsent")}
        />
        <span>
          I’m happy for Crust Club to contact me about this inquiry.
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 min-h-12 rounded-full border-b-4 border-[#a51f12] bg-[#d42b15] px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#b92312] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d42b15] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}