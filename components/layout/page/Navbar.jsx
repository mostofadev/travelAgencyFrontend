"use client";

import { useState } from "react";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Visa", href: "/visa" },
    { name: "Flight", href: "/flight" },
    { name: "Package", href: "/tour" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-2">
      <Section>
        <div className="flex items-center justify-between py-4 relative">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary tracking-tight"
          >
            TravelCo
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-12 ml-20">
            {menuItems.map((item) => (
              <li key={item.name} className="group">
                <Link
                  href={item.href}
                  className="relative text-primary font-medium text-base capitalize transition-colors duration-300 hover:text-primary-dark py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Login Button */}
          <div className="hidden lg:block">
            <Button href="/login">LogIn</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col gap-1 z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={` fixed top-0 left-0 w-full h-full bg-white z-50 lg:hidden transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <Link
              href="/"
              className="text-2xl font-bold text-primary tracking-tight"
            >
              TravelCo
            </Link>
            <button onClick={closeMenu} aria-label="Close menu" className="p-2">
              <span className="block w-6 h-0.5 bg-gray-700 rotate-45 translate-y-.5 transition-all duration-300"></span>
              <span className="block w-6 h-0.5 bg-gray-700 -rotate-45 -translate-y-.5 transition-all duration-300 -mt-0.5"></span>
            </button>
          </div>

          <ul className="px-6 py-6 flex-1 overflow-y-auto space-y-2">
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                className={
                  index !== menuItems.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block bg-white py-4 px-4 text-lg font-medium text-gray-800 capitalize hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Login Button */}
          <div className="px-6 pb-6">
            <Button href="/login" fullWidth onClick={closeMenu}>
              LogIn
            </Button>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            onClick={closeMenu}
            className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          ></div>
        )}
      </Section>
    </nav>
  );
}
