import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {currentYear} MyApp. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/" className="hover:underline">
            About
          </Link>
          <Link href="/" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
