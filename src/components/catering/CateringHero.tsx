import Image from "next/image";

export default function CateringHero() {
  return (
    <section
      aria-labelledby="catering-title"
      className="relative overflow-hidden bg-[#1d6b3c] text-[#fff6e3]"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-5 px-5 py-10 sm:gap-6 sm:px-8 sm:py-12 md:gap-8 md:py-10 lg:h-[420px] lg:grid-cols-[1.1fr_0.9fr] lg:py-0">
        <div className="relative z-10 max-w-xl md:col-span-full md:max-w-none lg:col-span-1 lg:max-w-xl">
          <p className="text-xs font-black uppercase tracking-[0.18em]">
            Catering &amp; party orders
          </p>

          <h1
            id="catering-title"
            className="mt-3 font-[family-name:var(--font-shrikhand)] text-4xl leading-[1.05] sm:mt-4 sm:text-5xl lg:text-[60px]"
          >
            Party pizza,
            <br />
            handled
          </h1>

          <p className="mt-4 max-w-[540px] text-sm leading-6 text-[#fff6e3]/90 sm:mt-5 sm:text-base sm:leading-7 md:max-w-none lg:max-w-[540px]">
            Office lunches, birthdays, wrap parties and the odd wedding. We
            deliver hot, labeled boxes for 10 to 300 people, with vegan and
            gluten-free covered.
          </p>

          <a
            href="#enquiry"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-b-4 border-[#c58b13] bg-[#ffca38] px-6 py-2.5 text-sm font-extrabold text-[#301508] transition-colors hover:bg-[#ffdb70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffca38] sm:mt-6"
          >
            Send an inquiry
          </a>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto hidden h-[300px] w-full max-w-[420px] lg:col-span-1 lg:block"
        >
          <div className="absolute left-[12%] top-[42%] h-[90px] w-[68%] rotate-[-3deg] rounded-[14px] border-b-[6px] border-[#c58b13] bg-[#edc783]" />

          <div className="absolute left-[16%] top-[29%] h-[90px] w-[68%] rotate-[2deg] rounded-[14px] border-b-[6px] border-[#c58b13] bg-[#f2d092]" />

          <div className="absolute left-[10%] top-[15%] z-10 flex h-[90px] w-[68%] -rotate-1 items-center justify-center rounded-[14px] border-b-[6px] border-[#c58b13] bg-[#f7dba8]">
            <span className="font-[family-name:var(--font-shrikhand)] text-2xl text-[#c52c18]">
              Crust Club
            </span>
          </div>

          <div className="absolute bottom-[2%] right-[3%] h-[170px] w-[170px]">
            <Image
              src="/image/veg-out.png"
              alt=""
              fill
              sizes="170px"
              className="object-contain drop-shadow-[0_12px_12px_rgba(20,10,4,0.25)]"
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-4 bg-[radial-gradient(circle_at_16px_16px,#fff5e2_15px,transparent_16px)] bg-[length:32px_32px]"
      />
    </section>
  );
}