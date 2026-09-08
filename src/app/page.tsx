import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfrastructureSection from "@/components/Infrastructure/InfrastructureSection";
import PlatformReveal from "@/components/PlatformReveal/PlatformReveal";
import ScaleSystemsSection from "@/components/ScaleSystems/ScaleSystems";
import TerravaFooter from "@/components/TerravaFooter/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-clip bg-[#f3f2ed]">

      {/* =====================================================
          HOME / HERO
          ===================================================== */}

      <section className="relative min-h-[100svh] w-full p-2 sm:p-3 md:min-h-screen md:p-4">
        <div className="relative h-[calc(100svh-1rem)] min-h-0 overflow-hidden rounded-[18px] sm:h-[calc(100svh-1.5rem)] sm:rounded-[22px] md:h-[calc(100vh-2rem)] md:min-h-[650px] md:rounded-[26px] lg:h-[calc(100vh-2.5rem)] lg:rounded-[28px]">
          <Hero />
          <Navbar />
        </div>
      </section>

      {/* =====================================================
          INFRASTRUCTURE
          ===================================================== */}

      <InfrastructureSection />

      {/* =====================================================
          PLATFORM
          ===================================================== */}

      <PlatformReveal />

      {/* =====================================================
          SCALE SYSTEMS
          ===================================================== */}

      <ScaleSystemsSection />

      {/* =====================================================
          TERRAVA FOOTER
          ===================================================== */}

      <TerravaFooter />    

      <div
        aria-hidden="true"
        className="h-0 w-full overflow-hidden"
      />
    </main>
  );
}