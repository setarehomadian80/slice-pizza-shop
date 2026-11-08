import Link from "next/link";

import { doughContent, doughStats } from "@/constants/dough";

export default function DoughSection() {
  return (
    <section
      id="the-dough"
      dir="ltr"
      aria-labelledby="dough-title"
      className="bg-[#20683e] py-16 text-[#fff5e2] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Story */}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffeba8]">
              {doughContent.eyebrow}
            </p>

            <h2
              id="dough-title"
              style={{ fontFamily: "var(--font-shrikhand)" }}
              className="mt-3 max-w-[580px] text-[38px] leading-[1.08] tracking-tight sm:text-[48px] lg:text-[56px]"
            >
              {doughContent.title}
            </h2>

            <p className="mt-7 max-w-[550px] text-base leading-[1.65] text-[#f0e8d4] sm:text-lg">
              {doughContent.description}
            </p>

            <Link
              href={doughContent.linkHref}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border-b-4 border-[#d7a123] bg-[#ffca38] px-6 py-3 text-sm font-extrabold text-[#301508] transition-colors hover:bg-[#ffda69] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffca38]"
            >
              {doughContent.linkLabel}
            </Link>
          </div>

          {/* Four facts */}
          <ul
            role="list"
            className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4"
          >
            {doughStats.map((stat) => (
              <li
                key={stat.id}
                className="h-full rounded-[24px] bg-white/[0.08] p-4 sm:p-6"
              >
                <p
                  style={{
                    fontFamily: "var(--font-shrikhand)",
                  }}
                  className="whitespace-nowrap text-[34px] leading-none tracking-tight text-[#ffca38] sm:text-[44px] lg:text-[48px]"
                >
                  {stat.value}
                </p>

                <p className="mt-3 text-sm font-bold leading-6 text-[#fff5e2] sm:text-base">
                  {stat.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}