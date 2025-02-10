import React from "react";
import Head from "next/head";
import Loader from "@/components/atoms/Loader";
import Typography from "@/components/atoms/Typography";
import Header from "@/components/molecules/Header";

const Loading: React.FC = () => {
  return (
    <>
      {/* SEO Optimization */}
      <Head>
        <title>Loading... Please Wait</title>
        <meta
          name="description"
          content="Loading page with a visible header and a transparent background."
        />
        <meta
          name="keywords"
          content="loading, spinner, react, SEO, responsive"
        />
        <meta name="author" content="Your Name" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-0 z-50 min-h-screen"
      >
        {/* Loader with responsive size */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <Loader size="large" className="mx-auto border-gray-800" />
          <Typography variant="p" as="p" className="mb-6">
            Loading, please wait...
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Loading;
