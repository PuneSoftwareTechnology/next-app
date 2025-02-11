import { getAllBlogs } from "@/APIS/blog.service";
import { Suspense } from "react";
import BlogsPage from "../orgnasims/Blogs";
import GlobalLoader from "../molecules/GlobalLoader";

async function fetchAllBlogs() {
  try {
    const response = await getAllBlogs("main");
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
      <BlogsPage blogs={blogs} />
    </>
  );
}
