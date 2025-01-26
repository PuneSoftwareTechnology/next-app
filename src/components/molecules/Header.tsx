"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import PST_LOGO from "../../assests/images/Logo.png";

interface NavItem {
  label: string;
  href?: string;
  subMenu?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "All Courses",
    subMenu: [
      { label: "SAP Training", href: "/courses/sap" },
      { label: "Cloud Technologies", href: "/courses/cloud" },
      {
        label: "Data Analytics",
        href: "/courses/data-analytics",
      },
      { label: "Machine Learning & AI", href: "/courses/ai-ml" },
      { label: "Cyber Security", href: "/courses/cyber-security" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleSubMenu = (label: string) =>
    setActiveSubMenu((prev) => (prev === label ? null : label));

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 md:px-32">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to Pune Software Technologies homepage"
          className="flex justify-center items-center gap-x-4 ml-4 mx-auto"
        >
          <Image
            src={PST_LOGO}
            alt="Pune Software Technologies logo"
            width={50}
            height={50}
            priority
          />
          <span className="text-lg font-bold text-gray-800 md:hidden lg:block ">
            Pune Software Technologies
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-x-6">
          {navItems.map((item) =>
            item.subMenu ? (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveSubMenu(item.label)}
                onMouseLeave={() => setActiveSubMenu(null)}
              >
                <div className="flex items-center cursor-pointer">
                  <span className="text-gray-700 hover:text-blue-500 transition-colors">
                    {item.label}
                  </span>
                  <FiChevronDown className="ml-1 text-gray-500" />
                </div>
                {activeSubMenu === item.label && (
                  <ul className="absolute left-0 pt-2 bg-gray-200 shadow-lg rounded w-56">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:rounded-md transition-colors"
                          aria-label={subItem.label}
                        >
                          {subItem.label}
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
                className="text-gray-700 hover:text-blue-500 transition-colors"
                aria-label={item.label}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="p-4 text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <FiX size={24} />
        </button>
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map((item) =>
            item.subMenu ? (
              <div key={item.label} className="flex flex-col">
                <button
                  className="flex justify-between items-center text-gray-700 font-bold"
                  onClick={() => toggleSubMenu(item.label)}
                  aria-expanded={activeSubMenu === item.label}
                >
                  {item.label}
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
                          className="text-gray-700 hover:text-blue-500"
                          aria-label={subItem.label}
                        >
                          {subItem.label}
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
                className="text-gray-700 hover:text-blue-500"
                aria-label={item.label}
              >
                {item.label}
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
