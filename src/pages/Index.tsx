import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SuccessCases from "@/components/SuccessCases";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SuccessCases />
      </main>
    </div>
  );
};

export default Index;
