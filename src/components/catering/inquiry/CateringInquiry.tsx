"use client";

import InquiryForm from "@/components/catering/inquiry/InquiryForm";
import type { CateringInquirySchema } from "@/schemas/catering-inquiry.schema";

export default function CateringInquiry() {
  async function handleInquirySubmit(
    _values: CateringInquirySchema,
  ): Promise<void> {
    // API ارسال فرم هنوز وصل نشده است.
  }

  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-title"
      className="scroll-mt-24 bg-[#fff5e2] px-5 py-12 text-[#301508] sm:px-8 sm:py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <div className="max-w-md">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a52817]">
            Inquiry
          </p>

          <h2
            id="enquiry-title"
            className="mt-3 font-[family-name:var(--font-shrikhand)] text-4xl leading-tight sm:text-5xl"
          >
            Tell us about your party
          </h2>

          <p className="mt-4 text-base leading-7 text-[#715c4d]">
            We need at least two days’ notice. Our events team replies within
            one business day with a menu and a fixed quote.
          </p>

          <ul className="mt-6 space-y-3">
            <li>
              <a
                href="mailto:events@crustclub.example"
                className="inline-flex items-center gap-3 text-sm font-bold hover:underline"
              >
                <CheckIcon />
                events@crustclub.example
              </a>
            </li>

            <li>
              <a
                href="tel:+12035550118"
                className="inline-flex items-center gap-3 text-sm font-bold hover:underline"
              >
                <CheckIcon />
                (203) 555-0118 (ask for Bea)
              </a>
            </li>
          </ul>
        </div>

        <InquiryForm onSubmit={handleInquirySubmit} />
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1d6b3c] text-xs font-black text-white"
    >
      ✓
    </span>
  );
}