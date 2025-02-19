"use client";
import React, { useState, useRef, useCallback } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import InputBox from "../atoms/InputBox";
import CALL_PERSON from "../../assests/images/Call.png";
import Image from "next/image";
import Typography from "../atoms/Typography";
import { DemoInterface } from "@/util/interfaces/demo";
import { sendDemoRequest } from "@/APIS/demo.service";
import { toast } from "react-toastify";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Course } from "@/util/interfaces/course";
import Dropdown from "../atoms/Dropdown";

const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface PageProps {
  courses: Course[];
}

const EnquiryForm: React.FC<PageProps> = ({ courses }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DemoInterface>({
    name: "",
    phone: "",
    email: "",
    message: "",
    course: "", // Add course to formData
  });

  const [errors, setErrors] = useState<Partial<DemoInterface>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const hcaptchaRef = useRef<HCaptcha | null>(null);

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

    if (!captchaToken) toast.error("Please complete the CAPTCHA");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      setLoading(false);
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await sendDemoRequest({ ...formData });

      if (response?.success) {
        toast.success("Request submitted. We will contact you soon.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          course: "",
        }); // Reset course
        setCaptchaToken(null);
        hcaptchaRef.current?.resetCaptcha();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col lg:flex-row items-center md:items-start justify-center px-6 md:px-32 py-12 bg-gray-50">
      <div className="w-full lg:w-1/2 mb-8 flex justify-center items-end">
        <Image
          src={CALL_PERSON}
          alt="Contact Us"
          width={600}
          height={600}
          priority
        />
      </div>
      <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
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
            id="course"
            name="course"
            options={courses.map((course) => ({
              label: course.name,
              value: String(course.id),
            }))}
            value={formData.course}
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

          {/* hCaptcha Component */}
          <HCaptcha
            sitekey="6f48d538-9762-4fc6-ae90-6398628a2a16"
            onVerify={(token) => setCaptchaToken(token)}
            ref={hcaptchaRef}
          />

          <PrimaryButton
            loading={loading}
            type="submit"
            disabled={loading || !captchaToken}
            stretch
          >
            Submit
          </PrimaryButton>
        </form>
      </div>
    </section>
  );
};

export default EnquiryForm;
