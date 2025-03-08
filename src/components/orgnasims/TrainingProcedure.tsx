import {
  FaPlayCircle,
  FaChalkboardTeacher,
  FaUserTie,
  FaClipboardList,
  FaBriefcase,
  FaAward,
} from "react-icons/fa";
import Typography from "../atoms/Typography";
import { FC } from "react";

const trainingFeatures = [
  {
    icon: <FaChalkboardTeacher className="text-indigo-500 text-2xl" />,
    label: "Live Classes",
  },
  {
    icon: <FaUserTie className="text-purple-500 text-2xl" />,
    label: "Mentorship",
  },
  {
    icon: <FaPlayCircle className="text-blue-500 text-2xl" />,
    label: "Recorded Session",
  },
  {
    icon: <FaClipboardList className="text-pink-500 text-2xl" />,
    label: "Assessment",
  },

  {
    icon: <FaAward className="text-orange-500 text-2xl" />,
    label: "Interview Preparation",
  },
  {
    icon: <FaBriefcase className="text-gray-500 text-2xl" />,
    label: "Placement Assistance",
  },
];
interface PageProps {
  courseDesc: string;
}

const TrainingProcedure: FC<PageProps> = ({ courseDesc }) => {
  return (
    <section
      className="py-8 px-4 lg:px-32 bg-gray-100"
      aria-labelledby="training-procedure"
    >
      <Typography variant="h2" as="h2" className="text-center mb-4">
        Our Training Key Features
      </Typography>
      <Typography variant="h5" as="h5" className="text-center mb-4 lg:mb-8">
        {courseDesc}
      </Typography>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-8xl">
        {trainingFeatures.map((feature, index) => (
          <div
            key={index}
            className=" flex flex-col items-center bg-white p-4 rounded-lg  "
          >
            {feature.icon}
            <Typography variant="h5" as="h5" className="text-center mt-2">
              {feature.label}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrainingProcedure;
