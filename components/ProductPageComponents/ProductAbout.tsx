import { getProductById } from "@/lib";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductAbout = async ({ productId }: { productId: string }) => {
  const product: Product | null = await getProductById(productId);
  if (!product)
    return (
      <section className=" md:px-40 md:py-8 min-h-full flex flex-col justify-center ">
        <h3 className="font-bold text-3xl px-10 md:px-0">
          <Skeleton className="h-4 w-[100px]" />
        </h3>
        <ol className="px-10 mt-10 space-y-2">
          <Skeleton className="h-3 w-[70%]" />
          <Skeleton className="h-3 w-[70%]" />
          <Skeleton className="h-3 w-[70%]" />
          <Skeleton className="h-3 w-[70%]" />
          <Skeleton className="h-3 w-[70%]" />
          <Skeleton className="h-3 w-[60%]" />
          <Skeleton className="h-3 w-[60%]" />
          <Skeleton className="h-3 w-[50%]" />
          <Skeleton className="h-3 w-[50%]" />
          <Skeleton className="h-3 w-[40%]" />
        </ol>
      </section>
    );
  return (
    <section className=" md:px-40 md:py-8 min-h-full flex flex-col justify-center ">
      <h3 className="font-bold text-3xl px-10 md:px-0">About this product</h3>
      <ol className="px-10 mt-10 ">
        {product.about.map((data, i) => {
          return (
            <li
              key={i}
              className="mb-2 list-disc text-md font-normal break-words text-gray-700 lg:text-md  dark:text-gray-400 w-full md:w-[80%]"
            >
              {data}
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ProductAbout;
