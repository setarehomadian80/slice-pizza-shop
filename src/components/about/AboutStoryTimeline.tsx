const milestones = [
  {
    year: "2016",
    title: "The horse trailer",
    description:
      "Weekend markets across Greater New Haven. One oven, two people, about 140 pizzas on a good Saturday.",
    markerColor: "bg-[#ffca38]",
    yearColor: "text-[#c52c18]",
  },
  {
    year: "2019",
    title: "Wooster Square opens",
    description:
      "A tiny shop in an old carriage-factory outbuilding, with a window for slices and a waiting list for the dough fridge.",
    markerColor: "bg-[#cc2a16]",
    yearColor: "text-[#c52c18]",
  },
  {
    year: "2023",
    title: "Westville",
    description:
      "Our second shop, with a back patio, a bigger oven and our own riders on electric cargo bikes.",
    markerColor: "bg-[#4ba66a]",
    yearColor: "text-[#1d6b3c]",
  },
  {
    year: "Today",
    title: "38 people, one starter",
    description:
      "Around 1,900 pizzas a week, still from the same jar of Big Brenda we started with in 2016.",
    markerColor: "bg-[#ffca38]",
    yearColor: "text-[#c52c18]",
  },
];

export default function AboutStoryTimeline() {
  return (
    <section
      aria-labelledby="story-title"
      className="bg-[#fff5e2] px-5 py-14 text-[#301508] sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[1.4fr_2fr] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a52817]">
            How it started
          </p>

          <h2
            id="story-title"
            className="mt-3 max-w-[520px] font-[family-name:var(--font-shrikhand)] text-4xl leading-[1.05] sm:text-5xl"
          >
            From horse trailer to Main Street
          </h2>

          <p className="mt-5 max-w-[520px] text-base leading-7 text-[#715c4d]">
            Nico Ferraro learned to stretch dough at his uncle’s pizzeria in
            Salerno. Bea Kowalski was a pastry chef who’d never owned a van.
            They met at a Sunday farmers market in Fair Haven, bought a horse
            trailer between them and spent a summer burning pizzas until they
            stopped burning them.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-12">
          {milestones.map((milestone) => (
            <li key={milestone.year}>
              <span
                aria-hidden="true"
                className={`grid size-14 place-items-center rounded-full ${milestone.markerColor}`}
              >
                <span className="size-3 rounded-full bg-[#fff5e2]" />
              </span>

              <p
                className={`mt-4 font-[family-name:var(--font-shrikhand)] text-3xl leading-none ${milestone.yearColor}`}
              >
                {milestone.year}
              </p>

              <h3 className="mt-3 text-lg font-black leading-snug">
                {milestone.title}
              </h3>

              <p className="mt-2 text-base leading-6 text-[#715c4d]">
                {milestone.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}