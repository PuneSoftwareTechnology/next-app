import TestimonialForm from "@/components/screens/TestimonialForm";
import { Course } from "@/util/interfaces/course";
import { BASE_URL } from "@/util/urls";
import Head from "next/head";

export const dynamic = "force-dynamic";

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

export default async function AddTestimonialPage() {
  const courses = await getAllCourses();

  return (
    <>
      <Head>
        <title>Add Testimonial</title>
        <meta name="description" content="Add your testimonial" />
        <meta
          name="keywords"
          content="testimonial, feedback, course, category"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/add-testimonial" />
      </Head>
      <TestimonialForm courses={courses || []} />
    </>
  );
}
