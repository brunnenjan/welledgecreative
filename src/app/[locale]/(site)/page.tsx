import Header from "@/components/Header";
import SectionProgressNav from "@/components/SectionProgressNav";
import BucketHero from "@/components/BucketHero";
import DiscoverParallax from "@/components/DiscoverParallax";
import IntroSection from "@/components/IntroSection";
import ProfileParallaxSimple from "@/components/ProfileParallaxSimple";
import ProfileContent from "@/components/ProfileContent";
import HowIWork from "@/sections/HowIWork";
import DesignParallax from "@/components/DesignParallax";
import DesignContent from "@/components/DesignContent";
import MyWork from "@/sections/MyWork";
import LogosAndBranding from "@/sections/LogosAndBranding";
import DeliverParallax from "@/components/DeliverParallax";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import HomeDiscoveryCTA from "@/components/HomeDiscoveryCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <SectionProgressNav />
      <BucketHero />
      <IntroSection />
      <ProfileParallaxSimple />
      <ProfileContent />
      <DiscoverParallax />
      <HowIWork />
      <DesignParallax />
      <DesignContent />
      <MyWork />
      <LogosAndBranding />
      <DeliverParallax />
      <TestimonialsSection />
      <ContactSection />
      <HomeDiscoveryCTA />
      <Footer />
    </>
  );
}
