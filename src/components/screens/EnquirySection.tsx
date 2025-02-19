import { notFound } from "next/navigation";
import { getAllCourses } from "@/APIS/courses.services";
import EnquiryForm from "../orgnasims/Enquiryform";

export default async function EnquirySection() {
  const coursesData = (await getAllCourses()) || [];

  if (!coursesData) {
    notFound();
  }

  return <EnquiryForm courses={coursesData} />;
}
