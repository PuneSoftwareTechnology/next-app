import React from "react";
import Testimonials from "../orgnasims/Testimonial";
import { BASE_URL } from "@/util/urls";

const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/testimonial/all`, {
      cache: "no-store", // 🚀 Ensures fresh data on every request
    });

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

export default async function TestimonialsPage() {
  const testimonials = await fetchData();
  return <Testimonials testimonials={testimonials} />;
}
