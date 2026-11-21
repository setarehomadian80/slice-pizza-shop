import { IconLeaf, IconMeat, IconWheat } from "@tabler/icons-react";

type TomatoIconProps = {
  size?: number;
  stroke?: number;
};

function TomatoIcon({ size = 38, stroke = 1.7 }: TomatoIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M19.9 10c-2.4-3.4-5.1-4.5-8.1-3.8.9 2.6 3.1 4.1 6.4 4.4-3.7-.8-6.5 0-8.4 2.4 2.9.8 5.4.2 7.6-1.7"
        fill="#258347"
      />
      <path
        d="M20.1 10c2.4-3.4 5.1-4.5 8.1-3.8-.9 2.6-3.1 4.1-6.4 4.4 3.7-.8 6.5 0 8.4 2.4-2.9.8-5.4.2-7.6-1.7"
        fill="#258347"
      />
      <path
        d="M20 10.2c-9 0-15 6.4-15 14.7C5 32.5 11.3 37 20 37s15-4.5 15-12.1c0-8.3-6-14.7-15-14.7Z"
        fill="#e7442e"
        stroke="#b52a18"
        strokeWidth={stroke}
      />
      <path
        d="M20 13c-1.4 3.2-1.4 6.3 0 9.5 1.4 3.2 1.4 6.1 0 9"
        stroke="#ff9075"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="13.8" cy="20" r="1.5" fill="#ffd5aa" />
      <circle cx="25.7" cy="18" r="1.5" fill="#ffd5aa" />
      <circle cx="25.7" cy="27" r="1.5" fill="#ffd5aa" />
      <circle cx="14.1" cy="28" r="1.5" fill="#ffd5aa" />
    </svg>
  );
}

const suppliers = [
  {
    title: "Tomatoes",
    location: "Campania, Italy",
    description:
      "Plum tomatoes from a growers’ co-op near Salerno, crushed by hand in the kitchen every morning.",
    Icon: TomatoIcon,
    iconBg: "bg-[#ffdbd2]",
    iconColor: "text-[#d42b15]",
  },
  {
    title: "Flour",
    location: "Upstate New York and Naples",
    description:
      "Stoneground New York wheat from a family mill, blended with a little Italian 00 for stretch.",
    Icon: IconWheat,
    iconBg: "bg-[#f8e8c9]",
    iconColor: "text-[#b88945]",
  },
  {
    title: "Basil & veg",
    location: "Guilford, Connecticut",
    description:
      "Herbs, zucchini and salad greens from a market garden 15 miles away. In winter, mostly from California.",
    Icon: IconLeaf,
    iconBg: "bg-[#dcefd5]",
    iconColor: "text-[#258347]",
  },
  {
    title: "Meat",
    location: "Connecticut and Brooklyn",
    description:
      "Free-range pork pepperoni and fennel sausage from a Connecticut butcher; nduja from a small producer in Brooklyn.",
    Icon: IconMeat,
    iconBg: "bg-[#ffe6a3]",
    iconColor: "text-[#b52a18]",
  },
];

export default function SourcingSection() {
  return (
    <section
      aria-labelledby="sourcing-title"
      className="bg-[#fff5e2] px-5 py-14 text-[#301508] sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 sm:mb-12">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a52817]">
            Sourcing
          </p>

          <h2
            id="sourcing-title"
            className="mt-3 font-[family-name:var(--font-shrikhand)] text-4xl leading-tight sm:text-5xl"
          >
            Who we buy from
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#715c4d]">
            Local where it makes sense, Italian where it really matters. We
            visit every supplier at least once a year.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {suppliers.map((supplier) => {
            const Icon = supplier.Icon;

            return (
              <article
                key={supplier.title}
                className="min-w-0 rounded-[32px] border border-[#e7ddcc] bg-[#fffaf3] p-7 shadow-[0_10px_24px_rgba(48,21,8,0.08)] sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className={`grid size-20 place-items-center rounded-full ${supplier.iconBg}`}
                >
                  <Icon
                    size={38}
                    stroke={1.7}
                    className={supplier.iconColor}
                  />
                </div>

                <h3 className="mt-7 text-2xl font-black leading-tight">
                  {supplier.title}
                </h3>

                <p className="mt-2 text-base font-extrabold leading-6 text-[#a52817]">
                  {supplier.location}
                </p>

                <p className="mt-4 text-lg leading-8 text-[#715c4d]">
                  {supplier.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}