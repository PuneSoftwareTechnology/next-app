"use client";

import React, { useState, useCallback, useEffect } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import InputBox from "../atoms/InputBox";
import CALL_PERSON from "../../assests/images/Call.png";
import Image from "next/image";
import Typography from "../atoms/Typography";
import { DemoInterface } from "@/util/interfaces/demo";
import { sendDemoRequest } from "@/APIS/demo.service";
import { toast } from "react-toastify";
import { Course } from "@/util/interfaces/course";
import Dropdown from "../atoms/Dropdown";
import { verifyCaptcha } from "@/APIS/serverActions";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { FiX } from "react-icons/fi";
import { redirect } from "next/navigation";
import Link from "next/link";

const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface PageProps {
  courses: Course[];
  showModal: boolean;
}

// Custom hook for reCAPTCHA
const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

  useEffect(() => {
    if (executeRecaptcha) {
      setIsRecaptchaLoaded(true);
    }
  }, [executeRecaptcha]);

  const getRecaptchaToken = async (action: string) => {
    if (!executeRecaptcha) {
      throw new Error("reCAPTCHA not loaded");
    }
    return await executeRecaptcha(action);
  };

  return { getRecaptchaToken, isRecaptchaLoaded };
};

const EnquiryFormContent: React.FC<PageProps> = ({ courses, showModal }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DemoInterface>({
    name: "",
    phone: "",
    email: "",
    message: "",
    course_id: "", // Updated to course_id
  });

  const [errors, setErrors] = useState<Partial<DemoInterface>>({});
  const { getRecaptchaToken, isRecaptchaLoaded } = useRecaptcha();

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the error on change
      }));
    },
    []
  );

  const validateForm = () => {
    const newErrors: Partial<DemoInterface> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (!isRecaptchaLoaded) {
        throw new Error("reCAPTCHA not loaded");
      }

      // Generate reCAPTCHA token
      const token = await getRecaptchaToken("enquiryFormSubmit");

      // Verify the CAPTCHA token
      await verifyCaptcha(token);

      // Prepare the payload with course_id
      const payload = {
        ...formData,
        course_id: formData.course_id, // Ensure course_id is included
      };

      // Submit the form data
      const response = await sendDemoRequest(payload);

      if (response?.success) {
        toast.success("Request submitted. We will contact you soon.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          course_id: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      if (!showModal) {
        redirect("/");
      }
      setLoading(false);
    }
  };

  console.log(
    "RECAPTCHA_SITE_KEY",
    process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
  );

  console.log(
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY",
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  );

  return (
    <section className="flex flex-col lg:flex-row items-center md:items-start justify-center mb-8 px-2 md:px-4 lg:px-32 py-4">
      {!showModal && (
        <div className="w-full hidden lg:block lg:w-1/2 mb-8 flex justify-center items-end">
          <Image
            src={CALL_PERSON}
            alt="Contact Us"
            width={600}
            height={600}
            priority
          />
        </div>
      )}
      <div
        className={`w-full relative ${
          showModal ? "lg:w-full" : "lg:w-1/2"
        } bg-white px-2 md:px-4 py-4 lg:p-8 rounded-lg shadow-lg`}
      >
        {showModal && (
          <Link href="/">
            <FiX
              onClick={() => {}}
              color="#000"
              size={30}
              className="right-5 top-3 absolute"
            />
          </Link>
        )}

        <Typography variant="h2" as="h2">
          Get in Touch
        </Typography>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <InputBox
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            aria-label="Full Name"
          />
          <InputBox
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            aria-label="Phone Number"
          />
          <InputBox
            id="email"
            name="email"
            type="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            aria-label="Email Address"
          />
          <Dropdown
            id="course_id"
            name="course_id"
            options={courses.map((course) => ({
              label: course?.id === 0 ? "Interested In" : course.name,
              value: String(course.id),
            }))}
            value={formData.course_id}
            onChange={handleChange}
          />
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full border-2 border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 sm:text-sm"
            required
            aria-label="Message"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}

          <PrimaryButton loading={loading} type="submit" stretch>
            Submit
          </PrimaryButton>
        </form>
      </div>
    </section>
  );
};

const EnquiryForm: React.FC<PageProps> = ({ courses, showModal }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "Missing-key"}
      scriptProps={{
        async: false,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <EnquiryFormContent courses={courses} showModal={showModal} />
    </GoogleReCaptchaProvider>
  );
};

export default EnquiryForm;
