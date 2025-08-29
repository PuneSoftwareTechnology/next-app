// pages/[dynamicPage].tsx

import { notFound } from "next/navigation";
import AllCoursesPage from "@/components/screens/AllCoursesPage";
import { pageIdMap } from "@/util/data/category";
import { Courses } from "@/util/interfaces/course";
import { BASE_URL } from "@/util/urls";
import { Suspense } from "react";
import GlobalLoader from "@/components/molecules/GlobalLoader";

const categoryMeta: Record<
  string,
  { title: string; description: string; keywords: string[]; heroImage: string }
> = {
  sap: {
    title: "SAP Courses | Master SAP Skills",
    description:
      "Learn SAP courses with practical experience and become an SAP professional.",
    keywords: ["SAP", "SAP Training", "ERP", "Business Management"],
    heroImage: "https://i.ibb.co/TxphCWx5/SAP-FUNCTIONAL-MODULE.jpg",
  },
  cloud: {
    title: "Cloud Computing Courses | AWS, Azure, GCP",
    description:
      "Discover cloud computing technologies and cloud certifications.",
    keywords: ["Cloud", "AWS", "Azure", "GCP", "Cloud Courses"],
    heroImage: "https://i.ibb.co/TxphCWx5/SAP-FUNCTIONAL-MODULE.jpg",
  },
  "artificial-intelligence": {
    title: "AI & ML Courses | Become an AI Expert",
    description:
      "Explore artificial-intelligence and Machine Learning with practical projects.",
    keywords: ["AI", "ML", "artificial-intelligence", "Machine Learning"],
    heroImage: "https://i.ibb.co/TxphCWx5/SAP-FUNCTIONAL-MODULE.jpg",
  },
  "data-analytics": {
    title: "Data Analytics Courses | Learn Data Science",
    description:
      "Master Data Analytics and Data Science with hands-on projects.",
    keywords: ["Data Analytics", "Data Science", "Power BI", "Tableau"],
    heroImage: "https://i.ibb.co/TxphCWx5/SAP-FUNCTIONAL-MODULE.jpg",
  },
  "cyber-security": {
    title: "Cyber Security Courses | Become a Security Expert",
    description: "Learn Cyber Security practices and ethical hacking.",
    keywords: ["Cyber Security", "Ethical Hacking", "Network Security"],
    heroImage: "https://i.ibb.co/TxphCWx5/SAP-FUNCTIONAL-MODULE.jpg",
  },
};

type Params = Promise<{ dynamicPage: string }>;

export default async function DynamicPage({ params }: { params: Params }) {
  const { dynamicPage } = await params;

  if (!pageIdMap[dynamicPage as keyof typeof pageIdMap]) notFound();

  const meta = categoryMeta[dynamicPage];
  if (!meta) notFound();

  const getAllCategoryCourses = async (): Promise<Courses[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/courses/all?category=${
          pageIdMap[dynamicPage as keyof typeof pageIdMap]
        }`,
        { cache: "no-store" }
      );
      if (!response.ok)
        throw new Error(`Failed to fetch Courses: ${response.statusText}`);
      const data = await response.json();
      return data?.success && Array.isArray(data.data) ? data.data : [];
    } catch (err) {
      console.error("Error fetching Courses:", err);
      return [];
    }
  };

  const coursesData = (await getAllCategoryCourses()) || [];

  const content: Record<string, string> = {
    sap: "Learn SAP courses with practical experience",
    cloud: "Discover cloud computing technologies",
    "artificial-intelligence":
      "Explore artificial-intelligence and Machine Learning",
    "data-analytics": "Learn Data analytics",
    "cyber-security": "Master Cyber Security practices",
  };

  return (
    <Suspense fallback={<GlobalLoader />}>
      <AllCoursesPage
        courses={coursesData}
        content={content[dynamicPage]}
        heroImage={meta.heroImage}
        heading={`${dynamicPage?.toUpperCase()} Modules`}
        category={pageIdMap[dynamicPage as keyof typeof pageIdMap]}
        meta={meta}
      />
    </Suspense>
  );
}
