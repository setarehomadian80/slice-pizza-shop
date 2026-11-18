"use client";

import { useState } from "react";

const questions = [
  {
    id: "delivery-riders",
    question: "Who delivers my pizza?",
    answer:
      "Our own riders, on electric cargo bikes. They’re paid a fair hourly wage and keep 100% of tips.",
  },
  {
    id: "outside-zone",
    question: "My ZIP code isn’t in a zone. Can I still order?",
    answer:
      "Yes, for pickup from either shop. We keep zones small so pizzas arrive in under 50 minutes. Further than that and the crust goes soft, and we’d rather not.",
  },
  {
    id: "order-ahead",
    question: "Can I order ahead?",
    answer:
      "Yes. At checkout choose “Schedule for later” and pick a time up to two days ahead. Slots follow each shop’s opening hours.",
  },
  {
    id: "order-tracking",
    question: "Where’s my order?",
    answer:
      "After you order, the confirmation page shows a live tracker from oven to door. You’ll also get a text when your rider sets off.",
  },
];

export default function DeliveryQuestions() {
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  function toggleQuestion(id: string) {
    setOpenQuestions((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <section
      aria-labelledby="delivery-questions-title"
      className="bg-[#fff5e2] px-5 py-10 text-[#301508]
       sm:px-8 sm:py-14 lg:px-10 lg:py-8 mb-10"
    >
      <div className="mx-auto grid max-w-7xl
       grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.3fr] lg:gap-12">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a52817]">
            Good to know
          </p>

          <h2
            id="delivery-questions-title"
            className="mt-3 max-w-110 font-[family-name:var(--font-shrikhand)] text-4xl! leading-[0.98] sm:text-6xl"
          >
            Delivery questions
          </h2>

          <p className="mt-5 max-w-140 text-lg leading-8 text-[#715c4d] sm:text-xl">
            Something else? Call the shop. Someone with flour on their hands
            will pick up.
          </p>
        </div>

        <div className="space-y-3.5">
          {questions.map((item) => {
            const isOpen = openQuestions.includes(item.id);

            return (
              <article
                key={item.id}
                className="rounded-[30px] border border-[#e8d9bd] bg-[#ffe4a3] px-5 py-5 sm:px-7 sm:py-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="pt-1 text-lg font-black leading-7 text-[#160c07] ">
                    {item.question}
                  </h3>

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`answer-${item.id}`}
                    aria-label={`${isOpen ? "Close" : "Open"}: ${item.question}`}
                    onClick={() => toggleQuestion(item.id)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#301508] text-xl font-black leading-none text-[#fff6e3] transition-transform hover:scale-105"
                  >
                    {isOpen ? "×" : "+"}
                  </button>
                </div>

                {isOpen && (
                  <p
                    id={`answer-${item.id}`}
                    className="mt-4 pr-1 text-base leading-7 text-[#715c4d] sm:leading-8"
                  >
                    {item.answer}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}