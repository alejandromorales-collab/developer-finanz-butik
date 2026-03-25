import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PromoCards from "@/components/PromoCards";
import SocialProof from "@/components/SocialProof";
import ProductCategories from "@/components/ProductCategories";
import FeaturesSection from "@/components/FeaturesSection";
import SuccessCases from "@/components/SuccessCases";
import FeaturedVendors from "@/components/FeaturedVendors";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PromoCards />
        <SocialProof />
        <ProductCategories />
        <FeaturesSection />
        <SuccessCases />
        <FeaturedVendors />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
