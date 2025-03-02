import React from "react";
import Typography from "../atoms/Typography";
import Image from "next/image";
import Link from "next/link"; // Import the Link component
import { Blog } from "@/util/interfaces/blog";
import ERROR_IMAGE from "../../assests/images/imageError.png";

interface BlogsProps {
  blogs: Blog[];
}

const BlogsPage: React.FC<BlogsProps> = ({ blogs }) => {
  return (
    <section
      className="mx-auto px-4 lg:px-32 py-8"
      aria-label="Pune Software Technologies Blog Section"
    >
      <Typography variant="h2" as="h2" className="text-center mb-6">
        Know More About Technology
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto my-16">
        {blogs.map((blog: Blog, index: number) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={index}
            className="flex flex-col justify-between items-center text-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow pb-4"
            aria-label={`Read more about ${blog.title}`}
          >
            <Image
              src={blog?.featured_image || ERROR_IMAGE}
              alt={`Logo for blog titled ${blog.title}`}
              height={120}
              width={200}
              className="rounded-t-lg object-cover w-full h-40"
            />
            <div className="">
              <Typography
                variant="h5"
                as="h5"
                className="m-4 text-left text-gray-800"
              >
                {blog.title}
              </Typography>
              <Typography variant="p" as="p" className="text-gray-600 px-4">
                {blog.introduction && blog.introduction.length > 70
                  ? blog.introduction.slice(0, 70) + "..."
                  : blog.introduction}
              </Typography>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/all-blogs"
        className="bg-blue-600 w-fit my-4 text-white rounded-md px-4 py-2 mx-auto flex justify-center items-center hover:bg-blue-700 transition"
        aria-label="Read all blogs"
      >
        <Typography variant="h6" className="text-white ">
          Read All Blogs
        </Typography>
      </Link>
    </section>
  );
};

export default BlogsPage;
