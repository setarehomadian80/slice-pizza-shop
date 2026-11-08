import Image from "next/image";

import { orderingSteps } from "@/constants/how-it-works";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      dir="ltr"
      aria-labelledby="how-it-works-title"
      className="bg-[#fff5e2] py-16 text-[#301508] sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Centered heading */}
        <div className="mx-auto max-w-[620px] text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a52817]">
            How ordering works
          </p>

          <h2
            id="how-it-works-title"
            style={{ fontFamily: "var(--font-shrikhand)" }}
            className="mt-3 text-[32px] leading-[1.08] tracking-tight sm:text-[42px] lg:text-[48px]"
          >
            Couch to slice in three steps
          </h2>
        </div>

        {/* Three illustrated steps */}
        <ol
          role="list"
          className="mt-12 grid list-none grid-cols-1 gap-x-8 gap-y-12 p-0 lg:mt-14 lg:grid-cols-3"
        >
          {orderingSteps.map((step) => (
            <li
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              {/* Illustration circle */}
              <div
                className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: step.backgroundColor,
                }}
              >
                <Image
                  src={step.image}
                  alt=""
                  width={96}
                  height={96}
                  sizes="96px"
                  className="h-24 w-24 object-contain"
                />

                {/* Step number */}
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-shrikhand)",
                  }}
                  className="absolute -left-1 -top-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#301508] text-[22px] leading-none text-[#fff5e2]"
                >
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 text-[23px] font-black leading-tight tracking-tight sm:text-2xl">
                {step.title}
              </h3>

              <p className="mt-3 max-w-[350px] text-base leading-[1.65] text-[#735b4b]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}