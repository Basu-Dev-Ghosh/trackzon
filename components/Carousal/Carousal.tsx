"use client";
import { CSSProperties } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { CarouselProps, Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { Minus } from "lucide-react";

interface props extends Partial<CarouselProps> {
  images: string[];
}

const indicatorStyles: CSSProperties = {
  background: "#000",
  width: 8,
  height: 8,
  display: "inline-block",
  margin: "0 8px",
};

const Carousal = ({ images, ...rest }: props) => {
  return (
    <Carousel
      {...rest}
      showThumbs={false}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return <Minus className="w-8 h-8 text-blue-800 inline-block" />;
        }
        return (
          <Minus
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
            className=" w-8 h-8 text-black inline-block"
          />
        );
      }}
    >
      {images?.map((data, i) => {
        return (
          <div key={i} className="bg-white ">
            <Image
              unoptimized
              src={data}
              alt={`image-${i}`}
              width={100}
              height={100}
              object-fit="cover"
              className="mix-blend-multiply"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default Carousal;
