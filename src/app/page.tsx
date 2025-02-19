import Footer from "@/components/molecules/Footer";
import Header from "@/components/molecules/Header";
import HeroSection from "@/components/screens/HeroSection";
import ProgramHighlights from "@/components/screens/ProgramAdvantages";
import WhyChooseUs from "@/components/screens/WhyChooseUs";
import Courses from "@/components/screens/Courses";
import TestimonialsPage from "@/components/screens/Testomonials";
import PlacementPage from "@/components/screens/PlacementsPage";
import EnquiryForm from "@/components/screens/Enquiryform";
import BlogSection from "@/components/screens/BlogSection";
import ContactButtons from "@/components/organisms/ContactButtons"; // Import the new component

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Main Content */}
      <div>
        <Header />
        <HeroSection />
        <Courses />
        <ProgramHighlights />
        <WhyChooseUs />
        <BlogSection />
        <TestimonialsPage />
        <PlacementPage />
        <EnquiryForm />
        <Footer />
      </div>
      <ContactButtons />
    </div>
  );
};

export default HomePage;
