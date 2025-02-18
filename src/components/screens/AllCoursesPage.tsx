import React, { Suspense } from "react";
import Head from "next/head";
import GlobalLoader from "../molecules/GlobalLoader";
import Image, { StaticImageData } from "next/image";
import Typography from "../atoms/Typography";
import Link from "next/link";
import Header from "../molecules/Header";
import WhyChooseUs from "./WhyChooseUs";
import TestimonialsPage from "./Testomonials";
import FAQPage from "./Faq";
import BlogSection from "./BlogSection";
import Footer from "../molecules/Footer";
import { Courses } from "@/util/interfaces/course";
import PrimaryButton from "../atoms/PrimaryButton";

interface AllCoursesPageProps {
  courses: Courses[];
  content: string;
  heroImage: string | StaticImageData;
  heading: string;
}

const AllCoursesPage: React.FC<AllCoursesPageProps> = ({
  courses,
  content,
  heroImage,
  heading,
}) => {
  return (
    <>
      <Head>
        <title>All Courses | Pune Software Technologies</title>
        <meta
          name="description"
          content="Explore a wide range of courses including SAP, Cloud, AI/ML, and more to advance your career."
        />
        <meta
          name="keywords"
          content="Courses, Learning, SAP Training, AI-ML, Cloud Computing"
        />
        <meta name="author" content="Pune Software Technologies" />
        <meta
          property="og:title"
          content="All Courses | Pune Software Technologies"
        />
        <meta
          property="og:description"
          content="Explore a wide range of courses including SAP, Cloud, AI/ML, and more to advance your career."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/all-courses" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/assets/courses-banner.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="All Courses | Pune Software Technologies"
        />
        <meta
          name="twitter:description"
          content="Explore a wide range of courses including SAP, Cloud, AI/ML, and more to advance your career."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/assets/courses-banner.jpg"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/all-courses" />
      </Head>
      <Suspense fallback={<GlobalLoader />}>
        <Header />
        <main className="mt-24 px-4 md:px-32">
          <div
            className="relative w-full mb-8"
            style={{ height: "calc(50vh)" }}
          >
            <Image
              src={heroImage}
              alt="course-image"
              fill
              className="object-cover"
            />
          </div>
          <Typography
            variant="h2"
            as="h2"
            className="font-[700] text-center mb-8"
          >
            Explore {content}
          </Typography>

          <Typography
            variant="h3"
            as="h3"
            className="bg-gray-400 text-white rounded-md py-1 my-4 w-full text-center uppercase"
          >
            {heading}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {courses.map((course, index) => (
              <Link
                key={index}
                href={`/course/${course.id}`}
                className="text-blue-500 mt-2 inline-block"
              >
                <div className="border rounded-md overflow-hidden shadow-lg group hover:bg-white transition-all duration-300">
                  <div className="relative h-48 w-full">
                    <Image
                      alt="course-image"
                      src={course.featured_image}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <Typography
                    variant="h6"
                    as="h6"
                    className="text-center py-2 bg-white group-hover:bg-gray-100 transition-all duration-300"
                  >
                    {course.name}
                  </Typography>

                  <Link
                    href={`/course/${course.slug}`}
                    className="bg-blue-600 w-fit my-4 text-white rounded-md px-4 py-2 mx-auto flex justify-center items-center hover:bg-blue-700 transition"
                    aria-label="Read all blogs"
                  >
                    <Typography variant="h6" className="text-white ">
                      Read Full Blog
                    </Typography>
                  </Link>
                </div>
              </Link>
            ))}
          </div>
          <WhyChooseUs />
          <TestimonialsPage />
          <FAQPage />
          <BlogSection />
        </main>
        <Footer />
      </Suspense>
    </>
  );
};

export default AllCoursesPage;
