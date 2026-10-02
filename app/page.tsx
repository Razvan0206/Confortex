import { BrandsCerts } from "@/components/BrandsCerts";
import { CapacityScale } from "@/components/CapacityScale";
import { Domains } from "@/components/Domains";
import { FeaturedRefs } from "@/components/FeaturedRefs";
import { Hero } from "@/components/Hero";
import { ProductGroups } from "@/components/ProductGroups";
import { ProofStrip } from "@/components/ProofStrip";
import { QuoteBand } from "@/components/QuoteBand";
import { ServicesList } from "@/components/ServicesList";

// .cv-sections (globals.css): the content of below-the-fold sections skips layout and paint until it nears the viewport,
// which cut the first paint from 1.3 s to 0.2 s. Safe here: the home page has no hash anchors (Raf Gym broke anchors with it).
export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <div className="cv-sections">
        <Domains />
        <ServicesList compact />
        <CapacityScale />
        <ProductGroups />
        <FeaturedRefs />
        <BrandsCerts />
        <QuoteBand />
      </div>
    </>
  );
}
