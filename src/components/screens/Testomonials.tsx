import { Suspense } from "react";
import { fetchAllTestimonials } from "@/APIS/testimonial.service";
import Loader from "../atoms/Loader";
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
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <Loader size="large" className="mx-auto border-gray-800" />
          </div>
        }
      >
        <Testimonials testimonials={testimonials} />
      </Suspense>
    </>
  );
}
