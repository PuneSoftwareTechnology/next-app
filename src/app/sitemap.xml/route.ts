import { NextResponse } from "next/server";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { BASE_URL } from "@/util/urls";
import { Courses } from "@/util/interfaces/course";
import { pageIdMap } from "@/util/data/category";
import { Blog } from "@/util/interfaces/blog";

const COURSE_CATEGORIES = [
  "sap",
  "cloud",
  "data-analytics",
  "artificial-intelligence",
  "cyber-security",
];

// Fetch all courses per category
async function getCoursesByCategory() {
  const courseUrls: { url: string; changefreq: string; priority: number }[] =
    [];

  for (const cat of COURSE_CATEGORIES) {
    try {
      const res = await fetch(
        `${BASE_URL}/courses/all?category=${
          pageIdMap[cat as keyof typeof pageIdMap]
        }`,
        { cache: "no-store" } // important!
      );
      const data = await res.json();

      if (data?.success && Array.isArray(data.data)) {
        for (const course of data.data as Courses[]) {
          courseUrls.push({
            url: `/course/${course.slug}`,
            changefreq: "weekly",
            priority: 0.9,
          });
        }
      }
    } catch (err) {
      console.error(`Failed to fetch courses for category ${cat}:`, err);
    }
  }

  return courseUrls;
}

// Fetch blogs
async function getBlogUrls() {
  const blogUrls: { url: string; changefreq: string; priority: number }[] = [];

  try {
    const res = await fetch(`${BASE_URL}/blog/all?landing_page=main`, {
      cache: "no-store", // disables caching, ensures fresh data
    });

    const data = res.ok ? await res.json() : { data: [] };

    if (data?.success && Array.isArray(data.data)) {
      for (const blog of data.data as Blog[]) {
        blogUrls.push({
          url: `/blog/${blog.slug}`,
          changefreq: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
  }

  return blogUrls;
}

// Generate sitemap
export async function GET() {
  // 1️⃣ Static pages
  const staticUrls = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/contact-us", changefreq: "monthly", priority: 0.7 },
    { url: "/all-blogs", changefreq: "weekly", priority: 0.7 },
    { url: "/course-category/sap", changefreq: "weekly", priority: 0.9 },
    { url: "/course-category/cloud", changefreq: "weekly", priority: 0.9 },
    {
      url: "/course-category/data-analytics",
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: "/course-category/artificial-intelligence",
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: "/course-category/cyber-security",
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: "/privacy-policy",
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      url: "/terms-of-use",
      changefreq: "yearly",
      priority: 0.3,
    },
    { url: "/testimonial", changefreq: "yearly", priority: 0.3 },
  ];

  // 2️⃣ Dynamic pages
  const courseUrls = await getCoursesByCategory();
  const blogUrls = await getBlogUrls();

  const urls = [...staticUrls, ...courseUrls, ...blogUrls];

  const stream = new SitemapStream({
    hostname: "https://www.punesoftwaretechnologies.com",
  });

  const xml = await streamToPromise(Readable.from(urls).pipe(stream)).then(
    (data) => data.toString()
  );

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
