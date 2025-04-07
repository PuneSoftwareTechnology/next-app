import Typography from "@/components/atoms/Typography";
import Footer from "@/components/molecules/Footer";
import Header from "@/components/molecules/Header";
import { NextPage } from "next";
import Link from "next/link";

const TermsOfUse: NextPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 mt-28">
        <Typography variant="h1" className="text-center">
          Terms of Use
        </Typography>
        <div className="space-y-8">
          <section>
            <Typography variant="h2">1. Introduction</Typography>
            <Typography variant="p">
              Welcome to Your Website Name. By using our website and services,
              you agree to comply with these Terms of Use. If you do not agree
              to these terms, please do not use our website.
            </Typography>
          </section>

          <section>
            <Typography variant="h2">2. Use of Our Services</Typography>
            <Typography variant="p">
              You may use our services only in accordance with these Terms of
              Use and applicable laws. You agree to provide accurate information
              and use the site responsibly.
            </Typography>
          </section>

          <section>
            <Typography variant="h2">3. Restrictions</Typography>
            <Typography variant="p">
              You are prohibited from using our services in any unlawful manner,
              including violating intellectual property rights or transmitting
              harmful content.
            </Typography>
          </section>

          <section>
            <Typography variant="h2">4. Limitation of Liability</Typography>
            <Typography variant="p">
              We are not liable for any damages, loss of data, or interruptions
              in service arising from the use of our website or services, except
              as required by law.
            </Typography>
          </section>

          <section>
            <Typography variant="h2">5. Changes to Terms</Typography>
            <Typography variant="p">
              We reserve the right to modify these terms at any time. Any
              changes will be posted on this page, and by continuing to use the
              website, you agree to the updated terms.
            </Typography>
          </section>

          <section>
            <Typography variant="h2">6. Contact Information</Typography>
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
