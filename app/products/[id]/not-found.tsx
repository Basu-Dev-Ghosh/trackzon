import { FrownIcon, Home } from "lucide-react";
import React from "react";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center text-xl ">
      <FrownIcon className="w-10 h-10 mb-2" />
      <span> Ooops! Product not found</span>
      <Link
        href="/"
        className="bg-gray-300 dark:bg-[#001427] mt-2 hover:bg-gray-400 text-md text-blue-800 dark:text-white py-1 px-6 rounded inline-flex items-center"
      >
        <Home className="w-5 h-5 mr-2" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
