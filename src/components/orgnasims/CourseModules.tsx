"use client";
import {
  FaClock,
  FaChalkboardTeacher,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";
import Typography from "../atoms/Typography";

interface CourseModulesProps {
  module_heading: string;
  modules: string[];
}

const CourseModules: React.FC<CourseModulesProps> = ({
  module_heading,
  modules,
}) => {
  const moduleDetails = [
    {
      icon: <FaClock size={30} className="text-blue-600" />,
      description: modules[0],
    },
    {
      icon: <FaChalkboardTeacher size={30} className="text-blue-600" />,
      description: modules[1],
    },
    {
      icon: <FaBriefcase size={30} className="text-blue-600" />,
      description: modules[2],
    },
    {
      icon: <FaClock size={30} className="text-blue-600" />,
      description: modules[3],
    },
    {
      icon: <FaUsers size={30} className="text-blue-600" />,
      description: modules[4],
    },
    {
      icon: <FaUsers size={30} className="text-blue-600" />,
      description: modules[5],
    },
  ];

  return (
    <section className="px-4 py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <Typography variant="h4" as="h4" className="mb-4">
          {module_heading}
        </Typography>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {moduleDetails.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center sm:items-start text-center sm:text-left bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-3">{item.icon}</div>

              <Typography
                variant="p"
                as="p"
                className="text-sm text-gray-700 font-medium mt-2 text-center"
              >
                {item.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseModules;
