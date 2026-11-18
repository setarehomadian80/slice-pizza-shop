import Image from "next/image";
import { Rubik, Shrikhand } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"], display: "swap" });

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function DealsHero() {
  return (
    <section
      dir="ltr"
      aria-labelledby="deals-title"
      className={`${rubik.className} relative w-full overflow-hidden bg-[#ffc23a] pb-20 pt-12 text-[#2a1209] sm:pt-16`}
      style={{
        mask: "radial-gradient(22px at 50% 100%, transparent 98%, #000) 50% / 44px 100%",
        WebkitMask:
          "radial-gradient(22px at 50% 100%, transparent 98%, #000) 50% / 44px 100%",
      }}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em]">
            Deals
          </p>

          <h1
            id="deals-title"
            className={`${shrikhand.className} mt-3 text-[2.75rem] font-normal leading-[1.02] tracking-[-0.01em] sm:text-6xl sm:leading-[1.02] lg:text-7xl lg:leading-[1.02]`}
          >
            More pizza, less money
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed">
            Three set deals that never change, and a bundle builder for when you
            know exactly what everyone wants. Add a promo code on top of menu
            items.
          </p>
        </div>

        <div className="hidden lg:block" aria-hidden="true">
          <div className="relative mx-auto h-72 w-full max-w-md">
            <Image
              src="/image/Hot-Honey.png"
              alt=""
              width={208}
              height={208}
              className="absolute left-4 top-6 size-52 -rotate-6 object-contain drop-shadow-[0_20px_20px_rgba(110,70,0,0.35)]"
            />

            <Image
              src="/image/the-controversial-one.png"
              alt=""
              width={176}
              height={176}
              className="absolute right-6 top-0 size-44 rotate-12 object-contain drop-shadow-[0_20px_20px_rgba(110,70,0,0.35)]"
            />

            <div className="pointer-events-none absolute bottom-0 right-0 size-28 -rotate-6">
              <Image
                src="/image/marinara.png"
                alt=""
                width={112}
                height={112}
                className="size-full object-contain motion-safe:animate-[spin_18s_linear_infinite]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}