import DeliveryQuestions from "@/components/location/DeliveryQuestions";
import DeliveryZones from "@/components/location/DeliveryZones";
import LocationsHero from "@/components/location/LocationsHero";
import ShopCard from "@/components/location/OurShops";


export default function LocationPage() {
  return (
    <div>
      <LocationsHero />
      <DeliveryZones />
      <ShopCard />
      <DeliveryQuestions />
    </div>
  );
}
