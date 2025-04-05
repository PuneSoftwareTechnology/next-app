import { FAQ } from "@/util/interfaces/faq";
import { BASE_URL } from "@/util/urls";
import FaqSection from "../orgnasims/FaqSection";

const getFaqs = async (): Promise<FAQ[]> => {
  try {
    const response = await fetch(`${BASE_URL}/faq/all`, {
      cache: "no-store", // 🚀 Ensures fresh data on every request
    });

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

export default async function FAQPage() {
 const faqs = (await getFaqs()) ?? [];
  return <FaqSection faqs={faqs} />;
}
