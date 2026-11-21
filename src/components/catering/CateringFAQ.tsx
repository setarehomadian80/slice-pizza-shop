const questions = [
  {
    question: "How far ahead should I book?",
    answer:
      "Two days for up to 60 people, two weeks for the mobile oven. Fridays in December go fast.",
  },
  {
    question: "How do you keep big orders hot?",
    answer:
      "We bake in waves and deliver in insulated bags, a few boxes at a time, so the last pizza is as good as the first.",
  },
  {
    question: "Can you label allergens?",
    answer:
      "Yes. Every box gets a sticker with its name and allergens, and gluten-free pizzas travel in separate bags.",
  },
  {
    question: "Do you need a deposit?",
    answer:
      "For the mobile oven, 25% to hold the date. For deliveries, you pay the day of the event or on invoice.",
  },
];

export default function CateringFAQ() {
  return (
    <section
      aria-labelledby="catering-faq-title"
      className="w-full bg-[#fff5e2] px-5 py-14
       text-[#301508] sm:px-12 sm:pb-16 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id="catering-faq-title"
          className="font-[family-name:var(--font-shrikhand)] text-4xl leading-tight sm:text-5xl lg:text-[56px]"
        >
          Party questions
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group rounded-[30px] border border-[#e7ddcc] bg-[#fffaf3] p-5 sm:min-h-[103px] sm:p-[30px]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-rubik)] text-base font-extrabold marker:content-none sm:text-xl">
                <span>{item.question}</span>

                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-[#301508] text-xl font-black leading-none text-[#fff6e3] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              <p className="mt-4 font-[family-name:var(--font-rubik)] text-base leading-7 text-[#715c4d]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}