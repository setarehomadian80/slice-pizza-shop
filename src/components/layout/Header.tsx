"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Menu, X, ShoppingBag, ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

const navigation = [
  { title: "Menu", href: "/menu" },
  { title: "Deals", href: "/deals" },
  { title: "Locations", href: "/locations" },
  { title: "Catering", href: "/catering" },
  { title: "Our story", href: "/about" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      <div
        className="
          flex w-full items-center justify-center
          gap-x-2
          bg-[#291109]
          px-2 py-2
          text-center 
          text-[12px]
          md:text-[14px]
          font-semibold text-white
          sm:gap-x-3 sm:text-xs
          md:gap-x-4 md:text-sm
        "
      >
        <span>Free delivery over £35</span>

        <Star
          size={13}
          className="hidden 
          shrink-0
          text-[#ffc23a]
           md:block"
        />

        <span className="hidden md:block">48-hour sourdough</span>

        <Star
          size={13}
          className="shrink-0
          text-[#ffc23a]"
        />

        <span>Ancoats & Chorlton</span>
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
          <Link href="/" 
          className="flex
          items-center 
          shrink-0">
          <Image 
          src="/image/hero-pizza.svg"
          alt=""
          width={40}
          height={40}
          />
            <span 
            style={{ fontFamily: "var(--font-shrikhand)" }}
            className="
            text-[20px] 
            font-black 
            leading-none 
            tracking-tight 
            text-[#cc2a16] 
            sm:text-2xl">
              CRUST CLUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  whitespace-nowrap text-xs font-semibold
                  text-[#2a1209]
                  transition-colors duration-200
                  hover:text-[#cc2a16]
                  xl:text-sm
                "
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Order Button */}
            <Link
              href="/cart"
              className="
                flex items-center gap-2
                rounded-full
                px-3 py-3
                text-xs font-bold text-white
                sm:px-4 sm:text-sm
                bg-[#cc2a16]
              "
            >
              <ShoppingBag size={16} />
              <span>Order 0</span>
            </Link>

            {/* Desktop Order Now */}
            <Link
              href="/menu"
              className="
                hidden items-center gap-2
                px-5 py-3
                text-sm font-bold
                lg:flex
                text-[#6b4a3a]
              "
            >
              Delivery or pickup?
              <MapPin />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="
              bg-[#fae7c8]
                flex h-10 w-10 items-center justify-center
                rounded-full border border-[#eadfce]
                text-[#2a1209]
                transition-colors hover:bg-[#f5e8d6]
                lg:hidden
              "
            >
              {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="
            absolute left-0 top-full w-full
            border-b border-[#eadfce]
            bg-[#fff4e2]
            px-5 py-4 shadow-lg
            lg:hidden
          "
        >
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
              style={{ fontFamily: "var(--font-shrikhand)" }}
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="
                  rounded-lg px-4 py-3
                  text-[18px] 
                   text-[#2a1209]
                  transition-colors 
                  hover:bg-[#f5e8d6]
                  hover:text-[#cc2a16]
                  border-b-2 border-dotted
                  border-gray-400
                "
              >
                {item.title}
              </Link>
            ))}

            <Link
              href="/menu"
              onClick={() => setIsMenuOpen(false)}
              className="
                mt-3 flex items-center
                justify-center gap-2
                rounded-full 
                bg-[#cc2a16]
                px-5 py-3
                text-sm font-bold
                text-white
                hover:bg-[#94190b]
              "
            >
              Order now
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
