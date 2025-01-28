"use client";
import { useParams } from "next/navigation"; // Use useParams in app directory
import { useEffect, useState } from "react";
import Head from "next/head";
import { notFound } from "next/navigation";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import Image from "next/image";
import LOGO from "../../../assests/images/Logo.png";

type Blog = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  content: string;
};

const blogs: Blog[] = [
  {
    id: "understanding-artificial-intelligence-and-machine-learning",
    title: "Understanding Artificial Intelligence and Machine Learning",
    description:
      "A deep dive into AI and ML technologies, their uses, and their future.",
    image: "/images/ai-ml.jpg",
    category: "AI-ML",
    content: "Full content of the AI and ML blog goes here...",
  },
  {
    id: "introduction-to-sap-a-beginner's-guide",
    title: "Introduction to SAP: A Beginner's Guide",
    description:
      "Learn the basics of SAP, its modules, and its applications in enterprise systems.",
    image: "/images/sap.jpg",
    category: "SAP",
    content: "Full content of the SAP blog goes here...",
  },
];

const BlogDetail = () => {
  const { blogId } = useParams(); // Use useParams to get dynamic route params
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component only runs client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not mounted, don't render the router-dependent content
  if (!isMounted) {
    return null;
  }

  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{blog.title} | Your Website</title>
        <meta name="description" content={blog.description} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <div className="container mx-auto px-4 py-8 md:px-32 mt-24">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Image
            src={LOGO}
            alt={blog.title}
            className="w-full h-56 object-cover rounded-md"
            width={500}
            height={300}
          />
          <h1 className="text-3xl font-bold mt-6">{blog.title}</h1>
          <p className="text-gray-600 mt-4">{blog.description}</p>
          <div className="mt-6">{blog.content}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
