import { getAllCategories, getAllCourses } from "@/APIS/courses.services";
import TestimonialForm from "@/components/screens/TestimonialForm";
import Head from "next/head";

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
