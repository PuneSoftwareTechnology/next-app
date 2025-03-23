import Typography from "@/components/atoms/Typography";
import Footer from "@/components/molecules/Footer";
import Header from "@/components/molecules/Header";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | YourWebsite</title>
        <meta
          name="description"
          content="Read our privacy policy to understand how we handle your data."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="Privacy Policy, Data Protection, Terms"
        />
        <meta name="author" content="punesoftwaretechonologies.com" />
        <meta charSet="UTF-8" />
      </Head>

      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-24">
        <Typography variant="h1" className="text-center mb-6">
          Privacy Policy
        </Typography>
        <Typography variant="p" className="mb-4">
          Your privacy is important to us. This privacy policy explains how we
          collect, use, and protect your personal information.
        </Typography>

        <section className="mb-8">
          <Typography variant="h2" className="mb-4">
            Information We Collect
          </Typography>
          <Typography variant="p" className="mb-2">
            We may collect the following types of information:
          </Typography>
          <ul className="list-disc pl-6 mb-4 text-gray-500">
            <li>Personal details like your name and email address.</li>
            <li>
              Usage data including pages visited and time spent on the site.
            </li>
            <li>Technical data such as browser type and IP address.</li>
          </ul>
        </section>

        <section className="mb-8">
          <Typography variant="h2" className="mb-4">
            How We Use Your Information
          </Typography>
          <Typography variant="p" className="mb-4">
            The information we collect is used to:
          </Typography>
          <ul className="list-disc pl-6 mb-4 text-gray-500">
            <li>Provide, improve, and personalize our services.</li>
            <li>Communicate with you about updates and offers.</li>
            <li>Ensure the security of our platform.</li>
          </ul>
        </section>

        <section className="mb-8">
          <Typography variant="h2" className="mb-4">
            Data Protection
          </Typography>
          <Typography variant="p" className="mb-4">
            We implement industry-standard measures to protect your data from
            unauthorized access, disclosure, alteration, or destruction.
          </Typography>
        </section>

        <section className="mb-8">
          <Typography variant="h2" className="mb-4">
            Your Rights
          </Typography>
          <Typography variant="p" className="mb-4">
            You have the right to access, update, or delete your personal
            information. Please contact us if you have any concerns or requests.
          </Typography>
        </section>

        <footer className="text-center mt-12">
          <Typography variant="p">
            If you have any questions about this Privacy Policy, please contact
            us at
            <a
              href="mailto:punesoftwaretechnologies@gmail.com"
              className="text-blue-500 hover:underline ml-2"
            >
              punesoftwaretechnologies@gmail.com
            </a>
            .
          </Typography>
        </footer>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
