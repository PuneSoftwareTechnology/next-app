import { Job } from "@/util/interfaces/course";
import React from "react";
import Typography from "../atoms/Typography";

interface Props {
  jobs: Job[];
  category: string;
}

export default function CourseJobs({ jobs, category }: Props) {
  return (
    <section className="max-w-5xl mx-auto p-4">
      <header>
        <Typography variant="h4" as="h4" className="mb-4">
          {category} Job Roles
        </Typography>
      </header>

      {jobs.length === 0 ? (
        <Typography variant="h4" as="h4" className="text-gray-600">
          No jobs available.
        </Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="border-l-4 border-blue-600 p-4 bg-gray-50 shadow-md"
            >
              <Typography variant="h6" as="h6" className="text-blue-700">
                {job.name}
              </Typography>
              <Typography
                variant="p"
                as="p"
                className="text-gray-700 mt-2 text-sm"
              >
                {job.description}
              </Typography>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
