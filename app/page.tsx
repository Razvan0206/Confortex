import { BrandsCerts } from "@/components/BrandsCerts";
import { CapacityScale } from "@/components/CapacityScale";
import { Domains } from "@/components/Domains";
import { FeaturedRefs } from "@/components/FeaturedRefs";
import { Hero } from "@/components/Hero";
import { ProductGroups } from "@/components/ProductGroups";
import { ProofStrip } from "@/components/ProofStrip";
import { QuoteBand } from "@/components/QuoteBand";
import { ServicesList } from "@/components/ServicesList";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Domains />
      <ServicesList compact />
      <CapacityScale />
      <ProductGroups />
      <FeaturedRefs />
      <BrandsCerts />
      <QuoteBand />
    </>
  );
}
