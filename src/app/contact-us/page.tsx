"use client";

import Typography from "@/components/atoms/Typography";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import Head from "next/head";
import { Suspense, useState } from "react";
import GlobalLoader from "@/components/molecules/GlobalLoader";
import InputBox from "@/components/atoms/InputBox";

const benefits = [
  "We’ll reach out to you between 10 AM and 9 PM",
  "Unbiased career guidance",
  "Personalized guidance based on your skills and interests",
];

type FormField = {
  label: string;
  type: string;
  name: keyof typeof initialFormData;
  placeholder: string;
};

const initialFormData = {
  fullname: "",
  phone: "",
  message: "",
};

const formFields: FormField[] = [
  {
    label: "Full Name",
    type: "text",
    name: "fullname",
    placeholder: "Enter your full name",
  },
  {
    label: "Phone Number",
    type: "tel",
    name: "phone",
    placeholder: "1234567890",
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
          <main className="flex-grow  mx-auto px-4 sm:px-6 md:px-12 lg:px-32 py-2 lg:py-12 mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <Typography variant="h2" as="h2" className="mb-6 text-left">
                  Get Expert Advice for Free: Register for Your Free
                  Consultation Now!
                </Typography>
                <div>
                  {benefits.map((benefit, index) => (
                    <span
                      className="flex justify-start items-start gap-x-2 mb-2"
                      key={index}
                    >
                      <Typography variant="h6" as="h6">
                        ✅
                      </Typography>
                      <Typography variant="h6" as="h6">
                        {benefit}
                      </Typography>
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto md:max-w-full">
                <form>
                  {formFields.map((field, index) => (
                    <div key={index} className="mb-4">
                      <label
                        className="block mb-1 text-lg font-medium"
                        htmlFor={field.name}
                      >
                        {field.label}
                      </label>
                      <InputBox
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div className="mb-4">
                    <label
                      className="block text-lg  mb-1 font-medium"
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
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white rounded-md p-2 font-medium hover:bg-blue-600 transition text-sm md:text-base"
                  >
                    Submit
                  </button>
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
