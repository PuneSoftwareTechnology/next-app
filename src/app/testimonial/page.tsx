"use client";
import InputBox from "@/components/atoms/InputBox";
import Typography from "@/components/atoms/Typography";
import React, { useState } from "react";
import { HiStar } from "react-icons/hi";
import Dropdown from "@/components/atoms/Dropdown";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

interface FormData {
  name: string;
  title: string;
  company: string;
  testimonial: string;
  email: string;
  rating: number;
  course: string;
}

const TestimonialForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    title: "",
    company: "",
    testimonial: "",
    email: "",
    rating: 0,
    course: "general",
  });

  const [errors, setErrors] = useState<any>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formErrors: any = {};

    // Validation
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.title) formErrors.title = "Title is required";
    if (!formData.company) formErrors.company = "Company is required";
    if (!formData.testimonial)
      formErrors.testimonial = "Testimonial is required";
    if (!formData.rating) formErrors.rating = "Rating is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Handle form submission (e.g., API call)
      console.log(formData);
    }
  };

  const courseOptions = [
    { label: "SAP Training", value: "sap", href: "/course-category/sap" },
    {
      label: "Cloud Technologies",
      value: "cloud",
      href: "/course-category/cloud",
    },
    {
      label: "Data Analytics",
      value: "data-analytics",
      href: "/course-category/data-analytics",
    },
    {
      label: "Machine Learning & AI",
      value: "ai-ml",
      href: "/course-category/ai-ml",
    },
    {
      label: "Cyber Security",
      value: "cyber-security",
      href: "/course-category/cyber-security",
    },
    { label: "General Feedback", value: "general" },
  ];

  // Form fields definition
  const formFields = [
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Your Name",
      label: "Name",
      error: errors.name,
    },
    {
      id: "title",
      name: "title",
      type: "text",
      placeholder: "Your Title/Position",
      label: "Title",
      error: errors.title,
    },
    {
      id: "company",
      name: "company",
      type: "text",
      placeholder: "Company/Organization",
      label: "Company",
      error: errors.company,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Your Email (Optional)",
      label: "Email",
      error: errors.email,
    },
  ];

  return (
    <>
      <Header />
      <main className="max-w-lg md:mx-auto py-6 mx-2 px-4 bg-white rounded-lg shadow-lg mt-24 mb-8 ">
        <Typography variant="h2" as="h2" className="text-center mb-4">
          Testimonial Form
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Map through the form fields to generate InputBox components */}
          {formFields.map(({ id, name, type, placeholder, label, error }) => (
            <div className="mb-4" key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <InputBox
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name as keyof FormData].toString()} // Convert value to string
                onChange={handleChange}
                required
                error={error}
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
          ))}

          {/* Testimonial textarea */}
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

          {/* Rating Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
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

          {/* Dropdown for course feedback */}
          <label
            htmlFor="Course Selected"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Course selected
          </label>
          <Dropdown
            id="course"
            name="course"
            options={courseOptions}
            value={formData.course}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Submit Testimonial
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default TestimonialForm;
