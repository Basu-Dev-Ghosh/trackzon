import { getSimilarProducts } from "@/lib";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Skeleton } from "../ui/skeleton";
import ProductCardSkelton from "../ProductCard/ProductCardSkeleton";

const SimilarProducts = async ({ productId }: { productId: string }) => {
  const similarProducts: Product[] | undefined = await getSimilarProducts(
    productId
  );
  if (!similarProducts)
    return (
      <section className="p-10 min-h-full flex flex-col  items-center">
        <div className="flex flex-col max-w-3xl self-start md:self-auto">
          <h5 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
            <Skeleton className="h-5 w-[200px]" />
          </h5>
        </div>
        <div className="md:px-14 w-full  mt-2 md:mt-0 flex flex-row flex-wrap items-center justify-center">
          <ProductCardSkelton />
          <ProductCardSkelton />
          <ProductCardSkelton />
        </div>
      </section>
    );
  return (
    <section className="p-10 min-h-full flex flex-col  items-center">
      <div className="flex flex-col max-w-3xl self-start md:self-auto">
        <h5 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          Similar Products
        </h5>
      </div>
      <div className="md:px-14  mt-2 md:mt-0 flex flex-row flex-wrap items-center justify-center">
        {similarProducts &&
          similarProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
