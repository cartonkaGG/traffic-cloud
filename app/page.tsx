import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { PremiumShowcase } from "@/components/sections/PremiumShowcase";
import { PricingCalculator } from "@/components/sections/PricingCalculator";
import { Services } from "@/components/sections/Services";
import { MobileCalcFab } from "@/components/ui/MobileCalcFab";
import { HomeFooter } from "@/components/layout/HomeFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <PremiumShowcase />
      <Services />
      <PricingCalculator />
      <Contact />
      <HomeFooter />
      <MobileCalcFab />
    </>
  );
}
