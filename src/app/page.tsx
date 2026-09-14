import { HeroSection } from "@/components/sections/HeroSection";
import { Preloader } from "@/components/ui/Preloader";
import { MyWork } from "@/components/ui/my-work-scroll";
import { AboutMe } from "@/components/ui/about-me";
import { Testimonials } from "@/components/ui/testimonials";
import { Cta69 } from "@/components/ui/cta69";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Preloader />
      
      {/* Invisible tracker that scrolls normally (not sticky) to power the hero video reset observer */}
      <div id="hero-tracker" className="absolute top-0 z-0 h-screen w-full pointer-events-none" />

      {/* Wrapper for parallax overlap effect */}
      <section className="sticky top-0 z-0 h-screen w-full">
        <HeroSection />
      </section>
      
      <MyWork />
      <AboutMe />
      <Testimonials />
      <Cta69 />
    </main>
  );
}
