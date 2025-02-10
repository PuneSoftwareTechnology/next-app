import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import { OneBlogResponse } from "@/util/interfaces/blog";
import { getOneBlog } from "@/APIS/blog.service";
import { notFound } from "next/navigation";
import Typography from "@/components/atoms/Typography";

type Params = Promise<{ blogId: string }>;

const fetchBlogData = async (
  blogId: string
): Promise<OneBlogResponse | null> => {
  try {
    const response = await getOneBlog(blogId);
    if (response?.success && typeof response.data === "object") {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
  return null;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { blogId } = await params; // Await params as per Next.js 15 changes
  const blog = await fetchBlogData(blogId);
  return {
    title: blog?.title || "Blog | Pune Software Technologies",
    description:
      blog?.introduction ||
      "Read insightful blogs on technology and software development.",
    openGraph: {
      title: blog?.title || "Blog | Pune Software Technologies",
      description:
        blog?.introduction ||
        "Read insightful blogs on technology and software development.",
      images: [{ url: blog?.featured_image || "/default-blog-image.jpg" }],
      url: `https://punesoftwaretechnologies.com/blog/${blogId}`,
      type: "article",
    },
    twitter: {
      title: blog?.title || "Blog | Pune Software Technologies",
      description:
        blog?.introduction ||
        "Read insightful blogs on technology and software development.",
      images: [{ url: blog?.featured_image || "/default-blog-image.jpg" }],
      card: "summary_large_image",
    },
  };
}

const BlogDetail = async ({ params }: { params: Params }) => {
  "use server";
  const { blogId } = await params; // Await params as per Next.js 15 changes
  const blog = await fetchBlogData(blogId);
  if (!blog) return notFound();

  return (
    <>
      <Header />
      <div className="p-6 bg-white rounded-lg shadow-lg mt-24 mb-8 sm:p-4 mx-6 md:mx-32">
        <Typography variant="h1" className="mb-4 sm:text-2xl">
          {blog.title}
        </Typography>
        <Image
          src={blog.featured_image || "/default-blog-image.jpg"}
          alt={blog.title}
          width={400}
          height={100}
          className="rounded-lg h-auto"
        />
        <Typography variant="h3" as="h3" className="mt-4 sm:text-sm">
          {blog.introduction}
        </Typography>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
