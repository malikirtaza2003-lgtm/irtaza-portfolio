import { HeroVideo } from "../ui/HeroVideo";
import { TopBar } from "../ui/TopBar";
import TaglineRotator from "../ui/TaglineRotator";
import { ChevronDown } from "lucide-react";
import { LiquidCta } from "../ui/LiquidCta";
import { TechCluster } from "../ui/TechCluster";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-[#000000] overflow-hidden">
      {/* Background Video Layer */}
      <HeroVideo />

      {/* Content Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-between px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1600px] mx-auto">
        
        {/* Left Side: Tagline & CTA */}
        <div className="pointer-events-auto w-full max-w-[90%] sm:max-w-[60%] lg:max-w-[50%] mt-12 sm:mt-0">
          <TaglineRotator />
          <div className="mt-10 sm:mt-12">
            <LiquidCta />
          </div>
        </div>

        {/* Right Side: Interactive Visual */}
        <div className="pointer-events-auto hidden lg:flex items-center justify-center w-[400px] h-[400px]">
          <TechCluster />
        </div>
      </div>

      {/* Navigation Layer */}
      <TopBar />

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none opacity-60">
        <span className="text-white text-xs sm:text-sm tracking-widest uppercase mb-1 font-medium">Scroll to explore</span>
        <div className="animate-pulse">
          <ChevronDown size={24} className="text-white" />
        </div>
      </div>
    </section>
  );
}
