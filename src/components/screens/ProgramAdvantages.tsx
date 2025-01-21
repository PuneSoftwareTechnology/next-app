// src/components/ProgramHighlights.tsx
import React from "react";
import Typography from "../atoms/Typography";
import { GiTeacher } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { VscProject } from "react-icons/vsc";
import { MdWork } from "react-icons/md";
import Card from "../orgnasims/AdvantageCard";

interface Highlight {
  title: string;
  description: string;
  icon: React.ReactElement;
}

const highlights: Highlight[] = [
  {
    title: "Top-Notch Faculty",
    description:
      "Trainers at ExcelR are passionate about training, and carry 12+ years of industry experience.",
    icon: <GiTeacher className="w-16 h-16 text-blue-500" />,
  },
  {
    title: "Exhaustive Course Curriculum",
    description:
      "Our industry-relevant course curriculum is tailored to provide practical exposure with the theory.",
    icon: <FaBook className="w-16 h-16 text-blue-500" />,
  },
  {
    title: "Real-life Projects and Bootcamps",
    description:
      "Learners will work on real-life test case scenarios from various domains to get application knowledge.",
    icon: <VscProject className="w-16 h-16 text-blue-500" />,
  },
  {
    title: "Guaranteed Job Interviews",
    description:
      "Participants in the placement pool will get guaranteed job interviews across our 500+ partner companies until they receive the first job offer.",
    icon: <MdWork className="w-16 h-16 text-blue-500" />,
  },
];

const ProgramHighlights: React.FC = () => {
  return (
    <section className="py-12 px-6 bg-gray-50  px-6 md:px-32">
      <div className="container mx-auto">
        <Typography
          variant="h2"
          className="text-center mb-8"
          as="h2"
          role="heading"
          aria-level={2}
        >
          Program Highlights
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              title={highlight.title}
              description={highlight.description}
              icon={highlight.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;
