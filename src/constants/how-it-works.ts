import type { OrderingStep } from "@/types/how-it-works";

export const orderingSteps: OrderingStep[] = [
  {
    id: "choose",
    number: "1",
    title: "Pick your pies",
    description:
      "Choose a size and crust, add extras or go half & half. Prices update as you go.",
    image: "/image/phone.png",
    backgroundColor: "#ffdacd",
  },
  {
    id: "delivery",
    number: "2",
    title: "Delivery or pickup",
    description:
      "Check your postcode or pick a shop, then choose ASAP or a time slot that suits you.",
    image: "/image/motor.png",
    backgroundColor: "#ffeba8",
  },
  {
    id: "tracking",
    number: "3",
    title: "Track it live",
    description:
      "Watch it go from ticket to oven to your door. Eat immediately. Do not wait for anyone.",
    image: "/image/loc.png",
    backgroundColor: "#dcefd3",
  },
];