import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SamplesSection from "@/components/SamplesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GlobalReachSection from "@/components/GlobalReachSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SamplesSection />
      <TestimonialsSection />
      <GlobalReachSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
