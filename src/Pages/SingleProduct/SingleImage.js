import React from "react";

const SingleImage = ({ imageObject, index }) => {
  return (
    <div id={`slide${index}`} className="carousel-item relative w-full">
      <img src={imageObject.url} className="w-full" alt="shoes-img" />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a
          href={`#slide${index - 1}`}
          className="btn btn-xs md:btn-sm btn-circle glass"
        >
          ❮
        </a>
        <a
          href={`#slide${index + 1}`}
          className="btn btn-xs md:btn-sm btn-circle glass"
        >
          ❯
        </a>
      </div>
    </div>
  );
};

export default SingleImage;
