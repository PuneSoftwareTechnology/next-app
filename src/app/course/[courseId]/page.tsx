"use client";
import { useParams } from "next/navigation"; // Use useParams in app directory
import { useEffect, useState } from "react";
import Head from "next/head";
import { notFound } from "next/navigation";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import Image from "next/image";
import LOGO from "../../../assests/images/Logo.png";

// Mock course data
const courses = [
  {
    id: "sap-fico-s4hana",
    name: "SAP FICO S4HANA",
    description: "Learn the basics of SAP FICO and its financial applications.",
    image: "/images/sap-fico.jpg",
    content: "Detailed content for SAP FICO S4HANA goes here...",
  },
  {
    id: "sap-mm-s4hana",
    name: "SAP MM S4HANA",
    description: "Learn about SAP MM and material management processes.",
    image: "/images/sap-mm.jpg",
    content: "Detailed content for SAP MM S4HANA goes here...",
  },
  // Add more courses as needed
];

const CourseDetail = () => {
  const { courseId } = useParams(); // Use useParams to get dynamic route params
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component only runs client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not mounted, don't render the router-dependent content
  if (!isMounted) {
    return null;
  }

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{course.name} | Learn SAP</title>
        <meta name="description" content={course.description} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 md:px-32 py-8 mt-24">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Image
            src={LOGO}
            alt={course.name}
            className="w-full h-56 object-cover rounded-md"
            width={500} // Set width and height for Image optimization
            height={300}
          />
          <h1 className="text-3xl font-bold mt-6">{course.name}</h1>
          <p className="text-gray-600 mt-4">{course.description}</p>
          <div className="mt-6">{course.content}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CourseDetail;
