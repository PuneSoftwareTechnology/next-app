import Image from "next/image";
import { Metadata } from "next";
import Typography from "../atoms/Typography";
import { CompanyInterface } from "@/util/interfaces/misc";
import { BASE_URL } from "@/util/urls";
import ERROR_IMAGE from "../../assests/images/imageError.png";
import { Suspense } from "react";
import Loader from "../atoms/Loader";

interface ResponseInterface {
  success: boolean;
  message: string;
  data: CompanyInterface[];
}

// Fetch companies from API
async function fetchCompanies(): Promise<CompanyInterface[]> {
  try {
    const res = await fetch(`${BASE_URL}/companies/all`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("API response error:", res.status, res.statusText);
      return [];
    }
    const response: ResponseInterface = await res.json();
    return response.success ? response.data : [];
  } catch (error) {
    console.error("API response error:", error);
    return [];
  }
}

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Placements - Pune Software Technologies",
  description:
    "Discover top companies where our alumni have secured placements. Our successful students are placed in leading tech firms worldwide.",
  openGraph: {
    title: "Placements - Pune Software Technologies",
    description:
      "Discover top companies where our alumni have secured placements.",
    type: "website",
    url: "https://punesoftwaretechnologies.com/placements",
    images: [
      {
        url: "https://punesoftwaretechnologies.com/assets/placements-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Placements Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Placements - Pune Software Technologies",
    description:
      "Discover top companies where our alumni have secured placements.",
    images: [
      "https://punesoftwaretechnologies.com/assets/placements-banner.jpg",
    ],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://punesoftwaretechnologies.com/placements",
  },
};

// Server Component for SEO optimization
export default async function PlacementsPage() {
  const companies = await fetchCompanies();

  return (
    <section
      aria-label="Placement Companies Section"
      className="pb-4 lg:pb-8 px-4 lg:px-32"
    >
      <Suspense
        fallback={<Loader size="large" className="mx-auto border-gray-800" />}
      >
        <Typography variant="h2" as="h2" className="text-center mb-8">
          Our Aluminis Placed In
        </Typography>
        <div className="overflow-hidden">
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
            {companies?.map((company) => (
              <div
                key={company.id}
                className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm flex items-center justify-center"
              >
                <Image
                  src={company.logo_url || ERROR_IMAGE}
                  alt={`Logo of ${company.name} where our alumni work`}
                  className="object-contain"
                  width={100}
                  height={50}
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </section>
  );
}
