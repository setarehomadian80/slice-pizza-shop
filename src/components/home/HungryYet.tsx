
import Link from "next/link";

export default function HungryYet() {
  return (
    <section
      dir="ltr"
      aria-labelledby="hungry-title"
       className="w-full bg-[#fff5e2] pt-0 pb-16 text-[#fff5e2] sm:pb-20 md:pt-8 lg:pt-0 lg:pb-28"

    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        <div className="overflow-hidden rounded-[28px]">

          {/* Top checker border */}
          <div
            aria-hidden="true"
            className="h-3 sm:h-4"
            style={{
              backgroundImage:
                "repeating-conic-gradient(#ffe5cf 0% 25%, #d42b15 0% 50%)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* CTA Content */}
          <div className="flex flex-col items-center bg-[#d42b15] px-5 py-10 text-center sm:px-8 sm:py-12 lg:py-14">

            <h2
              id="hungry-title"
              style={{
                fontFamily: "var(--font-shrikhand)",
              }}
              className="text-[32px] leading-[1.1] tracking-tight sm:text-[40px] lg:text-[44px]"
            >
              Hungry yet?
            </h2>

            <p className="mt-4 max-w-[530px] text-base leading-7">
              The ovens are hot until late. Your first order? Use
              <br className="hidden sm:block" />

              <span className="mx-1 inline-block rounded-md bg-[#a82012] px-2 font-black text-white">
                FIRSTSLICE
              </span>

              for $5 off.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">

              <Link
                href="#menu"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border-b-4 border-[#d69b17] bg-[#ffc43d] px-7 text-sm font-black text-[#301508] transition-all hover:translate-y-[2px] hover:border-b-2"
              >
                Order now
              </Link>

              <Link
                href="#deals"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border-b-4 border-[#a71d10] bg-[#fff5e2] px-7 text-sm font-black text-[#301508] transition-all hover:translate-y-[2px] hover:border-b-2"
              >
                See deals
              </Link>

            </div>
          </div>

          {/* Bottom checker border */}
          <div
            aria-hidden="true"
            className="h-3 sm:h-4"
            style={{
              backgroundImage:
                "repeating-conic-gradient(#ffe5cf 0% 25%, #d42b15 0% 50%)",
              backgroundSize: "32px 32px",
            }}
          />

        </div>
      </div>
    </section>
  );
}
