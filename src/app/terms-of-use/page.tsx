import Typography from "@/components/atoms/Typography";
import Footer from "@/components/molecules/Footer";
import Header from "@/components/molecules/Header";
import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

const TermsOfUse: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms of Use - Pune Software Technologies</title>
        <meta
          name="description"
          content="Read the Terms of Use for Pune Software Technologies. Learn about our policies, restrictions, and liability limitations."
        />
        <meta
          name="keywords"
          content="Terms of Use, Policies, Website Terms, Liability, Restrictions"
        />
        <meta
          property="og:title"
          content="Terms of Use - Pune Software Technologies"
        />
        <meta
          property="og:description"
          content="Read the Terms of Use for Pune Software Technologies. Learn about our policies, restrictions, and liability limitations."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://punesoftwaretechnologies.com/terms-of-use"
        />
        <meta
          property="og:image"
          content="https://punesoftwaretechnologies.com/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Terms of Use - Pune Software Technologies"
        />
        <meta
          name="twitter:description"
          content="Read the Terms of Use for Pune Software Technologies. Learn about our policies, restrictions, and liability limitations."
        />
        <meta
          name="twitter:image"
          content="https://punesoftwaretechnologies.com/og-image.jpg"
        />
      </Head>
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 mt-28">
        <Typography variant="h1" as="h1" className="text-center">
          Terms of Use
        </Typography>
        <div className="space-y-8">
          <section>
            <Typography variant="h2" id="introduction">
              1. Introduction
            </Typography>
            <Typography variant="p">
              Welcome to Pune Software Technologies. By using our website and
              services, you agree to comply with these Terms of Use. If you do
              not agree to these terms, please do not use our website.
            </Typography>
          </section>

          <section>
            <Typography variant="h2" id="use-of-services">
              2. Use of Our Services
            </Typography>
            <Typography variant="p">
              You may use our services only in accordance with these Terms of
              Use and applicable laws. You agree to provide accurate information
              and use the site responsibly.
            </Typography>
          </section>

          <section>
            <Typography variant="h2" id="restrictions">
              3. Restrictions
            </Typography>
            <Typography variant="p">
              You are prohibited from using our services in any unlawful manner,
              including violating intellectual property rights or transmitting
              harmful content.
            </Typography>
          </section>

          <section>
            <Typography variant="h2" id="limitation-of-liability">
              4. Limitation of Liability
            </Typography>
            <Typography variant="p">
              We are not liable for any damages, loss of data, or interruptions
              in service arising from the use of our website or services, except
              as required by law.
            </Typography>
          </section>

          <section>
            <Typography variant="h2" id="changes-to-terms">
              5. Changes to Terms
            </Typography>
            <Typography variant="p">
              We reserve the right to modify these terms at any time. Any
              changes will be posted on this page, and by continuing to use the
              website, you agree to the updated terms.
            </Typography>
          </section>

          <section>
            <Typography variant="h2" id="contact-information">
              6. Contact Information
            </Typography>
            <Typography variant="p">
              If you have any questions or concerns about these Terms of Use,
              please contact us at{" "}
              <Link
                href="mailto:punesoftwaretechnologies@gmail.com"
                className="text-blue-500 hover:underline"
              >
                punesoftwaretechnologies@gmail.com
              </Link>
              .
            </Typography>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfUse;
