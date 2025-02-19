import Typography from "../atoms/Typography";
import SAP_IMG from "../../assests/images/sap.jpg";
import CLOUD_IMG from "../../assests/images/cloud.jpg";
import DA_IMG from "../../assests/images/da.jpg";
import AIML_IMG from "../../assests/images/aiml.jpg";
import CYBER_IMG from "../../assests/images/cyber.avif";
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
      className="container mx-auto px-4 py-8 md:px-32"
      aria-label="Pune Software Technologies Courses Section"
    >
      <Typography variant="h3" className="text-center mb-6">
        Choose your <span className="text-primary">area of interest</span>
      </Typography>
      <div className="flex flex-wrap justify-between items-center gap-6">
        {courses.map((course, index) => (
          <Link
            href={course.link}
            key={index}
            aria-label={course.name}
            className="flex flex-col items-center  bg-blue-100 border border-blue-200 rounded-lg  shadow-md hover:shadow-lg transition-shadow w-full sm:w-1/2 md:w-1/3 lg:w-1/6"
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
              variant="h6"
              as="h6"
              className="text-gray-800 mb-4 px-2"
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
