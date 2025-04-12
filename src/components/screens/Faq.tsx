import { FAQ } from "@/util/interfaces/faq";
import { BASE_URL } from "@/util/urls";
import FaqSection from "../orgnasims/FaqSection";

const getFaqs = async (category: string): Promise<FAQ[]> => {
  try {
  console.log (`${BASE_URL}/faq/all?category_id=${category}`)
    const response = await fetch(
      `${BASE_URL}/faq/all?category_id=${category}`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.success && Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    return [];
  }
};

interface PageProps {
  category?: string;
}

export default async function FAQPage({ category }: PageProps) {
  const faqs = (await getFaqs(category || "")) ?? [];
  return <FaqSection faqs={faqs} />;
}
