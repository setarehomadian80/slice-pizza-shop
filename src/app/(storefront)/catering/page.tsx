import CateringCalculator from "@/components/catering/CateringCalculator";
import CateringFAQ from "@/components/catering/CateringFAQ";
import CateringHero from "@/components/catering/CateringHero";
import CateringInquiry from "@/components/catering/inquiry/CateringInquiry";
import PopularPackages from "@/components/catering/PopularPackages";

export default function CateringPage() {
  return (
    <div>
      <CateringHero />
      <PopularPackages />
      <CateringCalculator />
      <CateringInquiry />
      <CateringFAQ />
    </div>
  );
}
