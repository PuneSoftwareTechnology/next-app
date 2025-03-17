import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import { OneBlogResponse } from "@/util/interfaces/blog";
import { getOneBlog } from "@/APIS/blog.service";
import { notFound } from "next/navigation";
import Typography from "@/components/atoms/Typography";
import ContactButtons from "@/components/organisms/ContactButtons";
import ERROR_IMG from "../../../assests/images/imageError.png";
import EnquirySection from "@/components/screens/EnquirySection";

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
  const { blogId } = await params;
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
    tertiary_content_intro,
    tertiary_content_image,
    tertiary_content_text,
    secondary_content_text,
    tertiary_content_title,
    tertiary_content_points,
    conclusion,
  } = blog;

  const parsedTertiaryPoints = tertiary_content_points
    ? JSON.parse(tertiary_content_points)
    : [];

  return (
    <>
      <Header />
      <div className="bg-white rounded-lg shadow-lg mt-20 lg:mt-24 mb-8 p-4 lg:p-6 mx-4 lg:mx-32">
        <Typography variant="h2" as="h2" className="mb-4 text-center">
          {title}
        </Typography>
        <Image
          src={featured_image || ERROR_IMG}
          alt={title}
          width={600}
          height={300}
          className="rounded-lg  mx-auto border-2 lg:w-2/3 lg:h-1/3  md:h-1/2 w-full h-1/3"
        />
        <Typography variant="h4" as="h4" className="my-8 text-center">
          {introduction}
        </Typography>
        {[
          {
            title: primary_content_title,
            intro: primary_content_intro,
            image: primary_content_image,
            text: primary_content_text,
            type: "PRIMARY",
          },
          {
            title: secondary_content_title,
            intro: secondary_content_intro,
            image: secondary_content_image,
            text: secondary_content_text,
            type: "SECONDARY",
          },
          {
            title: tertiary_content_title,
            intro: tertiary_content_intro,
            image: tertiary_content_image,
            text: tertiary_content_text,
            type: "TERTIARY",
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
                  className="rounded-lg  mx-auto border-2 lg:w-2/3 lg:h-1/5  md:h-1/2 w-full h-1/5 mb-8"
                />
                <Typography variant="h6" as="h6" className="mt-2 text-left">
                  {section.text}
                </Typography>
                {section?.type === "TERTIARY" && (
                  <ul className="list-disc pl-6 text-gray-700 text-left">
                    {parsedTertiaryPoints.map(
                      (point: string, index: number) => (
                        <li key={index}>{point}</li>
                      )
                    )}
                  </ul>
                )}
              </div>
            )
        )}

        {conclusion && (
          <div className="mt-6">
            <Typography variant="h3" as="h3" className="text-center mb-4">
              Conclusion
            </Typography>
            <Typography variant="p" className="sm:text-sm">
              {conclusion}
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
