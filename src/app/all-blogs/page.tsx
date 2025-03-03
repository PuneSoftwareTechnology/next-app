import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import Typography from "@/components/atoms/Typography";
import { getAllBlogs } from "@/APIS/blog.service";
import { Blog } from "@/util/interfaces/blog";
import ContactButtons from "@/components/organisms/ContactButtons";
import ERROR_IMG from "../../assests/images/imageError.png";
import EnquirySection from "@/components/screens/EnquirySection";
import { categoryIdMap } from "@/util/data/category";

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

  blogs.forEach((blog) => {
    const categoryName =
      categoryIdMap[blog.category_id as keyof typeof categoryIdMap] ||
      "Uncategorized";
    if (!categorizedBlogs[categoryName]) {
      categorizedBlogs[categoryName] = [];
    }
    categorizedBlogs[categoryName].push(blog);
  });

  return (
    <>
      <Header />
      <div className="mt-20  lg:mt-28 mb-8 mx-2 md:mx-4 lg:mx-32">
        <Typography variant="h1" className="mb-8 text-center">
          All Blogs
        </Typography>

        {/* Latest Blogs Section */}
        <div className="rounded-lg bg-white shadow-lg p-2 md:p-4 mb-8">
          <Typography variant="h3" as="h3" className="mb-4 text-left">
            Latest Blogs
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {latestBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>

        {/* Categorized Blogs */}
        {Object.entries(categorizedBlogs).map(([category, blogs], index) => (
          <div
            key={index}
            className="rounded-lg bg-white shadow-lg p-2 md:p-4 mb-8"
          >
            <div key={category} className="mb-12">
              <Typography variant="h3" as="h3" className="mb-4 text-left">
                {category}
              </Typography>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <EnquirySection />
      <Footer />
    </>
  );
};

const BlogCard = ({ blog }: { blog: Blog }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
      <Image
        src={blog?.featured_image || ERROR_IMG}
        alt={`Blog: ${blog.title}`}
        height={120}
        width={200}
        className="rounded-t-lg object-cover w-full h-40"
      />
      <div className="p-4 flex flex-col flex-grow">
        <Typography
          variant="h6"
          as="h6"
          className="m-4 text-left text-gray-800 flex-grow"
        >
          {blog.title}
        </Typography>
        <div className="mt-auto">
          <Typography
            variant="h6"
            className="text-white px-2 py-1 w-fit bg-blue-600 rounded-md mx-auto flex-1"
          >
            Read More
          </Typography>
        </div>
      </div>
    </Link>
    <ContactButtons />
  </div>
);

export default AllBlogs;
