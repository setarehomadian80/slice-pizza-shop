import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { locations } from "@/constants/locations";

export default function ComeSayHello() {
  return (
    <section
      id="locations"
      dir="ltr"
      aria-labelledby="locations-title"
      className="w-full bg-[#fff5e2] pt-0 pb-16 text-[#301508] sm:pb-20 md:pt-8 lg:pt-0 lg:pb-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a52817]">
              Two shops
            </p>

            <h2
              id="locations-title"
              style={{ fontFamily: "var(--font-shrikhand)" }}
              className="mt-3 text-[32px] leading-[1.1] tracking-tight sm:text-[40px] lg:text-[44px]"
            >
              Come say hello
            </h2>
          </div>

          <Link
            href="#delivery-map"
            className="group inline-flex w-fit items-center gap-2 border-b border-[#a52817] pb-1 text-sm font-black text-[#a52817] transition-colors hover:text-[#d42b15]"
          >
            Delivery zones &amp; map
            <ArrowRight
              size={17}
              strokeWidth={2.5}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Location Cards */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          {locations.map((location) => (
            <article
              key={location.id}
              className="flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-[#e6dfd3] bg-[#fffcf5] shadow-[0_12px_20px_-10px_rgba(48,21,8,0.28)]"
            >
              {/* Card Header */}
              <div className="flex min-h-[76px] flex-nowrap items-center justify-between gap-2 bg-[#301508] px-4 py-4 sm:px-7 lg:px-4 xl:px-7">
                <h3
                  style={{ fontFamily: "var(--font-shrikhand)" }}
                  className="min-w-0 truncate text-[22px] leading-tight text-[#fff5e2] sm:text-[29px] lg:text-[22px] xl:text-[29px]"
                >
                  {location.name}
                </h3>

                <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#493024] px-2.5 py-2 lg:px-2 xl:gap-2 xl:px-3.5">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2ca66a]" />

                  <span className="whitespace-nowrap text-[11px] font-black text-white xl:text-sm">
                    Open until {location.openUntil}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-5 xl:p-7">
                {/* Address */}
                <p className="text-[13px] font-extrabold leading-6 sm:text-base lg:text-[13px] xl:text-base">
                  {location.address}
                </p>

                {/* Today */}
                <p className="mt-2 text-[13px] text-[#735b4b] sm:text-base lg:text-[13px] xl:text-base">
                  Today:{" "}
                  <span className="font-black text-[#301508]">
                    {location.todayHours}
                  </span>
                </p>

                {/* Description */}
                <p className="mt-5 text-[13px] leading-[1.8] text-[#735b4b] sm:text-base lg:text-[13px] xl:text-base">
                  {location.description}
                </p>

                {/* Actions */}
                <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-7 xl:gap-3">
                  <Link
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full border-2 border-[#60483d] px-3.5 text-xs font-black text-[#301508] transition-colors hover:bg-[#301508] hover:text-white sm:px-5 sm:text-sm lg:px-3 lg:text-xs xl:px-5 xl:text-sm"
                  >
                    Hours &amp; map
                  </Link>

                  <Link
                    href={location.orderUrl}
                    className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-1.5 rounded-full border-b-4 border-[#a71d10] bg-[#d42b15] px-3.5 text-xs font-black text-white transition-all hover:translate-y-[2px] hover:border-b-2 hover:bg-[#c82315] sm:px-5 sm:text-sm lg:px-3 lg:text-xs xl:px-5 xl:text-sm"
                  >
                    Order from {location.name}
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
