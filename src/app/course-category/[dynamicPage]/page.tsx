import { Metadata } from "next";
import { notFound } from "next/navigation";
import COURSE_IMAGE from "../../../assests/images/swe.webp";
import { getAllCategoryCourses } from "@/APIS/courses.services";
import AllCoursesPage from "@/components/screens/AllCoursesPage";

// SEO Metadata
export const metadata: Metadata = {
  title: "Courses | Learn and Master Your Skills",
  description:
    "Explore a wide range of courses including SAP, Cloud, AI/ML, and more to advance your career.",
  keywords: ["Courses", "Learning", "SAP Training", "AI-ML", "Cloud Computing"],
};

const pageIdMap = {
  sap: "b1c39d04-e7b8-460b-90b0-e6b61570c026",
  cloud: "6b4afa78-f8a2-4059-8aad-f6320f90aa3c",
  "data-analytics": "e6114886-ed8d-47ba-aa26-a01227cf1507",
  "ai-ml": "d325428a-72fd-4cf2-b3a5-6f5ff6eb7d31",
  "cyber-security": "3f27131b-7f0e-46da-85ed-2f3c07d87953",
};

// Define Params as a Promise
type Params = Promise<{ dynamicPage: string }>;

export default async function DynamicPage({ params }: { params: Params }) {
  // Await params to access dynamicPage
  const { dynamicPage } = await params;

  const coursesData =
    (await getAllCategoryCourses(
      pageIdMap[dynamicPage as keyof typeof pageIdMap]
    )) || [];
  const content: Record<string, string> = {
    sap: "Learn about SAP and its applications.",
    cloud: "Discover cloud computing technologies.",
    "ai-ml": "Explore Artificial Intelligence and Machine Learning.",
    "data-analytics": "Learn Data analytics",
    "cyber-security": "Master Cyber Security practices.",
  };

  if (!content[dynamicPage]) {
    notFound();
  }

  return (
    <AllCoursesPage
      courses={coursesData}
      content={content[dynamicPage]}
      heroImage={COURSE_IMAGE}
      heading=" SAP Functional Modules"
    />
  );
}
