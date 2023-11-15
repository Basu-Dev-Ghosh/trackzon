import { getProductById } from "@/lib";
import { ShoppingCartIcon } from "lucide-react";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductBuyNow = async ({ productId }: { productId: string }) => {
  const product: Product | null = await getProductById(productId);
  if (!product) return <Skeleton className="h-10 w-full mt-2 bg-blue-600" />;
  return (
    <a
      type="button"
      href={product.url}
      target="_blank"
      className="flex w-full justify-center items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      <ShoppingCartIcon className="w-4 h-4 mr-2" />
      Buy Now
    </a>
  );
};

export default ProductBuyNow;
