import React, { Suspense } from "react";
import Head from "next/head";
import GlobalLoader from "../molecules/GlobalLoader";
import Image, { StaticImageData } from "next/image";
import Typography from "../atoms/Typography";
import Link from "next/link";
import Header from "../molecules/Header";
import WhyChooseUs from "./WhyChooseUs";
import TestimonialsPage from "./Testomonials";
import BlogSection from "./BlogSection";
import Footer from "../molecules/Footer";
import { Courses } from "@/util/interfaces/course";
import ContactButtons from "../organisms/ContactButtons";
import ERROR_IMAGE from "../../assests/images/imageError.png";
import EnquirySection from "./EnquirySection";
import FAQPage from "./Faq";
import Script from "next/script";

interface AllCoursesPageProps {
  courses: Courses[];
  content: string;
  heroImage: string | StaticImageData;
  heading: string;
  category?: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    heroImage: string;
  };
}

const AllCoursesPage: React.FC<AllCoursesPageProps> = ({
  courses,
  content,
  heroImage,
  heading,
  category,
  meta,
}) => {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(", ")} />
        <meta name="author" content="Pune Software Technologies" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://punesoftwaretechnologies.com/course-category/${category}`}
        />
        <meta property="og:image" content={meta.heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.heroImage} />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`https://punesoftwaretechnologies.com/course-category/${category}`}
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-36X2FRJ5W4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-36X2FRJ5W4');
        `}
      </Script>
      <Suspense fallback={<GlobalLoader />}>
        <Header />
        <main className="mt-24">
          <div
            className="relative mx-4 lg:mx-32 mb-8"
            style={{ height: "calc(50vh)" }}
          >
            <Image
              src={heroImage}
              alt="course-image"
              fill
              className="object-cover"
            />
          </div>
          <section className=" px-4 lg:px-32">
            <Typography
              variant="h2"
              as="h2"
              className="font-[700] text-center mb-8"
            >
              {content}
            </Typography>

            <Typography
              variant="h3"
              as="h3"
              className="bg-blue-900 text-white rounded-md py-3 my-4 w-full text-center uppercase px-4"
            >
              {heading}
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {courses.map((course, index) => (
                <Link
                  key={index}
                  href={`/course/${course.slug}`}
                  className="text-blue-500 mt-2 inline-block"
                  aria-label="Read all blogs"
                >
                  <div className="border rounded-md overflow-hidden shadow-lg group shadow-md hover:shadow-lg transition-shadow  hover:scale-105 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 w-full">
                      <Image
                        alt="course-image"
                        src={course.featured_image || ERROR_IMAGE}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <Typography
                      variant="h4"
                      as="h4"
                      className="text-center py-2 bg-white"
                    >
                      {course.name}
                    </Typography>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <WhyChooseUs />
          <TestimonialsPage categoryId={category} />
          {/* Updated to use mandatory categoryId */}
          <FAQPage category={category} />
          {/* Updated to use mandatory categoryId */}
          <BlogSection category={category} />
          <EnquirySection />
        </main>
        <Footer />
        <ContactButtons />
      </Suspense>
    </>
  );
};

export default AllCoursesPage;
