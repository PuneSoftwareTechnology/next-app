import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.punesoftwaretechnologies.com/"),
  title: "Pune Software Technologies - Empowering IT Careers",
  description:
    "Join Pune Software Technologies for expert-led IT courses and hands-on training in Pune. Unlock your potential in web development, AI, and more.",
  keywords:
    "IT training, Pune courses, web development, software training, career growth",
  authors: [
    {
      name: "Pune Software Technologies",
      url: "https://punesoftwaretechnologies.com",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://punesoftwaretechnologies.com",
    title: "Pune Software Technologies - Empowering IT Careers",
    description:
      "Expert IT courses in Pune with hands-on training and real-world projects. Join now!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pune Software Technologies Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@PuneSoftwareTech",
    title: "Pune Software Technologies - Empowering IT Careers",
    description:
      "Expert IT courses in Pune with hands-on training and real-world projects. Join now!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional metadata */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://punesoftwaretechnologies.com" />
        <link rel="icon" href="/favicon.ico" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Pune Software Technologies",
              url: "https://punesoftwaretechnologies.com",
              description: "Expert IT courses in Pune with hands-on training.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressRegion: "MH",
                postalCode: "411001",
                addressCountry: "IN",
              },
              logo: "/logo.png",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      </body>
    </html>
  );
}
