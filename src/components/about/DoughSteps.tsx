import { Clock3, Flame, GlassWater, Soup } from "lucide-react";

const doughSteps = [
  {
    number: "01",
    title: "Feed Big Brenda",
    description:
      "Our starter gets flour and water at 7 AM every day. By lunchtime she’s bubbly and ready.",
    Icon: GlassWater,
  },
  {
    number: "02",
    title: "Mix",
    description:
      "New York stoneground wheat, a little Italian 00, water, salt and Brenda. Mixed slowly, never warm.",
    Icon: Soup,
  },
  {
    number: "03",
    title: "Wait 48 hours",
    description:
      "Balled by hand and left in the fridge for two days. Slow fermentation means flavor and an easy-to-digest crust.",
    Icon: Clock3,
  },
  {
    number: "04",
    title: "Bake for 90 seconds",
    description:
      "Stretched to order and baked at 850°F, so the crust puffs and blisters and the middle stays soft.",
    Icon: Flame,
  },
];

export default function DoughSteps() {
  return (
    <section
      dir="ltr"
      aria-labelledby="dough-steps-title"
      className="bg-[#2a1209] px-5 py-12 text-[#fff5e2] sm:px-8 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffca38]">
          The dough
        </p>

        <h2
          id="dough-steps-title"
          className="mt-3 max-w-[780px] font-[family-name:var(--font-shrikhand)] text-4xl leading-[1.08] sm:text-5xl lg:text-[56px]"
        >
          Four steps, two days, no shortcuts
        </h2>

        <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {doughSteps.map(({ number, title, description, Icon }) => (
            <li
              key={number}
              className="min-h-[260px] rounded-[30px] bg-[#42291f] p-5 sm:p-6"
            >
              <div className="flex min-h-[64px] items-center justify-between gap-3">
                <span className="font-[family-name:var(--font-shrikhand)] text-5xl leading-none text-[#ffca38]">
                  {number}
                </span>

                <Icon
                  aria-hidden="true"
                  className="size-10 shrink-0 text-[#ffca38]"
                  strokeWidth={2.2}
                />
              </div>

              <h3 className="mt-3 font-[family-name:var(--font-rubik)] text-lg font-black leading-snug">
                {title}
              </h3>

              <p className="mt-2 font-[family-name:var(--font-rubik)] text-sm leading-6 text-[#fff5e2] sm:text-base">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}