import { FullCourseDetails } from "@/util/interfaces/course";
import React from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Typography from "../atoms/Typography";
import Image from "next/image";
import TrainingProcedure from "../orgnasims/TrainingProcedure";
import CourseModules from "../orgnasims/CourseModules";
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

      <section className=" mt-20 bg-white  px-6 py-8 md:px-32 ">
        <div className="flex justify-between items-start gap-x-8 flex-grow">
          <div className="mt-4 lg:mt-8">
            <Typography variant="h3" as="h3">
              {courseDetails?.course?.name}
            </Typography>
            <div className="mt-4">
              {courseDetails?.course?.intro?.map((item, index) => (
                <Typography variant="p" as="p" key={index}>
                  ✅ {item}
                </Typography>
              ))}
            </div>
          </div>
          <Image
            src={courseDetails?.course?.featured_image || ERROR_IMAGE}
            alt="course-image"
            height={400}
            width={600}
            className="object-cover rounded-xl"
          />
        </div>
        <Typography variant="p" as="p" className="mt-8">
          {courseDetails?.course?.description}
        </Typography>
      </section>
      {courseDetails?.course?.training_procedure && <TrainingProcedure />}
      {courseDetails?.course?.modules?.length > 0 && (
        <CourseModules
          modules={courseDetails?.course?.modules}
          module_heading={courseDetails?.course?.module_heading}
        />
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
