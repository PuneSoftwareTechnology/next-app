import Image from "next/image";
import { Metadata } from "next";
import Typography from "../atoms/Typography";
import { CompanyInterface } from "@/util/interfaces/misc";
import { LOCAL_URL } from "@/util/urls";

interface ResponseInterface {
  success: boolean;
  message: string;
  data: CompanyInterface[];
}

// Fetch companies from API
async function fetchCompanies(): Promise<CompanyInterface[]> {
  try {
    const res = await fetch(`${LOCAL_URL}/companies/all`, {
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
    url: "https://yourwebsite.com/placements",
    images: [
      {
        url: "https://yourwebsite.com/assets/placements-banner.jpg",
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
    images: ["https://yourwebsite.com/assets/placements-banner.jpg"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://yourwebsite.com/placements",
  },
};

// Server Component for SEO optimization
export default async function PlacementsPage() {
  const companies = await fetchCompanies();

  return (
    <section
      aria-label="Placement Companies Section"
      className="py-6 px-6 md:px-32"
    >
      <Typography variant="h2" as="h2" className="text-center mb-8">
        Our Alumni Placed In
      </Typography>
      <div className="overflow-hidden">
        <div className="whitespace-nowrap animate-marquee">
          {companies?.map((company) => (
            <div key={company.id} className="inline-block px-6 sm:px-12 py-4">
              <div className="relative w-24 h-16 sm:w-36 sm:h-24">
                <Image
                  src={company.company_logo}
                  alt={`Logo of ${company.company_name} where our alumni work`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100px, 150px"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
