"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Menu,
  X,
  ShoppingBag,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import { useCartStore } from "@/store/cart-store";

const navigation = [
  { title: "Menu", href: "/menu" },
  { title: "Deals", href: "/deals" },
  { title: "Locations", href: "/locations" },
  { title: "Catering", href: "/catering" },
  { title: "Our story", href: "/about" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalQuantity = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      <div
        className="
          flex w-full items-center justify-center gap-x-2
          bg-[#291109] px-2 py-2
          text-center text-[12px] font-semibold text-white
          sm:gap-x-3 md:gap-x-4 md:text-[14px]
        "
      >
        <span>Free delivery over £35</span>

        <Star
          size={13}
          aria-hidden="true"
          className="hidden shrink-0 text-[#ffc23a] md:block"
        />

        <span className="hidden md:block">48-hour sourdough</span>

        <Star
          size={13}
          aria-hidden="true"
          className="shrink-0 text-[#ffc23a]"
        />

        <span>Ancoats &amp; Chorlton</span>
      </div>

      {/* Main Header */}
      <div className="border-b border-[#eadfce] bg-[#fff4e2]">
        <div
          className="
            mx-auto flex h-[72px] max-w-7xl
            items-center justify-between
            px-4 sm:px-6 lg:h-20 lg:px-8
          "
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Crust Club home"
            className="flex shrink-0 items-center!"
          >
            <Image
              src="/image/hero-pizza.svg"
              alt=""
              width={40}
              height={40}
            />

            <span
              style={{ fontFamily: "var(--font-shrikhand)" }}
              className="
                text-[20px] font-black leading-none
                tracking-tight text-[#cc2a16] sm:text-2xl
              "
            >
              CRUST CLUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-4 lg:flex xl:gap-6"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  whitespace-nowrap text-xs font-semibold
                  text-[#2a1209] transition-colors duration-200
                  hover:text-[#cc2a16] xl:text-sm
                "
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Delivery / Pickup */}
            <Link
              href="/menu"
              className="
                hidden items-center gap-2 px-5 py-3
                text-sm font-bold text-[#6b4a3a] lg:flex
              "
            >
              Delivery or pickup?
              <MapPin aria-hidden="true" />
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              aria-label={`Your order, ${totalQuantity} ${
                totalQuantity === 1 ? "item" : "items"
              }`}
              className="
                flex items-center gap-2 rounded-full
                bg-[#cc2a16] px-3 py-3
                text-xs font-bold text-white
                transition-colors hover:bg-[#94190b]
                sm:px-4 sm:text-sm
              "
            >
              <ShoppingBag size={16} aria-hidden="true" />

              <span>
                Order{" "}
                <span aria-live="polite" aria-atomic="true">
                  {totalQuantity}
                </span>
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full border border-[#eadfce]
                bg-[#fae7c8] text-[#2a1209]
                transition-colors hover:bg-[#f5e8d6]
                lg:hidden
              "
            >
              {isMenuOpen ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsMenuOpen(false);
            }
          }}
          className="
            absolute left-0 top-full w-full
            border-b border-[#eadfce] bg-[#fff4e2]
            px-5 py-4 shadow-lg lg:hidden
          "
        >
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ fontFamily: "var(--font-shrikhand)" }}
                onClick={() => setIsMenuOpen(false)}
                className="
                  rounded-lg border-b-2 border-dotted
                  border-gray-400 px-4 py-3
                  text-[18px] text-[#2a1209]
                  transition-colors
                  hover:bg-[#f5e8d6] hover:text-[#cc2a16]
                "
              >
                {item.title}
              </Link>
            ))}

            <Link
              href="/menu"
              onClick={() => setIsMenuOpen(false)}
              className="
                mt-3 flex items-center justify-center gap-2
                rounded-full bg-[#cc2a16] px-5 py-3
                text-sm font-bold text-white
                hover:bg-[#94190b]
              "
            >
              Order now
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}