import Image from "next/image";
import { Rubik, Shrikhand } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function LocationsHero() {
  return (
    <section
      aria-labelledby="locations-title"
      className={`${rubik.className} relative w-full overflow-hidden bg-[#1d6b3c] pb-20 pt-12 text-[#fff6e3] sm:pt-16`}
      style={{
        mask: "radial-gradient(22px at 50% 100%, transparent 98%, #000) 50% / 44px 100%",
        WebkitMask:
          "radial-gradient(22px at 50% 100%, transparent 98%, #000) 50% / 44px 100%",
      }}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em]">
            Locations &amp; delivery
          </p>

          <h1
            id="locations-title"
            className={`${shrikhand.className} mt-3 text-[2.75rem] font-normal leading-[1.02] tracking-[-0.01em] sm:text-6xl sm:leading-[1.02] lg:text-7xl lg:leading-[1.02]`}
          >
            Two shops, one
            <br className="hidden sm:block" />
            {" "}dough
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed">
            Wooster Square looks after downtown and the east side; Westville
            covers the west side and West Haven. Check your ZIP code to see
            which shop delivers to you, how much it costs and how long it takes.
          </p>
        </div>

        <div className="hidden lg:block" aria-hidden="true">
          <div className="relative mx-auto h-72 w-full max-w-md">
            <Image
              src="/image/vegan-diavola.png"
              alt=""
              width={256}
              height={256}
              priority
              className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}