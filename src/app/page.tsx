import Footer from "@/components/molecules/Footer";
import Header from "@/components/molecules/Header";
import { IoCall } from "react-icons/io5";
import { SiWhatsapp } from "react-icons/si";
import { ReactElement, Suspense } from "react";
import HeroSection from "@/components/screens/HeroSection";
import ProgramHighlights from "@/components/screens/ProgramAdvantages";
import WhyChooseUs from "@/components/screens/WhyChooseUs";
import Courses from "@/components/screens/Courses";
import TestimonialsPage from "@/components/screens/Testomonials";
import PlacementPage from "@/components/screens/PlacementsPage";
import EnquiryForm from "@/components/screens/Enquiryform";
import BlogSection from "@/components/screens/BlogSection";
import GlobalLoader from "@/components/molecules/GlobalLoader";

type ContactButton = {
  href: string;
  icon: ReactElement;
  bgColor: string;
  ariaLabel: string;
};

const HomePage = () => {
  const contactButtons: ContactButton[] = [
    {
      href: "tel:+919175599880",
      icon: <IoCall size={30} />,
      bgColor: "bg-blue-600",
      ariaLabel: "Call Us",
    },
    {
      href: "https://wa.me/9175599880",
      icon: <SiWhatsapp size={30} />,
      bgColor: "bg-green-500",
      ariaLabel: "Message us on WhatsApp",
    },
  ];

  return (
    <Suspense fallback={<GlobalLoader />}>
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

        {/* Floating Contact Buttons */}
        <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-2 md:space-y-4">
          {contactButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`group ${button.bgColor} text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-110 hover:opacity-80 relative`}
              aria-label={button.ariaLabel}
            >
              {button.icon}
            </a>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default HomePage;
