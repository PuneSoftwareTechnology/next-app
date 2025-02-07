import { getAllBlogs } from "@/APIS/blog.service";
import { Suspense } from "react";
import Loader from "../atoms/Loader";
import BlogsPage from "../orgnasims/Blogs";

async function fetchAllBlogs() {
  try {
    const response = await getAllBlogs();
    if (response?.success) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching categories", error);
    return null;
  }
}

export default async function BlogSection() {
  const blogs = (await fetchAllBlogs()) ?? [];

  return (
    <>
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <Loader size="large" className="mx-auto border-gray-800" />
          </div>
        }
      >
        <BlogsPage blogs={blogs} />
      </Suspense>
    </>
  );
}
