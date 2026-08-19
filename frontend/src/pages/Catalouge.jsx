import { vehicles } from "@/data/vehicles";
import VehicleCard from "@/components/VehicleCard.jsx";
import {
  Section,
  SectionHeading,
  StaggerGrid,
  StaggerItem,
} from "@/components/Primitives.jsx";

function CataloguePage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Catalogue"
        title="Explore our electric vehicles"
        subtitle="Browse the complete EVNexus vehicle collection."
      />

      <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <StaggerItem key={vehicle.id} className="h-full">
            <VehicleCard vehicle={vehicle} />
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}

export default CataloguePage;