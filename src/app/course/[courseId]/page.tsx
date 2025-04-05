import Head from "next/head";
import { notFound } from "next/navigation";
import FullCoursePage from "@/components/screens/FullCoursePage";
import { FullCourseDetails } from "@/util/interfaces/course";
import { BASE_URL } from "@/util/urls";

const getFullCourseDetails = async (
  slug: string
): Promise<FullCourseDetails | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/courses/get-course-details?slug=${slug}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Course: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.success && typeof data.data === "object" ? data.data : null;
  } catch (err) {
    console.error("Error fetching Course:", err);
    return null;
  }
};

export default async function CourseDetail({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = params;

  if (typeof courseId !== "string") {
    notFound();
  }

  const courseDetails = await getFullCourseDetails(courseId);

  if (!courseDetails) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>Learn SAP</title>
        <meta
          name="description"
          content={courseDetails.course.description || "Course Description"}
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <FullCoursePage courseDetails={courseDetails} />
    </>
  );
}
