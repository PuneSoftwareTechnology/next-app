import { FullCourseDetails } from "@/util/interfaces/course";
import React from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Typography from "../atoms/Typography";
import Image from "next/image";
import TrainingProcedure from "../orgnasims/TrainingProcedure";
import ProgramHighlights from "./ProgramAdvantages";
import CourseSyllabus from "../orgnasims/CourseSyllabus";
import CourseProjects from "../orgnasims/CourseProjects";
import CourseJobs from "../orgnasims/CourseJobs";
import PlacementsPage from "./PlacementsPage";
import RelatedCourses from "../orgnasims/RelatedCourses";
import Testimonials from "../orgnasims/Testimonial";
import BlogsPage from "../orgnasims/Blogs";
import { categoryIdMap } from "@/util/data/category";
import FaqSection from "../orgnasims/FaqSection";
import ContactButtons from "../organisms/ContactButtons";
import EnquirySection from "./EnquirySection";
import ERROR_IMAGE from "../../assests/images/imageError.png";

interface CoursePageProps {
  courseDetails: FullCourseDetails;
}

const FullCoursePage: React.FC<CoursePageProps> = ({ courseDetails }) => {
  const category =
    categoryIdMap[
      courseDetails?.course?.user_email as keyof typeof categoryIdMap
    ];
  return (
    <>
      <Header />

      <section className=" mt-20 bg-white  px-4 py-8 md:px-32 ">
        <div className="flex flex-col lg:flex-row-reverse justify-between items-start gap-x-8">
          <Image
            src={courseDetails?.course?.featured_image || ERROR_IMAGE}
            alt="course-image"
            height={400}
            width={600}
            className="object-cover rounded-xl"
          />
          <div className="mt-4 lg:mt-8">
            <Typography variant="h2" as="h2">
              {courseDetails?.course?.name}
            </Typography>
            <div className="mt-4 ">
              {Array.isArray(courseDetails?.course?.intro)
                ? courseDetails.course.intro.map((item, index) => (
                    <span
                      className="flex justify-start items-start gap-x-2 mb-2"
                      key={index}
                    >
                      <Typography variant="h6" as="h6" className="mt-1 lg:mt-0">
                        ✅
                      </Typography>
                      <Typography variant="h6" as="h6">
                        {item}
                      </Typography>
                    </span>
                  ))
                : courseDetails?.course?.intro && (
                    <span className="flex justify-start items-start gap-x-2 mb-2">
                      <Typography variant="h6" as="h6" className="mt-1 lg:mt-0">
                        ✅
                      </Typography>
                      <Typography variant="h6" as="h6">
                        {courseDetails.course.intro}
                      </Typography>
                    </span>
                  )}
            </div>
          </div>
        </div>
      </section>
      {courseDetails?.course?.training_procedure && (
        <TrainingProcedure courseDesc={courseDetails?.course?.description} />
      )}

      <ProgramHighlights />
      {courseDetails?.course?.prerequisite?.length > 0 && (
        <CourseSyllabus
          category={category}
          prerequisites={courseDetails?.course?.prerequisite}
          syllabus={courseDetails?.syllabus}
        />
      )}
      {courseDetails?.projects?.length > 0 && (
        <CourseProjects projects={courseDetails?.projects} />
      )}
      {courseDetails?.jobs?.length > 0 && (
        <CourseJobs jobs={courseDetails?.jobs} category={category} />
      )}
      {courseDetails?.faqs?.length > 0 && (
        <FaqSection faqs={courseDetails?.faqs} />
      )}
      {courseDetails?.testimonials?.length > 0 && (
        <Testimonials testimonials={courseDetails?.testimonials} />
      )}
      <PlacementsPage />
      {courseDetails?.blogs?.length > 0 && (
        <BlogsPage blogs={courseDetails?.blogs} />
      )}
      {courseDetails?.course?.related_courses?.length > 0 && (
        <RelatedCourses
          relatedCourses={courseDetails?.course?.related_courses}
        />
      )}
      <EnquirySection />
      <Footer />
      <ContactButtons />
    </>
  );
};

export default FullCoursePage;
