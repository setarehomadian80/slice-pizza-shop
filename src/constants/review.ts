import type { Review } from "@/types/review";

export const reviewsSummary = {
  title: "New Haven has opinions",
  rating: "4.8",
  count: "2,140",
};

export const reviews: Review[] = [
  {
    id: "priya",
    quote:
      "The Hot Honey Pep arrived still blistered and bubbling. Twenty-four minutes to Wooster Square. I didn’t know delivery pizza could taste like this.",
    name: "Priya S.",
    details: "Wooster Square, ordered 31 times",
    initials: "PS",
    rating: 5,
    avatarColor: "#ffca38",
  },
  {
    id: "tom-ade",
    quote:
      "Half Margherita, half Green Machine means my vegan partner and I finally stopped arguing on Friday nights.",
    name: "Tom & Ade",
    details: "Westville",
    initials: "TA",
    rating: 5,
    avatarColor: "#dcefd3",
  },
  {
    id: "lucy",
    quote:
      "We ordered twelve large pizzas for my son’s 10th birthday. Hot, on time, and they even wrote his name on the box.",
    name: "Lucy H.",
    details: "Party order, Woodbridge",
    initials: "LH",
    rating: 5,
    avatarColor: "#ffdacd",
  },
];