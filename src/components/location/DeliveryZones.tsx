"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Rubik, Shrikhand } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-shrikhand",
});

const zones = [
  {
    name: "Downtown & Wooster Square",
    postcodes: "06510, 06511",
    shop: "Wooster Square",
    fee: "$2.99",
    minimum: "$20.00",
    time: "25–35 min",
    color: "#f78369",
  },
  {
    name: "Hamden, Fair Haven & The Hill",
    postcodes: "06512, 06513, 06514, 06517, 06518, 06519",
    shop: "Wooster Square",
    fee: "$4.99",
    minimum: "$25.00",
    time: "35–50 min",
    color: "#ffd36a",
  },
  {
    name: "Westville & Woodbridge",
    postcodes: "06515, 06525",
    shop: "Westville",
    fee: "$2.99",
    minimum: "$20.00",
    time: "25–35 min",
    color: "#69bd85",
  },
  {
    name: "West Haven, Allingtown & Orange",
    postcodes: "06477, 06516",
    shop: "Westville",
    fee: "$4.99",
    minimum: "$25.00",
    time: "35–50 min",
    color: "#b6dc9d",
  },
];

const shops = [
  {
    name: "Wooster Square",
    address: "42 Franklin Street",
    status: "Open until 10:00 PM",
    open: true,
  },
  {
    name: "Westville",
    address: "317 Fountain Street",
    status: "Opens today 4:00 PM",
    open: false,
  },
];

function DeliveryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M3 14h11l2.5-5H12m0 0 2 5m-2-5H9m5 5h4l2 2v2h-2m-4-4H8m-5 0v4h2m3 0a2 2 0 1 1-4 0m13 0a2 2 0 1 1-4 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PickupIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M6 8h12l1 12H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="m8 12 2.5 2.5L16 9"
        stroke="#ffdfa0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DeliveryZones() {
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [selectedShop, setSelectedShop] = useState("Westville");
  const [postcode, setPostcode] = useState("");
  const [message, setMessage] = useState("");

  function handleCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredPostcode = postcode.trim();

    if (!enteredPostcode) {
      setMessage("Please enter your ZIP code.");
      return;
    }

    const matchingZone = zones.find((zone) =>
      zone.postcodes.split(", ").includes(enteredPostcode),
    );

    setMessage(
      matchingZone
        ? `Yes, we deliver to ${enteredPostcode} from ${matchingZone.shop}.`
        : `We couldn't find a delivery zone for ${enteredPostcode}.`,
    );
  }

  return (
    <section
      aria-labelledby="zones-title"
      className={`${rubik.variable} ${shrikhand.variable} bg-[#fff5e2] px-4 py-10 text-[#301508] sm:px-6 sm:py-14 lg:px-8`}
    >
      <div className="lg:relative mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 items-start gap-5 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
        {/* map */}
        <div className="relative min-h-75 overflow-hidden rounded-[30px] border border-[#e7ddcc] bg-[#fffaf3] shadow-[0_10px_25px_rgba(48,21,8,0.08)] sm:min-h-105 lg:min-h-125">
          <div className="absolute inset-2 lg:inset-6">
            <Image
              src="/image/map.png"
              alt="Crust Club delivery zones in New Haven"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="rounded-[24px] object-cover"
            />
          </div>
        </div>
        {/* deliver box */}
        <div className="mx-auto w-full min-w-0 xl:max-w-150 space-y-4 lg:justify-self-end">
          <div className="rounded-[36px] border border-[#e4d7c5] bg-[#fffaf3] px-5 py-5 shadow-[0_10px_24px_rgba(48,21,8,0.08)] sm:px-6 sm:py-5">
            <h2
              id="zones-title"
              className="font-[family-name:var(--font-shrikhand)]
              text-[20px] md:text-[30px] leading-tight sm:text-[32px]"
            >
              Do you deliver to me?
            </h2>

            <div
              role="group"
              aria-label="Delivery or pickup"
              className="mt-4 flex min-h-[54px] rounded-full
               bg-[#eee8e2] p-1"
            >
              <button
                type="button"
                aria-pressed={orderType === "delivery"}
                onClick={() => setOrderType("delivery")}
                className={`flex flex-1 items-center
                   justify-center gap-3 rounded-full
                    px-3 text-[14px] md:text-base font-extrabold 
                    transition-colors ${
                      orderType === "delivery"
                        ? "bg-[#301508] text-[#fff6e3] shadow-[0_3px_0_rgba(48,21,8,0.25)]"
                        : "text-[#715c4d]"
                    }`}
              >
                <DeliveryIcon />
                Delivery
              </button>

              <button
                type="button"
                aria-pressed={orderType === "pickup"}
                onClick={() => setOrderType("pickup")}
                className={`flex flex-1 items-center justify-center
                   gap-3 rounded-full px-3 text-[14px] md:text-base
                    font-extrabold transition-colors ${
                      orderType === "pickup"
                        ? "bg-[#301508] text-[#fff6e3] shadow-[0_3px_0_rgba(48,21,8,0.25)]"
                        : "text-[#715c4d]"
                    }`}
              >
                <PickupIcon />
                Pickup
              </button>
            </div>

            {orderType === "delivery" ? (
              <form onSubmit={handleCheck} className="mt-4">
                <label
                  htmlFor="delivery-postcode"
                  className="mb-1.5 block text-base font-bold"
                >
                  Your ZIP code
                </label>

                <div className="flex gap-2">
                  <input
                    id="delivery-postcode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="ZIP code, e.g. 06511"
                    value={postcode}
                    onChange={(event) => {
                      setPostcode(event.target.value);
                      setMessage("");
                    }}
                    className="min-h-12 min-w-0 flex-1 rounded-[18px] border-2 border-[#e5dacf] bg-[#fffaf3] px-4 text-sm outline-none placeholder:text-[#9b8d81] focus:border-[#301508]"
                  />

                  <button
                    type="submit"
                    className="min-h-12 shrink-0 rounded-full border-b-[4px] border-[#140a04] bg-[#301508] px-5 text-sm font-extrabold text-[#fff6e3] transition-colors hover:bg-[#482313] sm:px-6"
                  >
                    Check
                  </button>
                </div>

                {message && (
                  <p role="status" className="mt-3 text-sm font-medium">
                    {message}
                  </p>
                )}
              </form>
            ) : (
              <div className="mt-4">
                <p className="mb-2 text-base font-bold">Pick up from</p>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {shops.map((shop) => {
                    const isSelected = selectedShop === shop.name;

                    return (
                      <button
                        key={shop.name}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedShop(shop.name)}
                        className={`relative min-h-[116px] rounded-[20px] border-2 p-4 text-left transition-colors ${
                          isSelected
                            ? "border-[#301508] bg-[#ffe4a3]"
                            : "border-[#e5dacf] bg-[#fffaf3]"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute right-4 top-4 text-[#301508]">
                            <CheckIcon />
                          </span>
                        )}

                        <span className="block pr-7 text-[16px] md:text-xl font-black leading-tight">
                          {shop.name}
                        </span>
                        <span className="mt-2 block text-base text-[#715c4d]">
                          {shop.address}
                        </span>

                        <span className="mt-2 flex items-center gap-2.5 text-sm font-bold">
                          <span
                            aria-hidden="true"
                            className={`h-3 w-3 rounded-full ${
                              shop.open ? "bg-[#2ca65a]" : "bg-[#d42b15]"
                            }`}
                          />
                          {shop.status}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-3 text-base text-[#715c4d]">
                  Pickup orders are usually ready in about 20 minutes.
                </p>
              </div>
            )}
          </div>

          <div className="min-w-0 overflow-hidden rounded-[36px] border border-[#e4d7c5] bg-[#fffaf3] px-5 py-5 shadow-[0_10px_24px_rgba(48,21,8,0.08)] sm:px-6 sm:py-5">
            <p className="mb-4 text-base font-bold leading-6 text-[#715c4d]">
              Delivery is free on orders over $50 after promo codes.
            </p>

            <div className="min-w-0 overflow-x-auto">
              <table className="w-full min-w-[460px] border-collapse text-left">
                <thead>
                  <tr className="text-sm font-black uppercase tracking-[0.12em] text-[#715c4d]">
                    <th scope="col" className="pb-3 pr-3">
                      Zone
                    </th>
                    <th scope="col" className="px-2 pb-3">
                      Fee
                    </th>
                    <th scope="col" className="px-2 pb-3">
                      Minimum
                    </th>
                    <th scope="col" className="pb-3 pl-2">
                      Time
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {zones.map((zone) => (
                    <tr
                      key={zone.name}
                      className="border-b-2 border-dashed border-[#eee4d8] last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="py-3 pr-3 align-middle font-black"
                      >
                        <span className="flex items-center gap-2.5 text-base leading-7 text-[#160c07]">
                          <span
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 rounded-full"
                            style={{ backgroundColor: zone.color }}
                          />
                          {zone.name}
                        </span>
                        <span className="mt-0.5 block text-sm font-bold leading-5 text-[#715c4d]">
                          {zone.postcodes} · from {zone.shop}
                        </span>
                      </th>

                      <td className="whitespace-nowrap px-2 py-3 align-top text-base">
                        {zone.fee}
                      </td>
                      <td className="whitespace-nowrap px-2 py-3 align-top text-base">
                        {zone.minimum}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-2 align-top text-base">
                        {zone.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
