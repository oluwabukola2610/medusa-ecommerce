"use client";
import Fcaebook from "@/public/svg/Fcaebook";
import GitHub from "@/public/svg/GitHub";
import Instagram from "@/public/svg/Instagram";
import X from "@/public/svg/X";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
type SectionKey = "product" | "categories" | "legals" | "socials";
const FooterSection = () => {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>(
    {
      product: false,
      categories: false,
      legals: false,
      socials: false,
    }
  );

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  return (
    <section className="bg-[#F8F9FB] py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center md:items-start font-light text-start flex-col mb-10  w-full md:max-w-2xl">
          <h2 className="text-[18px] md:text-[42px] text-black mb-4 text-center">
            Launch Your E-Commerce today with our ready-made template.
          </h2>
          <Link
            href="/"
            className="bg-white text-black py-3 px-6 rounded shadow border flex items-center gap-3"
          >
            View on Github
            <GitHub />
          </Link>
        </div>

        <footer className="py-6 border-t">
          <div className="flex justify-between items-start">
            <Link href="/" className="text-lg font-bold text-primary">
              TE STORE
            </Link>
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-gray-600">
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection("product")}
                  aria-expanded={openSections.product}
                >
                  <h3 className="text-primary mb-3">Product</h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      openSections.product ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openSections.product && (
                  <ul className="space-y-2 text-black">
                    <li>Overview</li>
                    <li>Features</li>
                    <li>Solution</li>
                    <li>Tutorials</li>
                    <li>Releases</li>
                  </ul>
                )}
              </div>

              {/* Categories Section */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection("categories")}
                  aria-expanded={openSections.categories}
                >
                  <h3 className="text-primary mb-3">Categories</h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      openSections.categories ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openSections.categories && (
                  <ul className="space-y-2 text-black">
                    <li>Apparel</li>
                    <li>Furniture</li>
                    <li>Electronics</li>
                    <li>Beauty</li>
                  </ul>
                )}
              </div>

              {/* Legals Section */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection("legals")}
                  aria-expanded={openSections.legals}
                >
                  <h3 className="text-primary mb-3">Legals</h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      openSections.legals ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openSections.legals && (
                  <ul className="space-y-2 text-black">
                    <li>Terms</li>
                    <li>Privacy</li>
                    <li>Licenses</li>
                    <li>Settings</li>
                    <li>Contact</li>
                  </ul>
                )}
              </div>

              {/* Socials Section */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection("socials")}
                  aria-expanded={openSections.socials}
                >
                  <h3 className="text-primary mb-3">Socials</h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      openSections.socials ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openSections.socials && (
                  <ul className="space-y-2 text-black">
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                    <li>GitHub</li>
                  </ul>
                )}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 lg:gap-8 text-sm text-gray-600">
              <div>
                <h3 className="text-primary  mb-3">Product</h3>
                <ul className="space-y-2 text-black">
                  <li>Overview</li>
                  <li>Features</li>
                  <li>Solution</li>
                  <li>Tutorials</li>
                  <li>Releases</li>
                </ul>
              </div>
              <div>
                <h3 className="text-primary  mb-3">Categories</h3>
                <ul className="space-y-2 text-black">
                  <li>Apparel</li>
                  <li>Furniture</li>
                  <li>Electronics</li>
                  <li>Beauty</li>
                </ul>
              </div>
              <div>
                <h3 className="text-primary  mb-3">Legals</h3>
                <ul className="space-y-2 text-black">
                  <li>Terms</li>
                  <li>Privacy</li>
                  <li>Licenses</li>
                  <li>Settings</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h3 className="text-primary  mb-3">Socials</h3>
                <ul className="space-y-2 text-black">
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                  <li>GitHub</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-y mt-8 py-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-gray-500">
            <p className="text-sm text-black">
              ©2024 Trade Enablers. All rights reserved
            </p>
            <ul className="flex items-center gap-4 mt-4 md:mt-0">
              <li className="hover:text-black">
                <GitHub />
              </li>
              <li className="hover:text-black">
                <X />
              </li>
              <li className="hover:text-black">
                <Fcaebook />
              </li>
              <li className="hover:text-black">
                <Instagram />
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FooterSection;
