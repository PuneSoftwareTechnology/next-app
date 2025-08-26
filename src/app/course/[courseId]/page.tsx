import { notFound } from "next/navigation";
import FullCoursePage from "@/components/screens/FullCoursePage";
import { FullCourseDetails } from "@/util/interfaces/course";
import { Metadata } from "next";
import { Suspense } from "react";
import GlobalLoader from "@/components/molecules/GlobalLoader";
import { BASE_URL } from "@/util/urls";

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
    title: `${courseDetails?.course?.name} | Pune Software Technologies`,
    description: courseDetails?.course?.meta_desc,
    alternates: {
      canonical: `https://punesoftwaretechnologies.com/course/${courseId}`,
    },
    openGraph: {
      title: courseDetails?.course?.name,
      description: courseDetails?.course?.meta_desc,
      url: `https://punesoftwaretechnologies.com/course/${courseId}`,
      type: "website",
      images: [
        {
          url: courseDetails?.course?.featured_image || "/default-course.png",
          alt: courseDetails?.course?.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: courseDetails?.course?.name,
      description: courseDetails?.course?.meta_desc,
      images: [courseDetails?.course?.featured_image || "/default-course.png"],
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

  const { course } = courseDetails;

  // ✅ JSON-LD with expanded fields
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: `https://punesoftwaretechnologies.com/course/${courseId}`,
    courseCode: courseId,
    provider: {
      "@type": "Organization",
      name: "Pune Software Technologies",
      sameAs: "https://punesoftwaretechnologies.com",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `https://punesoftwaretechnologies.com/course/${courseId}`,
    },
  };

  return (
    <Suspense fallback={<GlobalLoader />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FullCoursePage courseDetails={courseDetails} />
    </Suspense>
  );
}
