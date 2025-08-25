import React, { Suspense } from "react";
import Testimonials from "../orgnasims/Testimonial";
import { BASE_URL } from "@/util/urls";
import Loader from "../atoms/Loader";

const fetchData = async (categoryId?: string) => {
  try {
    const url = categoryId
      ? `${BASE_URL}/testimonial/all?category_id=${categoryId}`
      : `${BASE_URL}/testimonial/all`;

    const response = await fetch(url, { cache: "no-store" });
    console.log("Response URL:", url);

    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.success ? data?.data : [];
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return [];
  }
};

export default async function TestimonialsPage({
  categoryId,
}: {
  categoryId?: string;
}) {
  const testimonials = await fetchData(categoryId);
  return (
    <Suspense
      fallback={<Loader size="large" className="mx-auto border-gray-800" />}
    >
      <Testimonials testimonials={testimonials} />;
    </Suspense>
  );
}
