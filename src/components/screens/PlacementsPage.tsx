import Image from "next/image";
import Typography from "../atoms/Typography";

// Define the type for each logo object
interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// The logosData array with the type of Logo
const logosData: Logo[] = [
  {
    src: "https://imgs.search.brave.com/ll08WyeisibDICyh5c8roZl0CeUXPDVVHaKqLuFWbhM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL3Rjcy10/YXRhLWNvbnN1bHRh/bmN5LXNlcnZpY2Vz/Mjc5Mi5sb2dvd2lr/LmNvbS53ZWJw",
    alt: "TCS Logo",
    width: 150,
    height: 50,
  },
  {
    src: "https://imgs.search.brave.com/gWq8eFATkf4APYQiPycK6zrmYhsKw5mFxF4d_b__FmA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8xOTMt/MTkzMjY5OV93aXBy/by1sb2dvLXBuZy10/cmFuc3BhcmVudC1w/bmcucG5n",
    alt: "Wipro Logo",
    width: 150,
    height: 50,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/600px-Infosys_logo.svg.png",
    alt: "Infosys Logo",
    width: 150,
    height: 50,
  },
  {
    src: "https://imgs.search.brave.com/UDvuWryBQLVWJbRrX16ijxO4_ZQtb3QuHf5_MEPGxvc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9HZW5wYWN0/L0dlbnBhY3QtTG9n/by53aW5lLnN2Zw",
    alt: "Genpact Logo",
    width: 150,
    height: 50,
  },
  {
    src: "https://imgs.search.brave.com/u7kz0IKq58P1OKHimwltgqmx5d_CMFAOUBWNO40Nvqg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb21w/YW5pZXNsb2dvLmNv/bS9pbWcvb3JpZy9M/VElNLk5TLWRlYTU5/ZGM2LnBuZz90PTE3/MjAyNDQ0OTI",
    alt: "LTIMindtree Logo",
    width: 150,
    height: 50,
  },
];

const PlacementPage = () => {
  return (
    <section aria-label="Company Logos Marquee" className="bg-green-700 py-6">
      <Typography variant="h2" as="h2" className=" text-center">
        Our Aluminis placed in
      </Typography>
      <div className="overflow-hidden">
        <div className="whitespace-nowrap animate-marquee">
          {logosData.map((logo, index) => (
            <div key={index} className="inline-block px-12 py-4 bg-red-400">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementPage;
