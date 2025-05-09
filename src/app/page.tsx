import Footer from "@/components/molecules/Footer";
import Header from "@/components/molecules/Header";
import HeroSection from "@/components/screens/HeroSection";
import ProgramHighlights from "@/components/screens/ProgramAdvantages";
import WhyChooseUs from "@/components/screens/WhyChooseUs";
import Courses from "@/components/screens/Courses";
import TestimonialsPage from "@/components/screens/Testomonials";
import PlacementPage from "@/components/screens/PlacementsPage";
import BlogSection from "@/components/screens/BlogSection";
import ContactButtons from "@/components/organisms/ContactButtons";
import EnquirySection from "@/components/screens/EnquirySection";
import { Metadata } from "next";

interface SearchParams {
  enquiry?: string;
}

interface PageProps {
  searchParams?: Promise<SearchParams>;
}

export const metadata: Metadata = {
  title: "Pune Software Technologies - IT Training Platform",
  description:
    "Join Pune Software Technologies for expert-led IT courses and hands-on training in Pune. Unlock your potential in web development, AI, and more.",
  openGraph: {
    title: "Pune Software Technologies - IT Training Platform",
    description:
      "Join Pune Software Technologies for expert-led IT courses and hands-on training in Pune.",
    url: "https://punesoftwaretechnologies.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pune Software Technologies Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pune Software Technologies - IT Training Platform",
    description:
      "Join Pune Software Technologies for expert-led IT courses and hands-on training in Pune.",
    images: ["/og-image.jpg"],
  },
};

export default async function HomePage({ searchParams }: PageProps) {
  const showModal = (await searchParams)?.enquiry === "true";

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Main Content */}
      <div>
        <Header />
        <HeroSection showModal={showModal} />
        <Courses />
        <ProgramHighlights />
        <WhyChooseUs />
        <BlogSection />
        <TestimonialsPage />
        <PlacementPage />
        <EnquirySection />
        <Footer />
      </div>
      <ContactButtons />
    </div>
  );
}
