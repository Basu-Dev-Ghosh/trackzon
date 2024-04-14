import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Rating from "../Rating/Rating";
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="relative m-6 h-[480px] flex w-full max-w-xs flex-col overflow-hidden rounded-lg border bg-white border-white dark:border-[#001427] dark:bg-[#001427] shadow-md">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href={`/products/${product._id}`}
      >
        <Image
          src={product.images[0]}
          alt="product image"
          width={400}
          height={400}
          className=" object-contain"
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          {product.discountRate}% OFF
        </span>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link href={`/products/${product._id}`}>
          <h5 className="text-xl tracking-tight text-slate-900 dark:text-white">
            {product.title.split(" ").slice(0, 5).join(" ")}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              {product.currency + "" + product.currentPrice}
            </span>
            <span className="text-sm text-slate-900 line-through dark:text-white">
              {product.currency + "" + product.originalPrice}
            </span>
          </p>
          <div className="flex items-start max-w-[100px] flex-col">
            <span className="mr-2 rounded bg-blue-300 px-2.5 py-0.5 text-xs font-semibold">
              {product.rating}
            </span>
            <Rating value={product.rating} />
          </div>
        </div>
        <div className="py-2">
          <button className="w-full flex items-center justify-center rounded-md bg-slate-900 dark:bg-gray-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <HeartIcon className="h-4 w-4 text-gray-200 dark:text-gray-200 mr-3" />
            Add to Favourites
          </button>
          <a
            href={product.url}
            target="_blank"
            className="flex mt-2 w-full justify-center items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
