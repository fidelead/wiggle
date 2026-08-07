import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import VideoCategoriesSection from "@/components/VideoCategoriesSection";
import SizeGuideBanner from "@/components/SizeGuideBanner";
import DualBanner from "@/components/DualBanner";
import DesignQuality from "@/components/DesignQuality";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      <Hero />
      <CategorySection />
      <VideoCategoriesSection />
      <SizeGuideBanner />
      <DualBanner />
      <DesignQuality />
    </div>
  );
}
