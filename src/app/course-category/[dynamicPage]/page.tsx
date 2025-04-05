import { Metadata } from "next";
import { notFound } from "next/navigation";
import COURSE_IMAGE from "../../../assests/images/swe.webp";
import AllCoursesPage from "@/components/screens/AllCoursesPage";
import { pageIdMap } from "@/util/data/category";
import { Courses } from "@/util/interfaces/course";
import { BASE_URL } from "@/util/urls";

export const metadata: Metadata = {
  title: "Courses | Learn and Master Your Skills",
  description:
    "Explore a wide range of courses including SAP, Cloud, AI/ML, and more to advance your career.",
  keywords: ["Courses", "Learning", "SAP Training", "AI-ML", "Cloud Computing"],
};

type Params = Promise<{ dynamicPage: string }>;

export default async function DynamicPage({ params }: { params: Params }) {
  const { dynamicPage } = await params;

  const getAllCategoryCourses = async (): Promise<Courses[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/courses/all?category=${
          pageIdMap[dynamicPage as keyof typeof pageIdMap]
        }`,
        {
          cache: "no-store", 
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch Courses: ${response.statusText}`);
      }

      const data = await response.json();
      return data?.success && Array.isArray(data.data) ? data.data : [];
    } catch (err) {
      console.error("Error fetching Courses:", err);
      return [];
    }
  };

  const coursesData = (await getAllCategoryCourses()) || [];

  const content: Record<string, string> = {
    sap: "Learn SAP courses with practical experience ",
    cloud: "Discover cloud computing technologies",
    "ai-ml": "Explore Artificial Intelligence and Machine Learning",
    "data-analytics": "Learn Data analytics",
    "cyber-security": "Master Cyber Security practices",
  };

  if (!content[dynamicPage]) {
    notFound();
  }

  return (
    <AllCoursesPage
      courses={coursesData}
      content={content[dynamicPage]}
      heroImage={COURSE_IMAGE}
      heading={`${dynamicPage?.toUpperCase()} Modules`}
    />
  );
}
