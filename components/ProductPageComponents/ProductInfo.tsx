import { getProductById } from "@/lib";
import { HeartIcon, Percent } from "lucide-react";
import React from "react";
import Rating from "../Rating/Rating";
import PriceInfo from "../PriceInfo/PriceInfo";
import { Skeleton } from "../ui/skeleton";

const ProductInfo = async ({ productId }: { productId: string }) => {
  const product: Product | null = await getProductById(productId);
  if (!product)
    return (
      <>
        {" "}
        <p className="flex justify-between w-full  items-center my-2">
          <Skeleton className="h-1 w-[140px]" />
          <span className="border rounded-full p-2 cursor-pointer">
            <Skeleton className="h-6 w-6 rounded-full" />
          </span>
        </p>
        <h1 className="mb-0 space-y-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          <Skeleton className="h-[42px] w-[400px]" />
          <Skeleton className="h-[32px] w-[300px]" />
          <Skeleton className="h-[22px] w-[200px]" />
        </h1>
        <span className="mt-4 flex items-center ">
          <Skeleton className="h-1 w-[160px]" />
        </span>
        <span className="text-sm mt-1">
          <Skeleton className="h-1 w-[130px]" />
        </span>
        <span className="text-xs mt-1">
          <Skeleton className="h-1 w-[100px]" />
        </span>
        <span className="flex flex-wrap my-6 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          <Skeleton className="h-4 w-[100px]" />
        </span>
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
          <Skeleton className="border bg-red-300 w-32 h-20 rounded-lg shadow-md p-4 flex flex-col justify-center items-center"></Skeleton>
          <Skeleton className="border bg-blue-300 w-32 h-20 rounded-lg shadow-md p-4 flex flex-col justify-center items-center"></Skeleton>
          <Skeleton className="border bg-yellow-300 w-32 h-20 rounded-lg shadow-md p-4 flex flex-col justify-center items-center"></Skeleton>
          <Skeleton className="border bg-white w-32 h-20 rounded-lg shadow-md p-4 flex flex-col justify-center items-center"></Skeleton>
        </div>
      </>
    );
  return (
    <div className="flex flex-col w-full">
      <></>
      <p className="flex justify-between w-full  items-center my-2">
        <span>
          {product.categories.map((cate, i, arr) => {
            return (
              <span key={i} className="text-xs text-slate-500">
                {cate + `${i !== arr.length - 1 && " > "}`}
              </span>
            );
          })}
        </span>

        <span className="border rounded-full p-2 cursor-pointer">
          <HeartIcon className="w-6 h-6" />
        </span>
      </p>
      <h1 className="mb-0 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
        {product.title}
      </h1>
      <span className="mt-2 flex items-center ">
        <Rating value={product.rating} />
        <span className="text-xs p-2">{product.ratingCountString}</span>
      </span>
      <span className="text-sm">{product.previousBought}</span>
      <span className="text-xs">
        Expected delivery by {product.deliveryDate}
      </span>
      <span className="flex flex-wrap my-6 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
        {product.currency + "" + product.currentPrice}
        <span className="mt-2 flex items-center md:mt-0 bg-orange-300 text-black w-fit h-fit rounded-md tracking-wide text-xs px-1 py-1 mx-2">
          {-product.discountRate}
          <Percent className="w-3 h-3" />
        </span>
        {product.currentPrice === product.lowestPrice ? (
          <span className="mt-2 md:mt-0 bg-blue-900 w-fit h-fit rounded-md tracking-wide text-xs px-2 py-1 mx-2 text-white">
            Lowest price!
          </span>
        ) : product.currentPrice === product.highestPrice ? (
          <span className="mt-2 md:mt-0 bg-red-300 w-fit h-fit rounded-md tracking-wide text-xs px-2 py-1 mx-2">
            Higest price!
          </span>
        ) : product.currentPrice === product.averagePrice ? (
          <span className="mt-2 md:mt-0 bg-yellow-300 w-fit h-fit rounded-md tracking-wide text-xs px-2 py-1 mx-2">
            Average price!
          </span>
        ) : null}
        <span
          className={`${
            product.isOutOfStock ? "bg-red-600" : "bg-green-500"
          } w-fit mt-2 md:mt-0 h-fit rounded-md tracking-wide text-xs px-2 py-1 mx-2 text-white`}
        >
          {product.isOutOfStock ? "Out of Stock" : "In Stock"}
        </span>
      </span>

      <PriceInfo
        currency={product.currency}
        averagePrice={product.averagePrice}
        originalPrice={product.originalPrice}
        lowestPrice={product.lowestPrice}
        highestPrice={product.highestPrice}
      />
    </div>
  );
};

export default ProductInfo;
