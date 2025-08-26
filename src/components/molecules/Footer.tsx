import Link from "next/link";
import Typography from "../atoms/Typography";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

// Footer links config
const footerLinks = [
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  {
    href: "/terms-of-use",
    label: "Terms of Use",
    title: "Terms of Use",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
    title: "Contact Us",
  },
];

// Social links config
const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61579635066915",
    label: "Facebook",
    icon: FaFacebook,
    color: "#1877F3", // Facebook blue
  },
  {
    href: "https://www.youtube.com/@PuneSoftwareTechnologies",
    label: "Youtube",
    icon: FaYoutube,
    color: "#FF0000", // YouTube red
  },
  {
    href: "https://www.instagram.com/pune_software_technologies/",
    label: "Instagram",
    icon: FaInstagram,
    color: "#E4405F", // Instagram pink
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-800 text-white mx-auto py-6 w-full"
      role="contentinfo"
      aria-label="Site Footer"
    >
      <div className="container mx-auto px-6">
        {/* Footer text */}
        <Typography
          variant="p"
          className="text-sm md:text-base text-center text-white"
        >
          &copy; {currentYear} Pune Software Technologies. All rights reserved.
        </Typography>

        {/* Footer Links */}
        <nav
          aria-label="Footer Navigation"
          className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-y-2 sm:gap-x-6 text-center"
        >
          <ul className="flex flex-col sm:flex-row justify-center items-center gap-y-2 sm:gap-x-6 text-center">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm md:text-base text-blue-400 hover:text-blue-700 underline"
                  title={link.title}
                  target={link.target}
                  rel={link.rel}
                  aria-label={link.label}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Media Links */}
        <div
          className="mt-6 flex justify-center items-center gap-x-4"
          aria-label="Social Media Links"
        >
          {socialLinks.map(({ href, label, icon: Icon, color }) => (
            <Link
              key={label}
              href={href}
              title={label}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={24} style={{ color }} />
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-20 lg:mx-2">
        <Typography
          variant="p"
          as="p"
          className="italic text-center text-white mt-2"
        >
          Pune Software Technologies is not an authorized SAP partner
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
