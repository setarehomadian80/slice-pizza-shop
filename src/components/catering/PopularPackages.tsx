import Image from "next/image";

const packages = [
  {
    id: "office-lunch",
    people: "10–40 PEOPLE",
    title: "Office lunch",
    image: "/image/veg-out.png",
    imageAlt: "Vegetarian pizza",
    imageBackground: "#ffe6a3",
    features: [
      "Mix of regular pizzas cut into squares",
      "Big green salad and dips",
      "Delivered for 12:30 PM on the dot",
      "Invoice with 30-day terms",
    ],
    price: 14,
  },
  {
    id: "birthday-party",
    people: "10–60 PEOPLE",
    title: "Birthday party",
    image: "/image/hot-honey-pep.png",
    imageAlt: "Pepperoni pizza",
    imageBackground: "#ffdbce",
    features: [
      "Large pizzas with names on the boxes",
      "Garlic knots and Nutella knots",
      "Kids’ half & halves",
      "Candles on the cookies, if you like",
    ],
    price: 18,
  },
  {
    id: "big-bash",
    people: "60–300 PEOPLE",
    title: "The big bash",
    image: "/image/funghi-bianca.png",
    imageAlt: "White pizza with mushrooms",
    imageBackground: "#dcedd4",
    features: [
      "Our mobile oven and two pizzaioli on site",
      "Pizzas served straight from the fire",
      "Full allergen labeling",
      "Weddings, launches and festivals",
    ],
    price: 24,
  },
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5 shrink-0"
    >
      <circle cx="10" cy="10" r="10" fill="#1d6b3c" />
      <path
        d="m5.8 10.1 2.7 2.6 5.7-5.6"
        stroke="#fff6e3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PopularPackages() {
  return (
    <section
      aria-labelledby="packages-title"
      className="bg-[#fff5e2] px-5 py-12 text-[#301508] sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="packages-title"
          className="font-[family-name:var(--font-shrikhand)] text-3xl! leading-tight sm:text-5xl"
        >
          Popular packages
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-7">
          {packages.map((item) => (
            <article
              key={item.id}
              className="flex h-full flex-col overflow-hidden rounded-[32px] border border-[#e4d7c5] bg-[#fffaf3] shadow-[0_10px_24px_rgba(48,21,8,0.08)]"
            >
              <div
                className="relative flex h-[200px] items-center justify-center sm:h-[220px] lg:h-[240px]"
                style={{ backgroundColor: item.imageBackground }}
              >
                <div className="relative h-[150px] w-[150px] sm:h-[170px] sm:w-[170px]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 150px, 170px"
                    className="object-contain drop-shadow-[0_14px_12px_rgba(48,21,8,0.2)]"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-xs font-black tracking-[0.16em] text-[#a52817]">
                  {item.people}
                </p>

                <h3 className="mt-2 text-2xl font-black leading-tight">
                  {item.title}
                </h3>

                <ul className="mt-6 space-y-3">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6 sm:text-base"
                    >
                      <span className="mt-0.5">
                        <CheckIcon />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-7 text-[#715c4d]">
                  <span className="text-3xl font-black text-[#160c07]">
                    ${item.price}
                  </span>{" "}
                  a head
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}