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
    <section className="max-w-5xl mx-auto p-4">
      <header>
        <Typography variant="h4" as="h4" className="mb-4">
          Related Courses
        </Typography>
      </header>

      {relatedCourses.length === 0 ? (
        <Typography variant="h4" as="h4" className="text-gray-600">
          No related courses available.
        </Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCourses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.slug}`}
              className="text-blue-500 mt-2 inline-block"
            >
              <article className="border-l-4 border-blue-600 p-4 bg-gray-50 shadow-md">
                <Image
                  src={course.featured_image || ERROR_IMAGE}
                  alt={course.name}
                  className="w-full h-32 object-cover rounded-md"
                  width={500}
                  height={300}
                />
                <Typography variant="h6" as="h6" className="text-blue-700 mt-4">
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
