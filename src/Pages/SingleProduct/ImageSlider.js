import React, { useContext, useState } from "react";
import { ProductContext } from "./SingleProduct";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const ImageSlider = () => {
  const state = useContext(ProductContext);
  const product = state.product;
  const gallery = product.gallery;
  const [current, setCurrent] = useState(0);
  const length = gallery.length;

  // going to next image
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  // going to previous image
  const previousSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="relative flex items-center justify-center">
      <FaArrowAltCircleLeft
        className="absolute top-1/2 left-5 text-black text-3xl z-10 cursor-pointer select-none"
        onClick={previousSlide}
      />
      <FaArrowAltCircleRight
        className="absolute top-1/2 right-5 text-black text-3xl z-10 cursor-pointer select-none"
        onClick={nextSlide}
      />
      {gallery.map((image, index) => {
        return (
          <div key={index}>
            {index === current && (
              <img
                src={image.url}
                alt="sliderImg"
                className="w-full max-w-lg h-full rounded-lg"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageSlider;
