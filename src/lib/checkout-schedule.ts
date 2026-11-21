import type { CheckoutSelectOption } from "@/components/checkout/CheckoutWhen";

export function getScheduleDays(
  now: Date = new Date()
): CheckoutSelectOption[] {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });

  return [0, 1, 2].map((daysAhead) => {
    const date = new Date(now);
    date.setDate(date.getDate() + daysAhead);

    const value = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/New_York",
    }).format(date);

    return {
      value,
      label: formatter.format(date),
    };
  });
}