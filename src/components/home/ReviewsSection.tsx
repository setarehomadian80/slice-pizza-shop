import { Star } from "lucide-react";

import {
  reviews,
  reviewsSummary,
} from "@/constants/review";

type StarRatingProps = {
  rating: number;
};

function StarRating({ rating }: StarRatingProps) {
  const score = Math.max(0, Math.min(5, rating));

  return (
    <span
      role="img"
      aria-label={`${score} out of 5 stars`}
      className="inline-flex shrink-0 items-center gap-0.5"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={19}
          strokeWidth={0}
          fill="currentColor"
          aria-hidden="true"
          className={
            index < score
              ? "text-[#d42b15]"
              : "text-[#e6d9c7]"
          }
        />
      ))}
    </span>
  );
}

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      dir="ltr"
      aria-labelledby="reviews-title"
      className="bg-[#fff5e2] py-16 text-[#301508] sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading and overall rating */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a52817]">
              Reviews
            </p>

            <h2
              id="reviews-title"
              style={{
                fontFamily: "var(--font-shrikhand)",
              }}
              className="mt-3 text-[32px] leading-[1.1] tracking-tight sm:text-[40px] lg:text-[44px]"
            >
              {reviewsSummary.title}
            </h2>
          </div>

          <div className="inline-flex w-fit max-w-full flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-[#e6dfd3] bg-[#fffcf5] px-5 py-3 lg:shrink-0">
            {/* Decorative stars; exact score is written beside them */}
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-0.5 text-[#d42b15]"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={18}
                  strokeWidth={0}
                  fill="currentColor"
                />
              ))}
            </span>

            <span className="whitespace-nowrap text-sm font-black">
              {reviewsSummary.rating} out of 5
            </span>

            <span className="whitespace-nowrap text-xs text-[#735b4b] sm:text-sm">
              from {reviewsSummary.count} reviews
            </span>
          </div>
        </div>

        {/* Review cards */}
        <ul
          role="list"
          className="mt-10 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-3"
        >
          {reviews.map((review) => (
            <li
              key={review.id}
              className="h-full rounded-[28px] border border-[#e6dfd3] bg-[#fffcf5] p-6 shadow-[0_12px_20px_-10px_rgba(48,21,8,0.28)] sm:p-7"
            >
              <figure className="m-0 flex h-full flex-col">
                <StarRating rating={review.rating} />

                <blockquote className="mt-4 flex-1">
                  <p className="text-base font-bold leading-[1.55] tracking-[-0.01em]">
                    “{review.quote}”
                  </p>
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    style={{
                      backgroundColor: review.avatarColor,
                    }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black"
                  >
                    {review.initials}
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-black">
                      {review.name}
                    </p>

                    <p className="mt-0.5 text-sm leading-5 text-[#735b4b]">
                      {review.details}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}