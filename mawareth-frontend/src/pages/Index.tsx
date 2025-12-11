import { PageContainer } from "@/components/layout/PageContainer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { ServiceGrid } from "@/components/landing/ServiceGrid";
import { TrustSection } from "@/components/landing/TrustSection";

const Index = () => {
  return (
    <PageContainer>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ServiceGrid />
      <TrustSection />
    </PageContainer>
  );
};

export default Index;
