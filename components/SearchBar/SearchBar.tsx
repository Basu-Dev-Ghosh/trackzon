"use client";

import { scrapAndStoreProduct } from "@/lib";
import React, { useState, useCallback, useRef } from "react";
import ProductNotFoundModal from "../ProductNotFoundModal/ProductNotFoundModal";
import { useRouter } from "next/navigation";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

const SearchBar = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const checkUrlAndSearchProduct = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const productUrl = inputRef?.current?.value || "";
      // console.log(productUrl);

      if (!isValidAmazonProductURL(productUrl)) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
        return;
      }
      try {
        setShowLoader(true);
        const data = await scrapAndStoreProduct(productUrl);
        if (!data) {
          setProductNotFound(true);
          setShowLoader(false);
          return;
        }
        const product: Product = JSON.parse(data as string);
        router.push(`/products/${product._id}`);
      } catch (err) {
        setProductNotFound(true);
        setShowLoader(false);
        console.log(err);
      }
    },
    [router]
  );

  return (
    <form onSubmit={checkUrlAndSearchProduct}>
      {showAlert && (
        <div className="relative w-full md:w-3/4 bg-red-400 px-4 py-2 text-base text-white">
          Oops! Product link is not valid.
        </div>
      )}
      <ProductNotFoundModal
        open={productNotFound}
        onOpenChange={setProductNotFound}
      />
      <div className="flex">
        <div className="relative w-full md:w-3/4 ">
          <input
            type="text"
            id="search-dropdown"
            autoComplete="off"
            className="block p-6 w-full z-20 text-sm outline-none focus:outline-none  text-gray-900 bg-gray-50  placeholder:text-md  border border-gray-400 dark:focus:border-0  dark:bg-slate-700 dark:border-s-gray-700  dark:border-0 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Paste the Amazon product link here"
            required
            ref={inputRef}
          />
          <button
            disabled={showLoader}
            type="submit"
            className="disabled:bg-gray-600 disabled:cursor-not-allowed absolute top-0 end-0 px-10 py-6  transition-all duration-100  text-sm font-medium h-full text-white bg-blue-800  border border-blue-800 dark:border-[#001427] hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#001427] dark:hover:bg-[#060a0e]  dark:focus:ring-[#001427]"
          >
            <svg
              className={`w-4 h-4 ${showLoader ? "animate-ping" : ""}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
