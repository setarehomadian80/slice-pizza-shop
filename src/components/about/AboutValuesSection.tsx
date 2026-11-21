const values = [
  {
    title: "A living wage",
    description:
      "For every member of staff, riders included, plus all of the tips.",
  },
  {
    title: "Compostable boxes",
    description:
      "Unbleached cardboard, vegetable inks, no plastic tables in the middle.",
  },
  {
    title: "Leftover dough",
    description:
      "Goes to a food pantry in Fair Haven as focaccia every Monday.",
  },
];

export default function AboutValuesSection() {
  return (
    <section className="bg-[#fff5e2] px-5 py-12 text-[#301508] sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-[1200px] rounded-[40px] bg-[#ffc23a] px-7 py-8 sm:px-10 sm:py-10 lg:items-start lg:px-12 lg:py-10">
        <h2 className="w-full text-center
        font-[family-name:var(--font-shrikhand)] text-3xl leading-[1.05] sm:text-4xl">
          Things we won’t budge on
        </h2>

        <div className="grid grid-cols-1 mt-5
        md:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((value) => (
            <article key={value.title}>
              <h3 className="text-base font-black leading-6">{value.title}</h3>

              <p className="mt-1 text-base leading-6 text-[#5d3a20]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
