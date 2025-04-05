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
import ContactButtons from "../organisms/ContactButtons";

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
        <div className="flex-grow">
          <main className=" max-w-lg md:w-2/3 mx-auto py-6  px-2 lg:px-4 bg-white rounded-lg shadow-lg mt-20 md:mt-28 mb-16 lg:mb-8">
            <Typography variant="h2" as="h2" className="text-center ">
              Add Your Testimonial
            </Typography>

            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <Typography variant="h5" as="h5" className="text-gray-900">
                  Name
                </Typography>
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
                <Typography variant="h5" as="h5" className="text-gray-900">
                  Course
                </Typography>
                <Dropdown
                  id="course"
                  name="course"
                  options={courses.map((course) => ({
                    label: course?.id === 0 ? "Select" : course.name,
                    value: String(course.id),
                  }))}
                  value={formData.course}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <Typography variant="h5" as="h5" className="text-gray-900">
                  Testimonial
                </Typography>
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

              <div className="my-4 flex justify-start items-center gap-x-2">
                <Typography variant="h5" as="h5" className="text-gray-900">
                  Ratings
                </Typography>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <HiStar
                      key={star}
                      size={30}
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
                Submit Testimonial
              </PrimaryButton>
            </form>
          </main>
        </div>
        <Footer />
        <ContactButtons />
      </div>
    </>
  );
};

export default TestimonialForm;
