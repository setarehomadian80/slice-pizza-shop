import Image from "next/image";

export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-[#cc2a16] text-[#fff6e3]"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-5 pb-14 pt-14 sm:gap-8 sm:px-8 sm:pb-16 sm:pt-16 lg:h-[420px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-0">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.18em]">
            Our story
          </p>

          <h1
            id="about-title"
            className="mt-4 max-w-[700px] font-[family-name:var(--font-shrikhand)] text-[42px] leading-[1.05] sm:text-5xl xl:text-6xl"
          >
            A dough company that happens to make pizza
          </h1>

          <p className="mt-5 max-w-[570px] text-base leading-7 text-[#fff6e3]/90 sm:text-lg sm:leading-8">
            Crust Club started in 2016 with a borrowed horse trailer, a
            second-hand oven and a jar of sourdough starter. Ten years on, the
            starter is still going. So are we.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="hidden lg:block
          relative mx-auto h-[250px] w-full max-w-[360px] sm:h-[320px] sm:max-w-[420px] lg:h-[340px] lg:max-w-[460px]"
        >
          <Image
            src="/image/veg-out.png"
            alt=""
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 460px"
            className="object-contain drop-shadow-[0_18px_18px_rgba(48,21,8,0.22)]"
            priority
          />

          <span className="absolute right-[10%] top-[15%] h-8 w-5 rotate-[-25deg] rounded-[100%_0_100%_0] bg-[#278447]" />

          <span className="absolute bottom-[19%] left-[7%] grid size-9 rotate-[-18deg] place-items-center rounded-full bg-[#ee765e] text-sm text-[#cc2a16]">
            ✿
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-4 bg-[radial-gradient(circle_at_16px_16px,#fff5e2_15px,transparent_16px)] bg-[length:32px_32px]"
      />
    </section>
  );
}