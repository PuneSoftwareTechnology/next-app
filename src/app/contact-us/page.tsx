"use client";

import { useRef, useState } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { Suspense } from "react";
import Typography from "@/components/atoms/Typography";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import GlobalLoader from "@/components/molecules/GlobalLoader";
import InputBox from "@/components/atoms/InputBox";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { sendConsultationRequest } from "@/APIS/demo.service";

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

const phoneRegex = /^[6-9]\d{9}$/; // Ensures a valid 10-digit Indian phone number

const ContactUs = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullname.trim()) {
      toast.error("Full Name is required.");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone Number is required.");
      return false;
    } else if (!phoneRegex.test(formData.phone)) {
      toast.error("Enter a valid 10-digit phone number.");
      return false;
    }

    if (!formData.message.trim()) {
      toast.error("Message is required.");
      return false;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await sendConsultationRequest({
        name: formData.fullname,
        phone_number: parseInt(formData.phone, 10),
        message: formData.message,
      });

      if (response?.success) {
        toast.success("Request submitted. We will contact you soon.");
        recaptchaRef.current?.reset();
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
      <Suspense fallback={<GlobalLoader />}>
        <Head>
          <title>Contact Us | Get Expert Guidance</title>
          <meta
            name="description"
            content="Register now for expert advice and free consultation. Get personalized guidance on courses, career paths, and skills enhancement."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="keywords"
            content="contact us, free consultation, expert advice, career guidance"
          />
          <link rel="canonical" href="https://yourwebsite.com/contact-us" />
        </Head>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow mx-auto px-6 md:px-12 lg:px-32 py-2 lg:py-12 mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <Typography variant="h2" as="h2" className="mb-6 text-left">
                  Get Expert Advice for Free: Register for Your Free
                  Consultation Now!
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
              <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto md:max-w-full mb-12">
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
                    />
                  </div>

                  <ReCAPTCHA
                    sitekey={
                      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                      "Missing-key"
                    }
                    onChange={(token: string | null) => setCaptchaToken(token)}
                    ref={recaptchaRef}
                    className="mb-4"
                  />

                  <PrimaryButton type="submit" stretch loading={loading}>
                    Submit
                  </PrimaryButton>
                </form>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </Suspense>
    </>
  );
};

export default ContactUs;
