import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { PremiumShowcase } from "@/components/sections/PremiumShowcase";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { StudioTeaser } from "@/components/sections/StudioTeaser";
import { HomeFooter } from "@/components/layout/HomeFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <PremiumShowcase />
      <StudioTeaser />
      <Process />
      <Contact />
      <HomeFooter />
    </>
  );
}
