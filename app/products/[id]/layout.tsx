import ProductAbout from "@/components/ProductPageComponents/ProductAbout";
import SimilarProducts from "@/components/ProductPageComponents/SimilarProducts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Individual product",
  description: "Individual product",
};

export default function PageIdLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
  // console.log(id);

  return (
    <main className="flex flex-col">
      {children}
      <ProductAbout productId={id} />
      <SimilarProducts productId={id} />
    </main>
  );
}
