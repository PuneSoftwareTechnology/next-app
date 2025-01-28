"use client";
import { useState } from "react";
import Head from "next/head";
import Typography from "@/components/atoms/Typography";
import { FaAngleRight } from "react-icons/fa6";

const faqs = [
  {
    question: "What is a cross-listed course?",
    answer:
      "A cross-listed course is a single course offered under multiple departments or disciplines.",
  },
  {
    question:
      "Can I take cross-listed courses to fulfill my degree requirements?",
    answer:
      "Yes, cross-listed courses count toward degree requirements as per the guidelines of your department.",
  },
  {
    question: "How do I upgrade and earn credit from CU Boulder?",
    answer:
      "You can upgrade your courses through our online portal and follow the credit transfer guidelines.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>Frequently Asked Questions | Pune Software Technologies</title>
        <meta
          name="description"
          content="Find answers to commonly asked questions about our courses, certifications, and more."
        />
        <meta
          name="keywords"
          content="FAQ, Courses, Certifications, Pune Software Technologies"
        />
        <meta name="author" content="Pune Software Technologies" />
        <meta
          property="og:title"
          content="Frequently Asked Questions | Pune Software Technologies"
        />
        <meta
          property="og:description"
          content="Find answers to commonly asked questions about our courses, certifications, and more."
        />
        <meta
          property="og:url"
          content="https://www.punesoftwaretech.com/faq"
        />
        <meta property="og:type" content="website" />
      </Head>
      <main className="mb-8 px-4 sm:px-8 md:px-16">
        <Typography variant="h2" as="h2" className="text-center mb-6 mt-20">
          Frequently Asked <span className="text-primary">Questions</span>
        </Typography>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-4 md:px-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <Typography variant="h6" as="h6" className="text-gray-800">
                  {faq.question}
                </Typography>
                <FaAngleRight
                  color="#00000080"
                  className={`h-6 w-6 transition-transform ${
                    openIndex === index ? "rotate-90" : "rotate-0"
                  }`}
                />
              </button>
              {openIndex === index && (
                <div id={`faq-${index}`} className="pb-4 px-4 text-gray-600">
                  <Typography variant="p" as="p">
                    {faq.answer}
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default FAQPage;
