import Link from "next/link";
import Head from "next/head";
import Header from "@/components/molecules/Header";
import LOGO from "../../assests/images/Logo.png";
import Image from "next/image";

// data/blogs.ts
export const blogs = [
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
    id: "introduction-to-sap-a-beginnerg-guide",
    title: "Introduction to SAP: A Beginner's Guide",
    description:
      "Learn the basics of SAP, its modules, and its applications in enterprise systems.",
    image: "/images/sap.jpg",
    category: "SAP",
    content: "Full content of the SAP blog goes here...",
  },
  // Add more blogs as needed
];

const AllBlogs = () => {
  return (
    <>
      <Head>
        <title>All Blogs | Your Website</title>
        <meta
          name="description"
          content="Explore all the blogs related to AI, ML, SAP, and more."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 md:px-32 py-8 ">
        <h1 className="text-3xl font-bold text-center mb-8">All Blogs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={LOGO}
                alt={blog.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-gray-600 text-sm">{blog.description}</p>
                <Link
                  href={`/blog/${blog.id}`}
                  className="text-blue-500 mt-2 inline-block"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold">Related Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
            {blogs
              .filter((blog) => blog.category === "AI-ML")
              .map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="text-blue-500 mt-2 inline-block"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={LOGO}
                      alt={blog.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{blog.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {blog.description}
                      </p>
                      Read More
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AllBlogs;
