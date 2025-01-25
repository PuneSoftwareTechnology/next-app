import React from "react";
import Image from "next/image";
import Typography from "../atoms/Typography";
import CALL_PERSON from "../../assests/images/Call.png";

const EnquiryForm: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start justify-center px-6 md:px-32 py-12 bg-gray-50">
      {/* Left Section - Image */}
      <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center items-end">
        <Image
          src={CALL_PERSON}
          alt="Contact Us"
          //   className="rounded-lg shadow-md"
          width={600}
          height={600}
          priority // Ensures the image is loaded eagerly for SEO optimization
        />
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2 w-full bg-white p-8 rounded-lg shadow-lg">
        <Typography
          variant="h2"
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          Get in Touch
        </Typography>
        <form action="#" method="POST" className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your Name"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your Phone Number"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your Email Address"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your Message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EnquiryForm;
