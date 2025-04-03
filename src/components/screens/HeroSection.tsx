import React from "react";
import Image from "next/image";
import Typography from "../atoms/Typography";
import HERO_IMAGE from "../../assests/images/HeroImage.png";

const HeroSection: React.FC = () => {
  return (
    <section
      className="flex flex-col sm:flex-row-reverse items-center sm:items-start sm:justify-between px-4 lg:px-32 py-8 sm:py-16 bg-gradient-to-r from-blue-50 to-blue-100 mt-20 "
      aria-label="Pune Software Technologies Hero Section"
    >
      {/* Image Panel */}
      <div className=" mr-2">
        <Image
          src={HERO_IMAGE}
          alt="Empowering Students at Pune Software Technologies"
          width={400}
          height={100}
        />
      </div>

      {/* Text Panel */}
      <div className="sm:w-1/2 text-center sm:text-left">
        <Typography variant="h1" className="text-blue-900">
          Welcome to Pune Software Technologies
        </Typography>
        <Typography
          variant="h4"
          as="h4"
          className="mt-4 text-gray-700 leading-relaxed"
        >
          Empowering students and professionals with practical training in
          SAP S/4HANA, Cybersecurity, Cloud computing, Data analytics and Artificial intelligence. Join us to
          elevate your career to new height.
        </Typography>
        <a
          href="/courses"
          className="inline-block mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-300"
          aria-label="Explore Courses at Pune Software Technologies"
        >
          Book Free Demo
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
