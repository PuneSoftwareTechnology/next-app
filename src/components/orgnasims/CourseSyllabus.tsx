"use client";

import { Module } from "@/util/interfaces/course";
import { useState } from "react";
import Typography from "../atoms/Typography";
import { ImArrowRight } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { GrFormSubtract } from "react-icons/gr";

interface Course {
  courses_syllabus: Module[];
}

interface Props {
  category: string;
  syllabus: Course[];
  prerequisites: string[];
}

export default function CourseSyllabus({
  syllabus,
  prerequisites,
  category,
}: Props) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggleModule = (index: number) => {
    setOpenIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="px-4 lg:px-32 p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-x-2  mb-4 ">
        <Typography variant="h2" as="h2" className="text-center">
          {category}
        </Typography>
        <Typography variant="h2" as="h2" className="text-gray-900 text-center">
          Course Syllabus
        </Typography>
      </div>

      {/* Prerequisites Section */}
      <div className="mb-6">
        <Typography variant="h3" as="h3">
          Prerequisites
        </Typography>
        <div className="mt-4">
          {prerequisites.map((item, index) => (
            <span
              key={index}
              className="flex justify-start items-start gap-x-2 mb-2 text-gray-700"
            >
              <span>
                <ImArrowRight size={12} className="text-green-400 mt-1" />
              </span>
              <Typography variant="h6" as="h6">
                {item}
              </Typography>
            </span>
          ))}
        </div>
      </div>

      {/* Course Syllabus Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-x-2 mb-4 ">
        <Typography variant="h2" as="h2" className="text-center">
          {category}
        </Typography>
        <Typography
          variant="h2"
          as="h2"
          id="syllabus-heading"
          className="text-gray-900 text-center"
        >
          Syllabus Content
        </Typography>
      </div>

      <div className="border-2 border-gray-300 rounded-lg">
        {syllabus.map((course) =>
          course.courses_syllabus.map((module, index) => (
            <div key={index} className="border-b-2 border-gray-300">
              <div
                className="w-full p-3 flex justify-between items-center bg-blue-100 text-left cursor-pointer"
                onClick={() => toggleModule(index)}
              >
                <Typography variant="h6" as="h6" id={`module-name-${index}`}>
                  {module.module_name}
                </Typography>
                <span className="text-gray-500">
                  {openIndexes.has(index) ? (
                    <GrFormSubtract size={24} color="black" />
                  ) : (
                    <MdAdd size={24} color="black" />
                  )}
                </span>
              </div>

              {openIndexes.has(index) && (
                <div className="p-3 bg-white border-t">
                  {module.lessons.map((lesson, i) => (
                    <span
                      className="flex justify-start items-center text-gray-700"
                      key={i}
                    >
                      ✅ {lesson}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
