import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import TrackButton from "@/components/TrackButton/TrackButton";
import ProductImageCarosel from "@/components/ProductPageComponents/ProductImageCarosel";
import ProductInfo from "@/components/ProductPageComponents/ProductInfo";
import ProductBuyNow from "@/components/ProductPageComponents/ProductBuyNow";

type props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: props) => {
  const session = await getServerSession(authOptions);
  return (
    <section className="p-10 min-h-full flex flex-col md:flex-row justify-center items-center">
      <ProductImageCarosel productId={id} />
      <div className="max-w-full md:max-w-[650px] flex-1 md:p-4 mt-2 md:mt-0 relative">
        <ProductInfo productId={id} />
        <div className="mt-6 w-full flex  flex-col">
          <TrackButton productId={id} session={session} />
          <ProductBuyNow productId={id} />
        </div>
      </div>
    </section>
  );
};

export default page;
