
import Link from "next/link";
import { ArrowUp, Pizza } from "lucide-react";

import {
  footerLocations,
  footerLinks,
  footerSocialLinks,
} from "@/constants/footer";

export default function Footer() {
  return (
    <footer
      dir="ltr"
      className="relative w-full bg-[#2b1009] text-[#fff5e2]"
    >
      {/* Checkerboard */}
      <div
        aria-hidden="true"
        className="h-4 w-full sm:h-5"
        style={{
          backgroundImage:
            "repeating-conic-gradient(#ffe5cf 0% 25%, #d42b15 0% 50%)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main Footer */}
      <div className="mx-auto max-w-[1544px] px-5 py-12 sm:px-8 sm:py-14 lg:px-8 lg:py-16">
        <div
          className="
            grid grid-cols-1 gap-y-10
            sm:grid-cols-2 sm:gap-x-8
            md:grid-cols-2
            lg:grid-cols-[1.45fr_1fr_1fr_0.8fr_1.35fr]
            lg:gap-x-4
            xl:gap-x-8
          "
        >
          {/* Brand */}
          <div className="min-w-0 sm:col-span-2 md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Crust Club home"
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d42b15] xl:h-12 xl:w-12">
                <Pizza
                  size={29}
                  strokeWidth={2.5}
                  className="text-[#ffc43d]"
                />
              </span>

              <span
                style={{ fontFamily: "var(--font-shrikhand)" }}
                className="text-[25px] leading-none text-[#fff5e2] xl:text-[29px]"
              >
                Crust Club
              </span>
            </Link>

            <p className="max-w-[340px] text-[13px] leading-[1.9] text-[#f2e4d7] xl:text-[15px]">
              Sourdough pizza from two little shops in New Haven. Dough made
              daily, left alone for 48 hours, baked in 90 seconds.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3 xl:gap-x-6">
              {footerSocialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-[12px] font-black text-[#fff5e2] transition-colors hover:text-[#ffc43d] xl:text-sm"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Wooster Square */}
          <div className="min-w-0">
            <h3 className="mb-4 text-[14px] font-black text-[#ffc43d] xl:text-[17px]">
              {footerLocations[0].name}
            </h3>

            <div className="space-y-1.5 text-[12px] leading-6 text-[#f2e4d7] xl:text-[15px]">
              <p>{footerLocations[0].address}</p>
              <p>{footerLocations[0].city}</p>

              <a
                href={`tel:${footerLocations[0].phone.replace(/[^\d+]/g, "")}`}
                className="block font-black text-white hover:text-[#ffc43d]"
              >
                {footerLocations[0].phone}
              </a>

              <p className="flex flex-wrap items-center gap-2 pt-1 font-black text-white">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2ca66a]" />
                Open until {footerLocations[0].openUntil}
              </p>
            </div>
          </div>

          {/* Westville */}
          <div className="min-w-0">
            <h3 className="mb-4 text-[14px] font-black text-[#ffc43d] xl:text-[17px]">
              {footerLocations[1].name}
            </h3>

            <div className="space-y-1.5 text-[12px] leading-6 text-[#f2e4d7] xl:text-[15px]">
              <p>{footerLocations[1].address}</p>
              <p>{footerLocations[1].city}</p>

              <a
                href={`tel:${footerLocations[1].phone.replace(/[^\d+]/g, "")}`}
                className="block font-black text-white hover:text-[#ffc43d]"
              >
                {footerLocations[1].phone}
              </a>

              <p className="flex flex-wrap items-center gap-2 pt-1 font-black text-white">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2ca66a]" />
                Open until {footerLocations[1].openUntil}
              </p>
            </div>
          </div>

          {/* Eat */}
          <div className="min-w-0">
            <h3 className="mb-4 text-[14px] font-black text-[#ffc43d] xl:text-[17px]">
              Eat
            </h3>

            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-[#f2e4d7] transition-colors hover:text-[#ffc43d] xl:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="min-w-0 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="mb-4 text-[14px] font-black text-[#ffc43d] xl:text-[17px]">
              The Pizza Post
            </h3>

            <p className="mb-5 text-[12px] leading-6 text-[#f2e4d7] xl:text-[15px]">
              New specials and the odd free garlic knot, every other week.
            </p>

            <form
              action="#"
              method="get"
              className="flex w-full flex-col gap-3"
            >
              <label htmlFor="footer-email" className="sr-only">
                Your email address
              </label>

              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="h-[54px] w-full min-w-0 rounded-[18px] border-2 border-[#60483d] bg-[#42291f] px-4 text-[13px] text-white outline-none placeholder:text-[#c7afa0] focus:border-[#ffc43d] xl:h-[62px] xl:text-[15px]"
              />

              <button
                type="submit"
                className="h-[54px] w-full rounded-full border-b-4 border-[#d69b17] bg-[#ffc43d] text-sm font-black text-[#301508] transition-all hover:translate-y-[2px] hover:border-b-2 hover:bg-[#ffcf55] xl:h-[62px] xl:text-base"
              >
                Sign me up
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#60483d]/70">
        <div
          className="
            mx-auto flex max-w-[1544px]
            flex-col justify-between gap-4
            px-5 py-6
            text-[11px] text-[#f2e4d7]
            sm:px-8
            lg:flex-row lg:items-center
            xl:text-[13px]
          "
        >
          <p className="leading-6">
            © 2026 Crust Club Pizza LLC. Allergen info on the menu: ask us if
            you’re unsure.
          </p>

          <p className="leading-6">
            Crust Club is a fictional pizzeria. Template by Freeframe.
          </p>
        </div>
      </div>

      {/* Back To Top */}
      <Link
        href="#top"
        aria-label="Back to top"
        className="
          fixed bottom-6 right-6 z-50
          flex h-14 w-14 items-center justify-center
          rounded-full border-b-4 border-[#d69b17]
          bg-[#ffc43d] text-[#301508]
          shadow-md transition-all
          hover:-translate-y-1 hover:border-b-2
        "
      >
        <ArrowUp size={23} strokeWidth={2.5} />
      </Link>
    </footer>
  );
}
