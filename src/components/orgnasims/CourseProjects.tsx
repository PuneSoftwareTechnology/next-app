import { Project } from "@/util/interfaces/course";
import React from "react";
import Typography from "../atoms/Typography";

interface Props {
  projects: Project[];
}

export default function CourseProjects({ projects }: Props) {
  return (
    <section className="max-w-2xl mx-auto p-4">
      <Typography variant="h3" as="h3" className="mb-4">
        Learn By Doing Real World Projects
      </Typography>

      {projects.length === 0 ? (
        <Typography variant="h5" as="h5" className="text-gray-600">
          No projects available.
        </Typography>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className=" border border-gray-300 rounded-lg bg-gray-50 shadow-md"
            >
              <Typography
                variant="h5"
                as="h5"
                className="text-gray-900 bg-gray-300 rounded-tl-lg rounded-tr-lg px-4 py-2"
              >
                {project.name}
              </Typography>
              <Typography
                variant="p"
                as="p"
                className="text-gray-700 mt-1 px-4 py-2"
              >
                {project.description}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
