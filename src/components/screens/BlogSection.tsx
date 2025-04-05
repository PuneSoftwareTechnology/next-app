import { Blog } from "@/util/interfaces/blog";
import BlogsPage from "../orgnasims/Blogs";
import { BASE_URL } from "@/util/urls";

const fetchAllBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(`${BASE_URL}/blog/all?landing_page=main`, {
      cache: "no-store", // 🚀 Ensures fresh data on every request
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const data = await response.json();
    if (data?.success && Array.isArray(data.data)) {
      return data.data as Blog[];
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
  return [];
};

export default async function BlogSection() {
  const blogs = (await fetchAllBlogs()) ?? [];

  return (
    <>
      <BlogsPage blogs={blogs} />
    </>
  );
}
