import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import { OneBlogResponse } from "@/util/interfaces/blog";
import { notFound } from "next/navigation";
import Typography from "@/components/atoms/Typography";
import ContactButtons from "@/components/organisms/ContactButtons";
import ERROR_IMG from "../../../assests/images/imageError.png";
import EnquirySection from "@/components/screens/EnquirySection";
import { BASE_URL } from "@/util/urls";

// ✅ Fetch blog data (No caching, always fresh)
const fetchBlogData = async (slug: string): Promise<OneBlogResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/blog/?slug=${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.success && typeof data.data === "object" ? data.data : null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

// ✅ Dynamic Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}): Promise<Metadata> {
  const blog = await fetchBlogData(params.blogId);

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
      url: `https://punesoftwaretechnologies.com/blog/${params.blogId}`,
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

// ✅ Blog Detail Component
const BlogDetail = async ({ params }: { params: { blogId: string } }) => {
  "use server";

  const blog = await fetchBlogData(params.blogId);

  if (!blog) return notFound();

  return (
    <>
      <Header />
      <div className="bg-white rounded-lg shadow-lg mt-20 lg:mt-24 mb-8 p-4 lg:p-6 mx-4 lg:mx-32">
        <Typography variant="h2" as="h2" className="mb-4 text-center">
          {blog.title}
        </Typography>
        <Image
          src={blog.featured_image || ERROR_IMG}
          alt={blog.title}
          width={600}
          height={300}
          className="rounded-lg mx-auto border-2 lg:w-2/3 lg:h-1/3 w-full h-1/3"
        />
        <Typography variant="h4" as="h4" className="my-8 text-center">
          {blog.introduction}
        </Typography>

        {/* ✅ Sections Mapping for Cleaner Code */}
        {[
          {
            title: blog.primary_content_title,
            intro: blog.primary_content_intro,
            image: blog.primary_content_image,
            text: blog.primary_content_text,
          },
          {
            title: blog.secondary_content_title,
            intro: blog.secondary_content_intro,
            image: blog.secondary_content_image,
            text: blog.secondary_content_text,
          },
          {
            title: blog.tertiary_content_title,
            intro: blog.tertiary_content_intro,
            image: blog.tertiary_content_image,
            text: blog.tertiary_content_text,
            points: blog.tertiary_content_points
              ? JSON.parse(blog.tertiary_content_points)
              : [],
          },
        ].map(
          (section, index) =>
            section.title && (
              <div
                key={index}
                className="mt-6 py-8 px-2 md:px-8 bg-[#C9E4E9] rounded-lg mb-4"
              >
                <Typography variant="h3" as="h3" className="text-center mb-4">
                  {section.title}
                </Typography>
                <Typography variant="h5" as="h5" className="text-center mb-4">
                  {section.intro}
                </Typography>
                <Image
                  src={section.image || ERROR_IMG}
                  alt={section.title}
                  width={200}
                  height={50}
                  className="rounded-lg mx-auto border-2 lg:w-2/3 lg:h-1/5 w-full h-1/5 mb-8"
                />
                <Typography variant="h6" as="h6" className="mt-2 text-left">
                  {section.text}
                </Typography>
                {section.points && (
                  <ul className="list-disc pl-6 text-gray-700 text-left">
                    {section.points.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
        )}

        {/* ✅ Conclusion Section */}
        {blog.conclusion && (
          <div className="mt-6">
            <Typography variant="h3" as="h3" className="text-center mb-4">
              Conclusion
            </Typography>
            <Typography variant="p" className="sm:text-sm">
              {blog.conclusion}
            </Typography>
          </div>
        )}
      </div>

      <EnquirySection />
      <Footer />
      <ContactButtons />
    </>
  );
};

export default BlogDetail;

// ✅ Force Dynamic Rendering (Avoid Caching Issues)
export const dynamic = "force-dynamic";
export const revalidate = 0;
