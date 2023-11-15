import React from "react";

const PriceInfo = ({
  currency,
  averagePrice,
  originalPrice,
  lowestPrice,
  highestPrice,
}: {
  currency: string;
  averagePrice: number;
  originalPrice: number;
  lowestPrice: number;
  highestPrice: number;
}) => {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
      <div className="border bg-blue-300 w-32 h-20 rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
        <p className="text-xs text-gray-900">Average Price</p>
        <p className="text-lg mb-2 text-black font-bold">
          {currency + averagePrice}
        </p>
      </div>
      <div className="border bg-blue-300 w-32 h-20 rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
        <p className="text-xs text-gray-900">Original Price</p>
        <p className="text-lg mb-2 text-black font-bold">
          {currency + originalPrice}
        </p>
      </div>
      <div className="border bg-blue-300 w-32 h-20 rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
        <p className="text-xs text-gray-900">Lowest Price</p>
        <p className="text-lg mb-2 text-black font-bold">
          {currency + lowestPrice}
        </p>
      </div>
      <div className="border bg-blue-300 w-32 h-20 rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
        <p className="text-xs text-gray-900">Highest Price</p>
        <p className="text-lg mb-2 text-black font-bold">
          {currency + highestPrice}
        </p>
      </div>
    </div>
  );
};

export default PriceInfo;
