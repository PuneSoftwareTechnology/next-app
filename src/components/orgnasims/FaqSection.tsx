"use client";

import { FC, useState } from "react";
import { Metadata } from "next";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FAQ } from "@/util/interfaces/faq";
import Typography from "../atoms/Typography";

interface FaqSectionProps {
  faqs: FAQ[];
}

export const metadata: Metadata = {
  title: "Frequently Asked Questions - YourSite",
  description:
    "Find answers to the most frequently asked questions about our services and courses.",
};

const FaqSection: FC<FaqSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto p-4 md:p-8">
      <Typography variant="h3" className="text-center mb-4">
        Frequently Asked <span className="text-primary">Questions</span>
      </Typography>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="border p-4 rounded-lg bg-white shadow">
            <div
              className="w-full flex justify-between items-center text-lg font-semibold focus:outline-none cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <Typography variant="h6" as="h6">
                {faq.question}
              </Typography>
              {openIndex === index ? (
                <BiChevronUp color="black" size={24} />
              ) : (
                <BiChevronDown color="black" size={24} />
              )}
            </div>
            {openIndex === index && (
              <Typography
                variant="p"
                as="p"
                className="mt-4 bg-gray-200 rounded-md p-4"
              >
                {faq.answer}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
