import {
  FaPlayCircle,
  FaChalkboardTeacher,
  FaUserTie,
  FaClipboardList,
  FaBriefcase,
  FaAward,
} from "react-icons/fa";
import Typography from "../atoms/Typography";

const trainingFeatures = [
  {
    icon: <FaPlayCircle className="text-blue-500 text-2xl" />,
    label: "Recorded Session",
  },
  {
    icon: <FaChalkboardTeacher className="text-indigo-500 text-2xl" />,
    label: "Live Classes",
  },
  {
    icon: <FaUserTie className="text-purple-500 text-2xl" />,
    label: "Mentorship",
  },
  {
    icon: <FaClipboardList className="text-pink-500 text-2xl" />,
    label: "Assessment",
  },
  {
    icon: <FaBriefcase className="text-brown-500 text-2xl" />,
    label: "Placement Assistance",
  },
  {
    icon: <FaAward className="text-orange-500 text-2xl" />,
    label: "Certification",
  },
];

const TrainingProcedure = () => {
  return (
    <section
      className="py-8 px-4 bg-gray-100"
      aria-labelledby="training-procedure"
    >
      <Typography variant="h3" as="h3" className="text-center mb-4">
        Our Training Procedure
      </Typography>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
        {trainingFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {feature.icon}
            <Typography
              variant="p"
              as="p"
              className="text-sm text-gray-700 font-medium mt-2 text-center"
            >
              {feature.label}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrainingProcedure;
