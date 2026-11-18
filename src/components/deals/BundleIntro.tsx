import { Rubik, Shrikhand } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function BundleIntro() {
  return (
    <div className="max-w-3xl">
      <p className={`${rubik.className} text-xs font-black uppercase tracking-[0.18em] text-[#922513]`}>
        Build your bundle
      </p>

      <h2
        id="bundle-title"
        className={`${shrikhand.className} mt-2 text-4xl leading-tight text-[#301508] sm:text-5xl`}
      >
        Mix it, match it, save on it
      </h2>

      <p className={`${rubik.className} mt-4 text-base leading-7 text-[#705a4b]`}>
        Pick any regular pizzas, sides, desserts and drinks. Two pizzas and a
        side takes 15% off the lot; three pizzas and two sides takes 20%.
      </p>
    </div>
  );
}