import Carousal from "@/components/Carousal/Carousal";
import { getProductById } from "@/lib";
import { Skeleton } from "../ui/skeleton";

const ProductImageCarosel = async ({ productId }: { productId: string }) => {
  const product: Product | null = await getProductById(productId);
  if (!product)
    return (
      <div className="max-w-[400px] md:max-w-[600px]  mt-2 md:mt-0 relative">
        <Skeleton className="md:w-[500px] w-[300px] h-[500px]" />
      </div>
    );
  return (
    <div className="max-w-[400px] md:max-w-[600px]  mt-2 md:mt-0 relative">
      <Carousal
        images={product.images}
        autoPlay
        showThumbs={true}
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
        showIndicators
        swipeable
      />
    </div>
  );
};

export default ProductImageCarosel;
