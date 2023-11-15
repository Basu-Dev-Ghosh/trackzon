import Carousal from "@/components/Carousal/Carousal";
import ProductCard from "@/components/ProductCard/ProductCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { getAllProducts } from "@/lib";
import Image from "next/image";

const heroImages = [
  "/assets/hero-1.svg",
  "/assets/hero-2.svg",
  "/assets/hero-3.svg",
  "/assets/hero-4.svg",
  "/assets/hero-5.svg",
];

export default async function Home() {
  const allPrdocuts = await getAllProducts();
  return (
    <main className="flex flex-col">
      <section className="p-10 min-h-full flex flex-col md:flex-row justify-center items-center">
        <div className="flex flex-col max-w-3xl ">
          <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-6xl lg:text-6xl dark:text-white">
            Unleash the Power of TRACKZON
          </h1>
          <p className="mb-6 text-lg font-normal break-words text-gray-500 lg:text-xl  dark:text-gray-400 w-full md:w-[80%]">
            Powerfull self-serve product and growth analytics to help you
            convert, engage and retain more
          </p>

          <SearchBar />
        </div>
        <div className="max-w-[300px] md:max-w-[440px] flex-1 p-10 mt-2 md:mt-0 relative">
          <Carousal
            images={heroImages}
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={2000}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            swipeable
          />
          <Image
            src="/assets/hand-drawn-arrow.svg"
            alt="arrow"
            width={225}
            height={225}
            className="max-xl:hidden absolute -left-[35%] -bottom-[10%] z-0"
          />
        </div>
      </section>
      <section className="p-10 min-h-full flex flex-col  items-center">
        <div className="flex flex-col max-w-3xl self-start md:self-auto">
          <h5 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
            Recent Searches
          </h5>
        </div>
        <div className="md:px-14  mt-2 md:mt-0 flex flex-row flex-wrap items-center justify-center">
          {allPrdocuts &&
            allPrdocuts.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
        </div>
      </section>
    </main>
  );
}
