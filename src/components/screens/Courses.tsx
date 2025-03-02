import Typography from "../atoms/Typography";
import SAP_IMG from "../../assests/images/sap.jpg";
import CLOUD_IMG from "../../assests/images/cloud.jpg";
import DA_IMG from "../../assests/images/da.jpg";
import AIML_IMG from "../../assests/images/aiml.jpg";
import CYBER_IMG from "../../assests/images/cyber.webp";
import Image from "next/image";
import Link from "next/link";

const Courses = () => {
  const courses = [
    {
      name: "SAP Training",
      image: SAP_IMG,
      link: "/course-category/sap",
    },
    {
      name: "Cloud Technologies",
      image: CLOUD_IMG,
      link: "/course-category/cloud",
    },
    {
      name: "Data Analytics",
      image: DA_IMG,
      link: "/course-category/data-analytics",
    },
    {
      name: "AI & Machine Learning",
      image: AIML_IMG,
      link: "/course-category/data-analytics",
    },
    {
      name: "Cyber Security",
      image: CYBER_IMG,
      link: "/course-category/cyber-security",
    },
  ];

  return (
    <section
      className="mx-auto py-4 px-4 lg:px-32 bg-red"
      aria-label="Pune Software Technologies Courses Section"
    >
      <Typography variant="h2" as="h2" className="text-center my-8">
        Choose your <span className="text-primary">area of interest</span>
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {courses.map((course, index) => (
          <Link
            href={course.link}
            key={index}
            aria-label={course.name}
            className="flex flex-col items-center hover:scale-105 hover:shadow-xl bg-blue-100 border border-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-4 w-full h-40 relative">
              <Image
                src={course.image}
                layout="fill"
                objectFit="cover"
                alt={`${course.name} image`}
                className="rounded-t-lg"
              />
            </div>
            <Typography
              variant="h4"
              as="h4"
              className="text-gray-800 mb-4 px-2 text-center"
            >
              {course.name}
            </Typography>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Courses;
