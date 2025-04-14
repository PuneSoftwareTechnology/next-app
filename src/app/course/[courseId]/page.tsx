import Head from "next/head";
import { notFound } from "next/navigation";
import FullCoursePage from "@/components/screens/FullCoursePage";
import { FullCourseDetails } from "@/util/interfaces/course";
import { BASE_URL } from "@/util/urls";
import { Metadata } from "next";

type Params = Promise<{ courseId: string }>;

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

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { courseId } = await params;
  const courseDetails = await getFullCourseDetails(courseId);

  if (!courseDetails) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: `${courseDetails.course.name} | Pune Software Technologies`,
    description:
      courseDetails.course.description || "Learn more about this course.",
    openGraph: {
      title: courseDetails.course.name,
      description: courseDetails.course.description,
      images: [{ url: courseDetails.course.featured_image }],
    },
    twitter: {
      title: courseDetails.course.name,
      description: courseDetails.course.description,
      images: [{ url: courseDetails.course.featured_image }],
    },
  };
}

export default async function CourseDetail({ params }: { params: Params }) {
  const { courseId } = await params;

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
        <title> Learn SAP</title>
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
