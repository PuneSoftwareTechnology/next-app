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
  const {
    title,
    introduction,
    featured_image,
    primary_content_title,
    primary_content_intro,
    primary_content_image,
    primary_content_text,
    secondary_content_title,
    secondary_content_intro,
    secondary_content_image,
    secondary_content_text,
    tertiary_content_title,
    tertiary_content_points,
    conclusion,
    author_id = "Pune Software Technologies",
  } = blog;

  const parsedTertiaryPoints = tertiary_content_points
    ? JSON.parse(tertiary_content_points)
    : [];

  return (
    <>
      <Header />
      <div className="p-6 bg-white rounded-lg shadow-lg mt-24 mb-8 sm:p-4 mx-6 md:mx-32">
        <Typography variant="h1" className="mb-4 sm:text-2xl">
          {title}
        </Typography>
        <Image
          src={featured_image || "/default-blog-image.jpg"}
          alt={title}
          width={400}
          height={100}
          className="rounded-lg h-auto"
        />
        <Typography variant="h3" as="h3" className="mt-4 sm:text-sm">
          {introduction}
        </Typography>
        {[
          {
            title: primary_content_title,
            intro: primary_content_intro,
            image: primary_content_image,
            text: primary_content_text,
          },
          {
            title: secondary_content_title,
            intro: secondary_content_intro,
            image: secondary_content_image,
            text: secondary_content_text,
          },
        ].map(
          (section, index) =>
            section.title && (
              <div key={index} className="mt-6">
                <Typography variant="h2" className="sm:text-xl">
                  {section.title}
                </Typography>
                <Typography variant="p" className="sm:text-sm">
                  {section.intro}
                </Typography>
                {section.image && (
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={200}
                    height={50}
                    className="rounded-lg mt-2 h-auto"
                  />
                )}
                <Typography variant="p" className="mt-2 sm:text-sm">
                  {section.text}
                </Typography>
              </div>
            )
        )}
        {tertiary_content_title && (
          <div className="mt-6">
            <Typography variant="h2" className="sm:text-lg">
              {tertiary_content_title}
            </Typography>
            <ul className="list-disc pl-6 text-gray-700 sm:text-sm">
              {parsedTertiaryPoints.map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
        {conclusion && (
          <div className="mt-6">
            <Typography variant="h2" className="sm:text-lg">
              Conclusion
            </Typography>
            <Typography variant="p" className="sm:text-sm">
              {conclusion}
            </Typography>
          </div>
        )}
        <Typography
          variant="p"
          className="mt-6 text-gray-600 text-sm font-semibold"
        >
          By {author_id}
        </Typography>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
