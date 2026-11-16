
const dietaryInfo = [
  {
    title: ["Vegan"],
    color: "bg-[#dcefcf] text-[#24552b]",
    description:
      "No meat, fish, dairy, egg or honey. Our vegan mozzarella contains soy.",
  },
  {
    title: ["Vegetarian"],
    color: "bg-[#e7efc6] text-[#40531b]",
    description:
      "No meat or fish. Our hard cheese is made with vegetarian rennet.",
  },
  {
    title: ["Gluten-free", "GF base"],
    color: "bg-[#ffe5a1] text-[#67420b]",
    description:
      "Any pizza can be made on our 10″ gluten-free base (+$3). It’s made in a kitchen that handles flour.",
  },
  {
    title: ["Spicy"],
    color: "bg-[#ffd9ce] text-[#a52817]",
    description:
      "Contains chili, nduja, jalapeños or Scotch bonnet. Ask for it mild and we’ll leave the flakes off.",
  },
];

export default function MenuDietaryInfo() {
  return (
    <section className="w-full bg-[#fff5e2]">
      <div
       className="
  mx-auto max-w-7xl
  px-5
  pt-3 pb-12
  sm:px-8
  sm:pt-4 sm:pb-14
  lg:pt-1 lg:pb-16
"
      >
        <div
          className="
            grid grid-cols-1
            gap-7
            rounded-[30px]
            border border-[#eadbc6]
            bg-[#fffaf2]
            px-6 py-7
            sm:px-8 sm:py-9
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-center
            lg:gap-10
            lg:px-10 lg:py-10
            xl:px-11
          "
        >
          {/* LEFT CONTENT */}
          <div className="max-w-[490px]">
            <p
              className="
                mb-2
                text-[11px] font-black
                uppercase tracking-[0.17em]
                text-[#a52817]
                sm:text-xs
              "
            >
              Allergens &amp; diets
            </p>

            <h2
              className="
                mb-4
                font-[family-name:var(--font-shrikhand)]
                text-[30px] leading-[1.2]
                text-[#291109]
                sm:text-[35px]
                lg:text-[38px]
              "
            >
              Eating with allergies?
            </h2>

            <p
              className="
                text-[14px]
                leading-[1.75]
                text-[#713f2c]
                sm:text-[15px]
                lg:text-[16px]
              "
            >
              Every item lists the allergens it contains,
              and the customizer updates them as you add
              extras. Our kitchens handle the major food
              allergens, including gluten and nuts, so we
              can’t rule out traces. If you’re unsure, call
              the shop before you order.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div
            className="
              grid grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:gap-4
            "
          >
            {dietaryInfo.map((item) => (
              <article
                key={item.title[0]}
                className="
                  min-w-0 rounded-[18px]
                  bg-[#fff3e1]
                  px-5 py-5
                  sm:px-5 sm:py-5
                  lg:min-h-[135px]
                "
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {item.title.map((tag) => (
                    <span
                      key={tag}
                      className={`
                        inline-flex items-center
                        rounded-full
                        px-3 py-1
                        text-[11px]
                        font-extrabold
                        leading-none
                        sm:text-xs
                        ${item.color}
                      `}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p
                  className="
                    text-[13px]
                    leading-[1.7]
                    text-[#713f2c]
                    sm:text-[14px]
                    lg:text-[15px]
                  "
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
