"use client";
import { useParams } from "next/navigation"; // Use useParams in app directory
import { useEffect, useState } from "react";
import Head from "next/head";
import { notFound } from "next/navigation";
import { blogs } from "@/app/all-blogs/page";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

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
          <img
            src={blog.image}
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
