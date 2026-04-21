import {
  SectionWrapper,
  SectionHeading,
} from "@/components/shared/SectionWrapper";
import { PlatyceriumTree } from "./PlatyceriumTree";
import { PlatyceriumMap } from "./PlatyceriumMap";
import { PlatyceriumCatalog } from "./PlatyceriumCatalog";
import { PlatyceriumCare } from "./PlatyceriumCare";
import { PlatyceriumResources } from "./PlatyceriumResources";
import { PlatyceriumDedication } from "./PlatyceriumDedication";

export function Platycerium() {
  return (
    <SectionWrapper id="platycerium">
      <SectionHeading>Platycerium</SectionHeading>

      <p
        data-animate="section-body"
        className="mb-2 max-w-2xl text-muted-foreground leading-relaxed"
      >
        <span className="italic">Platycerium</span> is a genus of roughly 18
        accepted species of epiphytic ferns in the family Polypodiaceae,
        commonly known as staghorn or elkhorn ferns. Native to tropical and
        subtropical regions of Africa, Southeast Asia, Australia, and South
        America, they are distinguished by two frond types: sterile shield
        fronds that anchor the plant and fertile antler fronds that bear spores.
      </p>

      <p
        data-animate="section-body"
        className="mb-6 max-w-2xl text-muted-foreground leading-relaxed"
      >
        A growing catalog of staghorn ferns — notes on origin, care difficulty,
        propagation, and known hybrids. Intended as a practical reference for
        fellow Platycerium keepers.
      </p>

      <PlatyceriumDedication />

      <div className="mb-8">
        <PlatyceriumTree />
      </div>

      <div className="mb-8">
        <PlatyceriumMap />
      </div>

      <PlatyceriumCatalog />
      <PlatyceriumCare />
      <PlatyceriumResources />
    </SectionWrapper>
  );
}
