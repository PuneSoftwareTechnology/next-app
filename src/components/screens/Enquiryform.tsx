"use client";
import React, { useState, useRef } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import InputBox from "../atoms/InputBox";
import CALL_PERSON from "../../assests/images/Call.png";
import Image from "next/image";
import Typography from "../atoms/Typography";
import { DemoInterface } from "@/util/interfaces/demo";
import { sendDemoRequest } from "@/APIS/demo.service";
import { toast } from "react-toastify";
import HCaptcha from "@hcaptcha/react-hcaptcha";
const EnquiryForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<DemoInterface>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<DemoInterface>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const hcaptchaRef = useRef<HCaptcha | null>(null);

  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = { name: "", phone: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name) {
      validationErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phone) {
      validationErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      validationErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.message) {
      validationErrors.message = "Message is required";
      isValid = false;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      const response = await sendDemoRequest({ ...formData });
      if (response?.success) {
        toast.success("Request submitted. We will contact you soon.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        setCaptchaToken(null);
        hcaptchaRef.current?.resetCaptcha();
      }
    }

    setLoading(false);
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
        <Typography className="" variant="h2" as="h2">
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
            required
            error={errors.name}
            aria-label="Full Name"
          />
          <InputBox
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            error={errors.phone}
            aria-label="Phone Number"
          />
          <InputBox
            id="email"
            name="email"
            type="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
            aria-label="Email Address"
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
            disabled={
              !formData.name ||
              !formData.phone ||
              !formData.email ||
              !formData.message ||
              !captchaToken
            }
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
