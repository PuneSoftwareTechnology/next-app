import Typography from "../atoms/Typography";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mx-auto py-6" role="contentinfo">
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
              <a
                href="/privacy-policy"
                className="text-sm md:text-base hover:text-gray-400"
                title="Privacy Policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-of-use"
                className="text-sm md:text-base hover:text-gray-400"
                title="Terms of use"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="text-sm md:text-base hover:text-gray-400"
                title="Contact Us"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
