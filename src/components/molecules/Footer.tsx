import Link from "next/link";
import Typography from "../atoms/Typography";
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-800 text-white mx-auto py-6 w-full"
      role="contentinfo"
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
            <li>
              <Link
                href="/privacy-policy"
                className="text-sm md:text-base text-blue-400 hover:text-blue-700 underline"
                title="Privacy Policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-use"
                className="text-sm md:text-base text-blue-400 hover:text-blue-700 underline"
                title="Terms of use"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Use
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="text-sm md:text-base text-blue-400 hover:text-blue-700 underline"
                title="Contact Us"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social Media Links */}
        <div
          className="mt-6 flex justify-center items-center gap-x-4"
          aria-label="Social Media Links"
        >
          <Link href="#" title="Facebook" aria-label="Facebook">
            <FaFacebook
              size={24}
              className="text-blue-600 hover:text-blue-800"
            />
          </Link>
          <Link href="#" title="Twitter" aria-label="Twitter">
            <FaTwitter
              size={24}
              className="text-blue-400 hover:text-blue-600"
            />
          </Link>
          <Link href="#" title="Instagram" aria-label="Instagram">
            <FaInstagram
              size={24}
              className="text-pink-500 hover:text-pink-700"
            />
          </Link>
          <Link
            href="#"
            title="Google Business Profile"
            aria-label="Google Business Profile"
          >
            <FaGoogle size={24} className="text-blue-500 hover:text-blue-700" />
          </Link>
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
