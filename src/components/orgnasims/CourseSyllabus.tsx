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
    <section className="max-w-2xl mx-auto p-4">
      <div className="flex justify-start items-center gap-x-1 mb-4">
        <Typography
          variant="h3"
          as="h3"
          className="text-gray-900 underline decoration-yellow-400 decoration-4"
        >
          {category}
        </Typography>
        <Typography variant="h3" as="h3" className="text-gray-900">
          Training Course Syllabus
        </Typography>
      </div>

      {/* Prerequisites Section */}
      <div className="mb-6">
        <Typography variant="h5" as="h5">
          Prerequisites
        </Typography>
        {prerequisites.map((item, index) => (
          <span
            key={index}
            className="flex justify-start items-center gap-x-2 text-gray-700"
          >
            <ImArrowRight size={12} className="text-green-400 mt-1" />
            {item}
          </span>
        ))}
      </div>

      {/* Course Syllabus Section */}
      <Typography variant="h3" as="h3" className="mb-4">
        Course Syllabus
      </Typography>
      <div className="border-2 border-gray-300 rounded-lg">
        {syllabus.map((course) =>
          course.courses_syllabus.map((module, index) => (
            <div key={index} className="border-b-2 border-gray-300">
              <div
                className="w-full p-3 flex justify-between items-center bg-blue-100 text-left cursor-pointer"
                onClick={() => toggleModule(index)}
              >
                <Typography variant="h6" as="h6">
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
