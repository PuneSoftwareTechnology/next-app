"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import PST_LOGO from "../../assests/images/Logo.png";
import Typography from "../atoms/Typography";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href?: string;
  subMenu?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Courses Offered",
    subMenu: [
      { label: "SAP Training", href: "/course-category/sap" },
      { label: "Cloud Technologies", href: "/course-category/cloud" },
      { label: "Data Analytics", href: "/course-category/data-analytics" },
      {
        label: "Machine Learning & AI",
        href: "/course-category/artificial-intelligence",
      },
      { label: "Cyber Security", href: "/course-category/cyber-security" },
    ],
  },
  { label: "Blogs", href: "/all-blogs" },
  { label: "Contact Us", href: "/contact-us" },
];

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleSubMenu = (label: string) =>
    setActiveSubMenu((prev) => (prev === label ? null : label));

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50  lg:px-32">
      <div className="flex justify-between items-center px-2 lg:px-0 lg:py-4 py-2">
        <Link
          href="/"
          aria-label="Go to Pune Software Technologies homepage"
          className="flex justify-center items-center gap-x-2 ml-1"
        >
          <Image
            src={PST_LOGO}
            alt="Pune Software Technologies logo - IT Training Institute"
            width={50}
            height={50}
            className="w-10 h-10 md:w-12 md:h-12"
          />

          <div>
            <Typography variant="h2" as="h2" className="hidden lg:block">
              Pune Software Technologies
            </Typography>
            <Typography
              variant="p"
              as="p"
              className="lg:hidden text-xl font-black text-gray-900"
            >
              Pune Software Technologies
            </Typography>
            <Typography variant="h6" as="h6">
              IT Training Institute
            </Typography>
          </div>
        </Link>
        <button
          className="lg:hidden text-gray-700"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <FiX size={24} color="black" />
          ) : (
            <FiMenu size={24} color="black" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-x-6">
          {navItems.map((item) =>
            item.subMenu ? (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveSubMenu(item.label)}
                onMouseLeave={() => setActiveSubMenu(null)}
              >
                <div className="flex items-center cursor-pointer text-gray-700 hover:text-blue-700">
                  <Typography variant="h6" as="h6">
                    {item.label}
                  </Typography>
                  <FiChevronDown className="ml-1" />
                </div>
                {activeSubMenu === item.label && (
                  <ul className="absolute left-0  bg-white shadow-lg rounded w-56">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          href={subItem.href}
                          className={`block px-4 py-2 transition-colors hover:bg-gray-100 hover:rounded-md ${
                            pathname === subItem.href
                              ? "text-blue-700 font-semibold"
                              : "text-gray-700 hover:text-blue-700"
                          }`}
                          aria-label={subItem.label}
                        >
                          <Typography variant="h6" as="h6">
                            {subItem.label}
                          </Typography>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={`transition-colors ${
                  pathname === item.href
                    ? "text-blue-700 font-semibold"
                    : "text-gray-700 hover:text-blue-700"
                }`}
                aria-label={item.label}
              >
                <Typography variant="h6" as="h6">
                  {item.label}
                </Typography>
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 md:w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <FiX
          size={32}
          onClick={toggleMobileMenu}
          className="ml-auto m-4"
          color="black"
        />

        <nav className="flex flex-col ">
          {navItems.map((item) =>
            item.subMenu ? (
              <div
                key={item.label}
                className="flex flex-col border-b border-gray-400 p-4"
              >
                <button
                  className="flex justify-between items-center font-bold text-gray-700 hover:text-blue-700"
                  onClick={() => toggleSubMenu(item.label)}
                  aria-expanded={activeSubMenu === item.label}
                >
                  <Typography variant="h4" as="h4">
                    {item.label}
                  </Typography>
                  <FiChevronDown
                    className={`ml-1 transform transition-transform ${
                      activeSubMenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeSubMenu === item.label && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          href={subItem.href}
                          onClick={toggleMobileMenu}
                          className={`block transition-colors ${
                            pathname === subItem.href
                              ? "text-blue-700 font-semibold "
                              : "text-gray-700 hover:text-blue-700"
                          }`}
                          aria-label={subItem.label}
                        >
                          <Typography variant="h5" as="h5">
                            {subItem.label}
                          </Typography>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                onClick={toggleMobileMenu}
                className={`block transition-colors border-b border-gray-400 p-4  ${
                  pathname === item.href
                    ? "text-blue-700 font-bold "
                    : "text-gray-700 hover:text-blue-700"
                }`}
                aria-label={item.label}
              >
                <Typography variant="h4" as="h4">
                  {item.label}
                </Typography>
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Blur Effect on Main Screen */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        />
      )}
    </header>
  );
};

export default Header;
