import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/molecules/Header";
import Image from "next/image";
import Typography from "@/components/atoms/Typography";
import WhyChooseUs from "@/components/screens/WhyChooseUs";
import TestimonialsPage from "@/components/screens/Testomonials";
import FAQPage from "@/components/screens/Faq";
import Footer from "@/components/molecules/Footer";
import Link from "next/link";
import COURSE_IMAGE from "../../../assests/images/swe.webp";
import LOGO from "../../../assests/images/Logo.png";

// SEO Metadata
export const metadata: Metadata = {
  title: "Courses | Learn and Master Your Skills",
  description:
    "Explore a wide range of courses including SAP, Cloud, AI/ML, and more to advance your career.",
  keywords: ["Courses", "Learning", "SAP Training", "AI-ML", "Cloud Computing"],
};

const courses = [
  { name: "SAP FICO S4HANA", id: "sap-fico-s4hana" },
  { name: "SAP MM S4HANA", id: "sap-mm-s4hana" },
  { name: "SAP SD S4HANA", id: "sap-sd-s4hana" },
  { name: "SAP PP S4HANA", id: "sap-pp-s4hana" },
  { name: "SAP CO S4HANA", id: "sap-co-s4hana" },
  { name: "SAP EWM S4HANA", id: "sap-ewm-s4hana" },
];

// Define Params as a Promise
type Params = Promise<{ dynamicPage: string }>;

export default async function DynamicPage({ params }: { params: Params }) {
  // Await params to access dynamicPage
  const { dynamicPage } = await params;

  const content: Record<string, string> = {
    sap: "Learn about SAP and its applications.",
    cloud: "Discover cloud computing technologies.",
    "ai-ml": "Explore Artificial Intelligence and Machine Learning.",
    "data-analytics": "Learn Data analytics",
    "cyber-security": "Master Cyber Security practices.",
  };

  if (!content[dynamicPage]) {
    notFound(); // Show a 404 if content not found
  }

  return (
    <>
      <Header />
      <main className="mt-24 px-4 md:px-32">
        <div className="relative w-full mb-8" style={{ height: "calc(50vh)" }}>
          <Image
            src={COURSE_IMAGE}
            alt="course-image"
            fill
            className="object-cover"
          />
        </div>
        <Typography
          variant="h2"
          as="h2"
          className="font-[700] text-center mb-8"
        >
          Explore {content[dynamicPage]}
        </Typography>
        <Typography
          variant="h3"
          as="h3"
          className="bg-gray-400 text-white rounded-md py-1 my-4 w-full text-center uppercase"
        >
          SAP Functional Modules
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {courses.map((course, index) => (
            <Link
              key={index}
              href={`/course/${course.id}`}
              className="text-blue-500 mt-2 inline-block"
            >
              <div className="border rounded-md overflow-hidden shadow-lg group hover:bg-white transition-all duration-300">
                <div className="relative h-48 w-full">
                  <Image
                    alt="course-image"
                    src={LOGO}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Typography
                  variant="h6"
                  as="h6"
                  className="text-center py-2 bg-white group-hover:bg-gray-100 transition-all duration-300"
                >
                  {course.name}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
        <WhyChooseUs />
        <TestimonialsPage />
        <FAQPage />
      </main>
      <Footer />
    </>
  );
}
