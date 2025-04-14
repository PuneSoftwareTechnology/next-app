"use client";

import React, { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import Typography from "@/components/atoms/Typography";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import InputBox from "@/components/atoms/InputBox";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { sendConsultationRequest } from "@/APIS/demo.service";
import { verifyCaptcha } from "@/APIS/serverActions";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const benefits = [
  "We’ll reach out to you between 10 AM and 9 PM",
  "Unbiased career guidance",
  "Personalized guidance based on your skills and interests",
];

const initialFormData = {
  fullname: "",
  phone: "",
  message: "",
};

const phoneRegex = /^[0-9]{10}$/; // Ensures a valid 10-digit Indian phone number

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

const ContactUsContent = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof initialFormData>>({});
  const { getRecaptchaToken, isRecaptchaLoaded } = useRecaptcha();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the error on change
      }));
    },
    []
  );

  const validateForm = () => {
    const newErrors: Partial<typeof initialFormData> = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.message.trim()) newErrors.message = "Message is required";

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
      const token = await getRecaptchaToken("contactFormSubmit");

      // Verify the CAPTCHA token
      await verifyCaptcha(token);

      // Submit the form data
      const response = await sendConsultationRequest({
        name: formData.fullname,
        phone_number: parseInt(formData.phone, 10),
        message: formData.message,
      });

      if (response?.success) {
        toast.success("Request submitted. We will contact you soon.");
        setFormData(initialFormData);
      } else {
        toast.error(
          response?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Get Expert Guidance</title>
        <meta
          name="description"
          content="Contact us for expert advice and free consultation. Get personalized guidance on courses, career paths, and skills enhancement tailored to your needs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="contact us, free consultation, expert advice, career guidance, skills enhancement, career paths"
        />
        <link
          rel="canonical"
          href="https://punesoftwaretechnologies.com/contact-us"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Contact Us | Get Expert Guidance" />
        <meta
          property="og:description"
          content="Contact us for expert advice and free consultation. Get personalized guidance on courses, career paths, and skills enhancement tailored to your needs."
        />
        <meta
          property="og:url"
          content="https://punesoftwaretechnologies.com/contact-us"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://punesoftwaretechnologies.com/images/placeholder-banner.jpg"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Get Expert Guidance" />
        <meta
          name="twitter:description"
          content="Contact us for expert advice and free consultation. Get personalized guidance on courses, career paths, and skills enhancement tailored to your needs."
        />
        <meta
          name="twitter:image"
          content="https://punesoftwaretechnologies.com/images/placeholder-banner.jpg"
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mx-auto px-4 md:px-12 lg:px-32 py-2 lg:py-12 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <Typography variant="h2" as="h1" className="mb-6 text-left">
                Get Expert Advice for Free: Register for Your Free Consultation
                Now!
              </Typography>
              <div>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-x-2 mb-2">
                    <Typography variant="h6" as="h6">
                      ✅
                    </Typography>
                    <Typography variant="h6" as="h6">
                      {benefit}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white text-gray-900 rounded-lg shadow-lg py-4 px-2 md:p-6 w-full max-w-md mx-auto md:max-w-full mb-12">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block mb-1 text-lg font-medium"
                    htmlFor="fullname"
                  >
                    Full Name
                  </label>
                  <InputBox
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    error={errors.fullname}
                    required
                    aria-label="Full Name"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-1 text-lg font-medium"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <InputBox
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    error={errors.phone}
                    required
                    aria-label="Phone Number"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-lg mb-1 font-medium"
                    htmlFor="message"
                  >
                    Short Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 sm:text-sm"
                    required
                    aria-label="Message"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <PrimaryButton type="submit" stretch loading={loading}>
                  Submit
                </PrimaryButton>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const ContactUs = () => {
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
      <ContactUsContent />
    </GoogleReCaptchaProvider>
  );
};

export default ContactUs;
