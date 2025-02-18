import Head from "next/head";
import { notFound } from "next/navigation";
import { getFullCourseDetails } from "@/APIS/courses.services";
import FullCoursePage from "@/components/screens/FullCoursePage";

type Params = Promise<{ courseId: string }>;

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
        <meta name="description" content={"course.description"} />
        <meta name="robots" content="index, follow" />
      </Head>

      <FullCoursePage courseDetails={courseDetails} />
    </>
  );
}
