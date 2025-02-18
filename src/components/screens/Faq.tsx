import { getFaqs } from "@/APIS/faq.service";
import FaqSection from "../orgnasims/FaqSection";

export async function FAQPage() {
  const faqs = (await getFaqs()) ?? [];

  return <FaqSection faqs={faqs} />;
}
