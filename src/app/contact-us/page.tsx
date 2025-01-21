// src/pages/contact-us.tsx
import Typography from "@/components/atoms/Typography";
import Head from "next/head";

const ContactUs = () => {
  return (
    <>
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
      <div className="bg-blue-500 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <Typography variant="h2" className="mb-4">
            Do you want to know how the Software Testing Course <br />
            will be an excellent fit for your career?
          </Typography>
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <form>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="email">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="mobile">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="+91-1234567890"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="interest">
                  Looking for?
                </label>
                <select
                  id="interest"
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option>Select an option</option>
                  <option>Course Information</option>
                  <option>Webinar</option>
                  <option>Career Guidance</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md p-2 font-medium hover:bg-blue-600 transition"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <Typography variant="h2" className="mb-6">
              Get Expert Advice for Free: Register for Your Free Consultation
              Now!
            </Typography>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✔</span>
                <Typography variant="p">
                  We’ll reach out to you between 10 AM and 9 PM
                </Typography>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✔</span>
                <Typography variant="p">Unbiased career guidance</Typography>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✔</span>
                <Typography variant="p">
                  Personalized guidance based on your skills and interests
                </Typography>
              </li>
            </ul>
          </div>
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6">
            <form>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="fullname">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="phone">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border border-gray-300 rounded-r-md p-2"
                    placeholder="1234567890"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="language">
                  Preferred Language
                </label>
                <select
                  id="language"
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option>Malayalam</option>
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md p-2 font-medium hover:bg-blue-600 transition"
              >
                Register Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
