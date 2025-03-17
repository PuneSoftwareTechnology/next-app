import { RelatedCourse } from "@/util/interfaces/course";
import React from "react";
import Typography from "../atoms/Typography";
import Image from "next/image";
import Link from "next/link";
import ERROR_IMAGE from "../../assests/images/imageError.png";

interface Props {
  relatedCourses: RelatedCourse[];
}

export default function RelatedCourses({ relatedCourses }: Props) {
  return (
    <section className="px-4 lg:px-32 my-8">
      <header>
        <Typography variant="h2" as="h2" className="mb-4 text-center">
          Related Courses
        </Typography>
      </header>

      {relatedCourses.length === 0 ? (
        <Typography variant="h2" as="h2" className="text-gray-600 text-center">
          No related courses available.
        </Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {relatedCourses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.slug}`}
              className="text-blue-500 mt-2 inline-block shadow-md hover:scale-105 hover:shadow-xl"
            >
              <article className="border-l-4 border-blue-600 p-4 bg-gray-50 shadow-md">
                <Image
                  src={course.featured_image || ERROR_IMAGE}
                  alt={course.name}
                  className="w-full h-30 object-cover rounded-md"
                  width={500}
                  height={400}
                />
                <Typography variant="h5" as="h5" className="text-blue-700 mt-4">
                  {course.name}
                </Typography>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
