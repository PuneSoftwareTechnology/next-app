import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import Typography from "@/components/atoms/Typography";
import { Blog } from "@/util/interfaces/blog";
import ContactButtons from "@/components/organisms/ContactButtons";
import ERROR_IMG from "../../assests/images/imageError.png";
import EnquirySection from "@/components/screens/EnquirySection";
import { categoryIdMap } from "@/util/data/category";
import { BASE_URL } from "@/util/urls";
import { Suspense } from "react";
import GlobalLoader from "@/components/molecules/GlobalLoader";
import Script from "next/script";

export const dynamic = "force-dynamic";

const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(`${BASE_URL}/blog/all?landing_page=blog`, {
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

export const metadata: Metadata = {
  title: "All Blogs | Pune Software Technologies",
  description: "Explore all the blogs related to AI, ML, SAP, and more.",
  openGraph: {
    title: "All Blogs | Pune Software Technologies",
    description: "Explore all the blogs related to AI, ML, SAP, and more.",
    url: "https://www.punesoftwaretechnologies.com/all-blogs",
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "All Blogs | Pune Software Technologies",
    description: "Explore all the blogs related to AI, ML, SAP, and more.",
    url: "https://www.punesoftwaretechnologies.com/all-blogs",
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      image: blog.featured_image || ERROR_IMG,
      url: `https://www.punesoftwaretechnologies.com/all-blogs`,
      datePublished: blog.created_at,
      author: {
        "@type": "Person",
        name: blog.author_id || "Unknown",
      },
    })),
  };

  return (
    <Suspense fallback={<GlobalLoader />}>
      <Head>
        <link
          rel="canonical"
          href="https://punesoftwaretechnologies.com/all-blogs"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-36X2FRJ5W4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-36X2FRJ5W4');
        `}
      </Script>
      <Header />
      <div className="mt-20  lg:mt-28 mb-8 mx-2 md:mx-4 lg:mx-32">
        <Typography variant="h1" as="h1" className="mb-8 text-center">
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
      <ContactButtons />
      <Footer />
    </Suspense>
  );
};

const BlogCard = ({ blog }: { blog: Blog }) => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-xl flex flex-col h-full"
    role="article"
    aria-labelledby={`blog-title-${blog.id}`}
  >
    <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
      <Image
        src={blog?.featured_image || ERROR_IMG}
        alt={`Featured image for blog: ${blog.title}`}
        height={120}
        width={200}
        className="rounded-t-lg object-cover w-full h-40"
      />
      <div className="p-4 flex flex-col flex-grow">
        <Typography
          variant="h5"
          as="h5"
          id={`blog-title-${blog.id}`}
          className="mb-2 text-left text-gray-800 flex-grow"
        >
          {blog.title}
        </Typography>
        <div className="mt-auto">
          <Typography
            variant="h5"
            id={`blog-category-${blog.id}`}
            as="h5"
            className="text-white px-4 py-2 w-fit bg-blue-600 rounded-md mx-auto"
          >
            Read More
          </Typography>
        </div>
      </div>
    </Link>
  </div>
);

export default AllBlogs;
