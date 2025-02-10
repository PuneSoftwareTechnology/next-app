import Head from "next/head";
import React from "react";
import Typography from "../atoms/Typography";
import Image from "next/image";
import Link from "next/link"; // Import the Link component
import { Blog } from "@/util/interfaces/blog";

interface BlogsProps {
  blogs: Blog[];
}

const BlogsPage: React.FC<BlogsProps> = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>Latest Tech Blogs | Pune Software Technologies</title>
        <meta
          name="description"
          content="Stay updated with the latest trends in AI, cybersecurity, web development, and more with our informative blogs."
        />
        <meta
          name="keywords"
          content="AI, Cloud Computing, Cybersecurity, Data Analytics, Web Development"
        />
        <meta name="author" content="Pune Software Technologies" />
      </Head>
      <section
        className="container mx-auto px-4 py-8 md:px-32"
        aria-label="Pune Software Technologies Blog Section"
      >
        <Typography variant="h2" as="h2" className="text-center mb-6">
          Are you new to technology?{" "}
          <span className="text-primary">Start here</span>
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
          {blogs.map((blog: Blog, index: number) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={index}
              className="flex flex-col justify-between items-center text-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow pb-4"
              aria-label={`Read more about ${blog.title}`}
            >
              <Image
                src={blog?.featured_image}
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
                  {blog.introduction}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogsPage;
