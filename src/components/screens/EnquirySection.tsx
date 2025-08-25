import { notFound } from "next/navigation";
import EnquiryForm from "../orgnasims/Enquiryform";
import { BASE_URL } from "@/util/urls";
import { Course } from "@/util/interfaces/course";
import { Suspense } from "react";
import Loader from "../atoms/Loader";

export const dynamic = "force-dynamic";

// Fetch course data from API
const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(`${BASE_URL}/courses/all-course-names`, {
      cache: "no-store", // 🚀 Ensures fresh data on every request
    });

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

// Define props interface
interface EnquirySectionProps {
  showModal?: boolean;
}

export default async function EnquirySection({
  showModal,
}: EnquirySectionProps) {
  const coursesData = await getAllCourses();

  if (!coursesData || coursesData.length === 0) {
    notFound();
  }

  return (
    <Suspense
      fallback={<Loader size="large" className="mx-auto border-gray-800" />}
    >
      <EnquiryForm courses={coursesData} showModal={showModal || false} />;
    </Suspense>
  );
}
