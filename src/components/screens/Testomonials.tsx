import React from "react";
import { fetchAllTestimonials } from "@/APIS/testimonial.service";

import Testimonials from "../orgnasims/Testimonial";

const fetchData = async () => {
  try {
    const response = await fetchAllTestimonials();
    if (response?.success) {
      return response?.data;
    }
  } catch (err) {
    console.error("Error fetching categories", err);
    return null;
  } finally {
  }
};

export default async function TestimonialsPage() {
  const testimonials = (await fetchData()) ?? [];
  return (
    <>
      <Testimonials testimonials={testimonials} />
    </>
  );
}
