import React from "react";
import Star from "./Star";
const Rating = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star key={index} selected={index < Math.round(value)} />
      ))}
    </div>
  );
};

export default Rating;
