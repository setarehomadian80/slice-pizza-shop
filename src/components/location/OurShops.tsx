"use client";

import { useSyncExternalStore } from "react";

type OpeningHour = {
  day: string;
  hours: string;
};

type Shop = {
  name: string;
  address: string;
  phone: string;
  features: string[];
  openingHours: OpeningHour[];
  headerColor: string;
  titleColor: string;
};

const shops: Shop[] = [
  {
    name: "Wooster Square",
    address: "42 Franklin Street, New Haven, CT 06511",
    phone: "(203) 555-0118",
    features: [
      "24 seats inside, 8 on the sidewalk",
      "Walk-up window for slices until 4 PM",
      "Step-free entrance and accessible restroom",
      "6 minutes’ walk from State Street station",
    ],
    openingHours: [
      { day: "Monday", hours: "12:00 PM–10:00 PM" },
      { day: "Tuesday", hours: "12:00 PM–10:00 PM" },
      { day: "Wednesday", hours: "12:00 PM–10:00 PM" },
      { day: "Thursday", hours: "12:00 PM–10:00 PM" },
      { day: "Friday", hours: "12:00 PM–11:00 PM" },
      { day: "Saturday", hours: "12:00 PM–11:00 PM" },
      { day: "Sunday", hours: "12:00 PM–9:00 PM" },
    ],
    headerColor: "bg-[#d42b15]",
    titleColor: "text-[#fff6e3]",
  },
  {
    name: "Westville",
    address: "317 Fountain Street, New Haven, CT 06515",
    phone: "(203) 555-0132",
    features: [
      "30 seats plus a sunny back patio",
      "Dogs welcome on the patio",
      "Step-free entrance",
      "On the CTtransit bus route",
    ],
    openingHours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "4:00 PM–10:00 PM" },
      { day: "Wednesday", hours: "4:00 PM–10:00 PM" },
      { day: "Thursday", hours: "4:00 PM–10:00 PM" },
      { day: "Friday", hours: "4:00 PM–11:00 PM" },
      { day: "Saturday", hours: "12:00 PM–11:00 PM" },
      { day: "Sunday", hours: "12:00 PM–9:00 PM" },
    ],
    headerColor: "bg-[#ffc13b]",
    titleColor: "text-[#301508]",
  },
];

function subscribeToToday(callback: () => void) {
  const intervalId = window.setInterval(callback, 60_000);

  return () => window.clearInterval(intervalId);
}

function getToday(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "America/New_York",
  }).format(new Date());
}

function getServerToday(): string | null {
  return null;
}

function getTodayStatus(hours: string): string {
  if (hours === "Closed") return "Closed today";

  return `Opens today ${hours.split("–")[0]}`;
}

function ShopCard({
  shop,
  today,
}: {
  shop: Shop;
  today: string | null;
}) {
  const todayHours = today
    ? shop.openingHours.find((item) => item.day === today)?.hours ?? "Closed"
    : null;

  const todayStatus = todayHours ? getTodayStatus(todayHours) : "";

  return (
    <article className="overflow-hidden rounded-[36px] border border-[#e4d7c5] bg-[#fffaf3] shadow-[0_10px_24px_rgba(48,21,8,0.08)]">
      <header
        className={`${shop.headerColor} flex flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-8 sm:py-6`}
      >
        <h2
          className={`${shop.titleColor} font-[family-name:var(--font-shrikhand)] text-[30px] leading-tight sm:text-[38px]`}
        >
          {shop.name}
        </h2>

        <span
          aria-label={todayStatus || "Opening hours"}
          className="inline-flex items-center gap-2 rounded-full bg-[#fffaf3] px-4 py-2 text-xs font-extrabold text-[#301508] sm:text-sm"
        >
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full bg-[#d42b15]"
          />
          {todayStatus}
        </span>
      </header>

      <div className="grid grid-cols-1 gap-7 p-5 sm:p-7 lg:grid-cols-2 lg:gap-5">
        <div>
          <h3 className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-[#715c4d]">
            Find us
          </h3>

          <p className="text-lg font-bold leading-8 text-[#160c07]">
            {shop.address}
          </p>

          <a
            href={`tel:${shop.phone.replace(/[^\d+]/g, "")}`}
            className="mt-1 inline-block text-lg font-extrabold text-[#a52817] underline decoration-2 underline-offset-4"
          >
            {shop.phone}
          </a>

          <ul className="mt-6 space-y-3">
            {shop.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-base leading-6 text-[#160c07]"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#19713d] text-xs font-black text-white"
                >
                  ✓
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-[#715c4d]">
            Opening hours
          </h3>

          <div className="space-y-1">
            {shop.openingHours.map((item) => {
              const isToday = item.day === today;

              return (
                <div
                  key={item.day}
                  className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-2xl px-3 py-2.5 text-sm sm:text-base ${
                    isToday ? "bg-[#ffe4a3]" : ""
                  }`}
                >
                  <div>
                    <p className="font-bold text-[#160c07]">{item.day}</p>

                    {isToday && (
                      <span className="mt-1 inline-block rounded-full bg-[#301508] px-3 py-0.5 text-[11px] font-extrabold leading-none text-[#fff6e3]">
                        Today
                      </span>
                    )}
                  </div>

                  <p
                    className={`whitespace-nowrap text-right ${
                      isToday
                        ? "font-extrabold text-[#160c07]"
                        : "text-[#301508]"
                    }`}
                  >
                    {item.hours}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OurShops() {
  const today = useSyncExternalStore(
    subscribeToToday,
    getToday,
    getServerToday,
  );

  return (
    <section className="bg-[#fff5e2] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
        {shops.map((shop) => (
          <ShopCard key={shop.name} shop={shop} today={today} />
        ))}
      </div>
    </section>
  );
}