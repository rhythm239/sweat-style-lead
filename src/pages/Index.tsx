import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import PackagesSection from "@/components/PackagesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CategoriesSection />
      <PackagesSection />
      <Footer />
    </div>
  );
};

export default Index;
