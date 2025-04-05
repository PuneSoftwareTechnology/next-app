import { notFound } from "next/navigation";
import EnquiryForm from "../orgnasims/Enquiryform";
import { BASE_URL } from "@/util/urls";
import { Course } from "@/util/interfaces/course";

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

export default async function EnquirySection() {
  const coursesData = (await getAllCourses()) || [];

  if (!coursesData) {
    notFound();
  }

  return <EnquiryForm courses={coursesData} />;
}
