import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import Typography from "@/components/atoms/Typography";
import { getAllBlogs } from "@/APIS/blog.service";
import { Blog } from "@/util/interfaces/blog";
import { formatText } from "@/util/helperFunctions";
import ContactButtons from "@/components/organisms/ContactButtons";

const categories = [
  "SAP",
  "CLOUD_TECHNOLOGIES",
  "DATA_ANALYTICS",
  "ML&AI",
  "CYBER_SECURITY",
];

const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await getAllBlogs("blog");
    if (response?.success && Array.isArray(response.data)) {
      return response.data as Blog[];
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
  return [];
};

export const metadata: Metadata = {
  title: "All Blogs | Pune Software Technologies",
  description: "Explore all the blogs related to AI, ML, SAP, and more.",
  openGraph: {
    title: "All Blogs | Pune Software Technologies",
    description: "Explore all the blogs related to AI, ML, SAP, and more.",
    url: "https://punesoftwaretechnologies.com/blogs",
    type: "website",
  },
  twitter: {
    title: "All Blogs | Pune Software Technologies",
    description: "Explore all the blogs related to AI, ML, SAP, and more.",
    card: "summary_large_image",
  },
};

const AllBlogs = async () => {
  const blogs = await fetchBlogs();

  const latestBlogs = blogs.slice(0, 4);
  const categorizedBlogs: Record<string, Blog[]> = {};

  categories.forEach((category) => {
    categorizedBlogs[category] = [];
  });

  blogs.forEach((blog) => {
    if (categories.includes(blog.category)) {
      categorizedBlogs[blog.category].push(blog);
    }
  });

  return (
    <>
      <Header />
      <div className="p-6 bg-white rounded-lg shadow-lg mt-24 mb-8 sm:p-4 mx-6 md:mx-32">
        <Typography variant="h1" className="mb-8 text-center">
          All Blogs
        </Typography>

        {/* Latest Blogs Section */}
        <Typography variant="h3" as="h3" className="mb-4 text-left">
          Latest Blogs
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Categorized Blogs */}
        {categories.map(
          (category) =>
            categorizedBlogs[category] &&
            categorizedBlogs[category].length > 0 && (
              <div key={category} className="mb-12">
                <Typography variant="h3" as="h3" className="mb-4 text-left">
                  {formatText(category)}
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  {categorizedBlogs[category].map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
      <Footer />
    </>
  );
};

const BlogCard = ({ blog }: { blog: Blog }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Link href={`/blog/${blog.slug}`}>
      {blog?.featured_image && (
        <Image
          src={blog?.featured_image}
          alt={`Blog: ${blog.title}`}
          height={120}
          width={200}
          className="rounded-t-lg object-cover w-full h-40"
        />
      )}
      <div className="p-4">
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
        <Typography variant="h6" className="text-blue-500">
          Read More
        </Typography>
      </div>
    </Link>
    <ContactButtons />
  </div>
);

export default AllBlogs;
