import { Metadata } from "next";
import { notFound } from "next/navigation";
import COURSE_IMAGE from "../../../assests/images/swe.webp";
import { getAllCategoryCourses } from "@/APIS/courses.services";
import AllCoursesPage from "@/components/screens/AllCoursesPage";
import { pageIdMap } from "@/util/data/category";

export const metadata: Metadata = {
  title: "Courses | Learn and Master Your Skills",
  description:
    "Explore a wide range of courses including SAP, Cloud, AI/ML, and more to advance your career.",
  keywords: ["Courses", "Learning", "SAP Training", "AI-ML", "Cloud Computing"],
};

type Params = Promise<{ dynamicPage: string }>;

export default async function DynamicPage({ params }: { params: Params }) {
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
      heading={`${dynamicPage?.toUpperCase()} Functional Modules`}
    />
  );
}
