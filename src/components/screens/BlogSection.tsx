import { Blog } from "@/util/interfaces/blog";
import BlogsPage from "../orgnasims/Blogs";
import { BASE_URL } from "@/util/urls";

const fetchAllBlogs = async (category: string): Promise<Blog[]> => {
  try {
    const url = category
      ? `${BASE_URL}/blog/all?landing_page=main&category_id=${category}`
      : `${BASE_URL}/blog/all?landing_page=main`;
    const response = await fetch(
      url,

      {
        cache: "no-store", // 🚀 Ensures fresh data on every request
      }
    );

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

interface PageProps {
  category?: string;
}

export default async function BlogSection({ category }: PageProps) {
  const blogs = (await fetchAllBlogs(category || "")) ?? [];

  return (
    <>
      <BlogsPage blogs={blogs} />
    </>
  );
}
