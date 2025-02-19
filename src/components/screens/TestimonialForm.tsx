"use client";

import React, { useState } from "react";
import { HiStar } from "react-icons/hi";
import Dropdown from "@/components/atoms/Dropdown";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import {
  createTestimonial,
  fetchAllTestimonials,
} from "@/APIS/testimonial.service";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Typography from "@/components/atoms/Typography";
import InputBox from "@/components/atoms/InputBox";
import Head from "next/head";
import { Course } from "@/util/interfaces/course";

interface FormData {
  name: string;
  testimonial: string;
  rating: number;
  course: string;
}

type FormErrors = {
  name?: string;
  testimonial?: string;
  rating?: string;
};

interface TestimonialFormProps {
  courses: Course[];
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ courses }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    testimonial: "",
    rating: 0,
    course: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: FormErrors = {};

    // Validation
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.testimonial)
      formErrors.testimonial = "Testimonial is required";
    if (!formData.rating) formErrors.rating = "Rating is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        setLoading(true);
        const response = await createTestimonial({
          name: formData.name,
          course_id: formData.course,
          star_rating: formData.rating,
          testimonial: formData.testimonial,
        });

        if (response?.success) {
          toast.success("Testimonial submitted successfully!");
          fetchAllTestimonials();
          router.push("/");
        } else {
          toast.error("Failed to submit testimonial.");
        }
      } catch (error) {
        console.error("Error submitting testimonial:", error);
        toast.error("An error occurred while submitting your testimonial.");
      } finally {
        setLoading(false);
        setFormData({
          name: "",
          testimonial: "",
          rating: 0,
          course: "",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Add Testimonial</title>
        <meta name="description" content="Add your testimonial" />
        <meta
          name="keywords"
          content="testimonial, feedback, course, category"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/add-testimonial" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow max-w-lg md:w-2/3 md:mx-auto py-6 mx-2 px-4 bg-white rounded-lg shadow-lg mt-24 mb-8">
          <Typography variant="h1" as="h1" className="text-center mb-4">
            Add Your Testimonial
          </Typography>

          <form onSubmit={handleSubmit}>
            <div className="my-8">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <InputBox
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                error={errors.name}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Course
              </label>
              <Dropdown
                id="course"
                name="course"
                options={courses.map((course) => ({
                  label: course.name,
                  value: String(course.id),
                }))}
                value={formData.course}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="testimonial"
                className="block text-sm font-medium text-gray-700"
              >
                Testimonial
              </label>
              <textarea
                id="testimonial"
                name="testimonial"
                value={formData.testimonial}
                onChange={handleChange}
                placeholder="Your Testimonial"
                className="mt-1 block w-full p-2 text-gray-900 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.testimonial && (
                <p className="text-red-500 text-xs">{errors.testimonial}</p>
              )}
            </div>

            <div className="mt-4 mb-8 flex justify-start items-center gap-x-2">
              <label className="block text-sm font-medium text-gray-700">
                Ratings
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <HiStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      formData.rating >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-xs">{errors.rating}</p>
              )}
            </div>

            <PrimaryButton stretch loading={loading} type="submit">
              {loading ? "Submitting..." : "Submit Testimonial"}
            </PrimaryButton>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TestimonialForm;
