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
        <nav aria-label="Footer Navigation" className="mt-4 ">
          <ul className="flex flex-col md:flex-row justify-center items-center gap-y-2 md:gap-x-6 text-center">
            <li>
              <a
                href="#privacy"
                className="text-sm md:text-base hover:text-gray-400"
                title="Privacy Policy"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className="text-sm md:text-base hover:text-gray-400"
                title="Terms of Service"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#contact"
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
