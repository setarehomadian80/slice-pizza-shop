import BestsellersSection from "@/components/home/BestsellersSection";
import DealsSection from "@/components/home/DealsSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import DoughSection from "@/components/home/DoughSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import ComeSayHello from "@/components/home/ComeSayHello";
import HungryYet from "@/components/home/HungryYet";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BestsellersSection />
      <DealsSection />
      <HowItWorksSection />
      <DoughSection />
      <ReviewsSection />
      <ComeSayHello />
      <HungryYet />
    </div>
  );
}
