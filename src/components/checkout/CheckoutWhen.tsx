"use client";

import { useId } from "react";
import type { CheckoutTiming } from "@/types/checkout";

export type CheckoutSelectOption = {
  value: string;
  label: string;
};

type CheckoutWhenProps = {
  timing: CheckoutTiming;
  onTimingChange: (timing: CheckoutTiming) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
  scheduleDays: CheckoutSelectOption[];
  availableTimes: CheckoutSelectOption[];
  asapAvailable: boolean;
  asapMessage: string;
  scheduleNote: string;
};

export default function CheckoutWhen({
  timing,
  onTimingChange,
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  scheduleDays,
  availableTimes,
  asapAvailable,
  asapMessage,
  scheduleNote,
}: CheckoutWhenProps) {
  const dateId = useId();
  const timeId = useId();

  return (
    <section
      aria-labelledby="checkout-when-title"
      className="rounded-[24px] border border-[#e7ddcc] bg-[#fffaf3] p-4 text-[#301508] shadow-[0_8px_20px_rgba(48,21,8,0.06)] sm:p-5"
    >
      <h2
        id="checkout-when-title"
        className="flex items-center gap-2 text-lg font-black"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d42b15] text-sm text-white">
          2
        </span>
        When
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          aria-pressed={timing === "asap"}
          disabled={!asapAvailable}
          onClick={() => onTimingChange("asap")}
          className={`min-h-[72px] rounded-2xl border-2 p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${
            timing === "asap"
              ? "border-[#301508] bg-[#ffe4a3]"
              : "border-[#e7ddcc] bg-[#fffaf3]"
          }`}
        >
          <span className="block text-sm font-extrabold">
            As soon as possible
          </span>
          <span className="mt-1 block text-xs leading-5 text-[#715c4d]">
            {asapMessage}
          </span>
        </button>

        <button
          type="button"
          aria-pressed={timing === "scheduled"}
          onClick={() => onTimingChange("scheduled")}
          className={`min-h-[72px] rounded-2xl border-2 p-3 text-left transition-colors ${
            timing === "scheduled"
              ? "border-[#301508] bg-[#ffe4a3]"
              : "border-[#e7ddcc] bg-[#fffaf3]"
          }`}
        >
          <span className="block text-sm font-extrabold">
            Schedule for later
          </span>
          <span className="mt-1 block text-xs leading-5 text-[#715c4d]">
            Up to two days ahead
          </span>
        </button>
      </div>

      {timing === "scheduled" && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor={dateId}
              className="mb-1.5 block text-xs font-bold"
            >
              Day
            </label>

            <select
              id={dateId}
              value={selectedDate}
              onChange={(event) => onDateChange(event.target.value)}
              required
              className="min-h-11 w-full rounded-2xl border border-[#ded5c8] bg-[#fffaf3] px-3 text-sm outline-none focus:border-[#301508]"
            >
              <option value="" disabled>
                Choose a day
              </option>
              {scheduleDays.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={timeId}
              className="mb-1.5 block text-xs font-bold"
            >
              Time
            </label>

            <select
              id={timeId}
              value={selectedTime}
              onChange={(event) => onTimeChange(event.target.value)}
              required
              disabled={!selectedDate || availableTimes.length === 0}
              className="min-h-11 w-full rounded-2xl border border-[#ded5c8] bg-[#fffaf3] px-3 text-sm outline-none focus:border-[#301508] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                Choose a time
              </option>
              {availableTimes.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs leading-5 text-[#715c4d]">
        {scheduleNote}
      </p>
    </section>
  );
}