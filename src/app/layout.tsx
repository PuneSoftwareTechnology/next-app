import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://punesoftwaretechnologies.com/"),
  title: "Pune Software Technologies - IT Training Institute",
  description:
    "Join Pune Software Technologies for expert-led IT courses and hands-on training in Pune. Unlock your potential in SAP, Cloud Computing, AI & ML, Data Analytics, and Cyber Security.",
  keywords:
    "IT training, Pune courses, software training, SAP, Cloud Computing, AI, ML, Data Analytics, Cyber Security, career growth",
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
    title: "Pune Software Technologies - IT Training Institute",
    description:
      "Expert IT courses in Pune with hands-on training and real-world projects. Join Pune Software Technologies now!",
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
    title: "Pune Software Technologies - IT Training Institute",
    description:
      "Expert IT courses in Pune with hands-on training and real-world projects. Join Pune Software Technologies now!",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="69QQqzCTxMZ8bBs5Crfmadn0y4YUZQsFn09JWhHnMqs"
        />
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
              logo: "https://punesoftwaretechnologies.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.a02dd24f.png&w=64&q=75",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressRegion: "MH",
                postalCode: "411001",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=61579635066915",
                "https://www.youtube.com/@PuneSoftwareTechnologies",
                "https://www.instagram.com/pune_software_technologies/",
              ],
            }),
          }}
        />
      </head>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-36X2FRJ5W4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-36X2FRJ5W4');
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
