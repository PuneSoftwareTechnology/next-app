import Image from "next/image";
import Typography from "../atoms/Typography";
import Head from "next/head";
import LOGO from "../../assests/images/Logo.png";

const BlogSection = () => {
  const blogs = [
    {
      title: "The Future of AI in Education",
      description:
        "Exploring how artificial intelligence is transforming the education sector.",
      icon: "🤖", // Replace with an actual icon or image URL
    },
    {
      title: "Cloud Computing Trends 2025",
      description:
        "A deep dive into the latest trends shaping cloud technologies.",
      icon: "☁️", // Replace with an actual icon or image URL
    },
    {
      title: "Cybersecurity Best Practices",
      description: "Essential cybersecurity measures to keep your data safe.",
      icon: "🔒", // Replace with an actual icon or image URL
    },
    {
      title: "Mastering Data Analytics",
      description:
        "Learn the key concepts and tools for effective data analysis.",
      icon: "📊", // Replace with an actual icon or image URL
    },
    {
      title: "Web Development in 2025",
      description:
        "The evolution of web technologies and what's next for developers.",
      icon: "💻", // Replace with an actual icon or image URL
    },
  ];

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
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center text-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow pb-4"
            >
              <Image
                src={LOGO}
                alt="blog-image"
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
                  {blog.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogSection;
