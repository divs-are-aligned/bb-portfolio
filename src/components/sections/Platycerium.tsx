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
