import React, { useContext, useState } from "react";
import { ProductContext } from "./SingleProduct";

const ProductProperty = ({ dispatch }) => {
  const state = useContext(ProductContext);
  const [displayName, setDisplayName] = useState("");
  const product = state.product;
  const sku = state.sku;
  const props = sku.props;
  const skus = product.variation.skus;
  console.log("Initial sku", sku);
  console.log("Initial props", props);
  //   console.log(skus);
  const setSku = (id) => {
    console.log(id);
    dispatch({ type: "SET_SKU", payload: product, sku: skus[1] });
  };
  return (
    <div>
      <h2>Product ID: {product.id}</h2>
      <h2>Number of variations: {product.variation.props.length}</h2>
      <div className="bg-base-200 rounded-xl p-5">
        {product.variation.props.map((type) => (
          <div key={type.id} className="my-2">
            <h2 className="font-semibold text-lg">
              {type.name} : {displayName}
            </h2>
            <div className="flex flex-wrap items-center gap-5">
              {type.values.map((value) => (
                <div key={value.id}>
                  {value.color ? (
                    <div
                      onClick={() => setSku(value.id)}
                      className={` ${
                        props.indexOf(value.id) !== -1 &&
                        "border-2 border-black"
                      }  hover:cursor-pointer p-3 bg-white rounded-lg`}
                    >
                      <img src={value.thumb} alt={value.title} />
                    </div>
                  ) : (
                    <div
                      onClick={() => setSku(value.id)}
                      className={` ${
                        props.indexOf(value.id) !== -1 &&
                        "border-2 border-black"
                      } bg-white hover:cursor-pointer px-6 py-2 rounded-lg`}
                    >
                      <h2>{value.title}</h2>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* <div className="my-2">
          <h2 className="font-semibold text-lg">Color :</h2>
          <div className="flex flex-col lg:flex-row items-center justify-around">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductProperty;
