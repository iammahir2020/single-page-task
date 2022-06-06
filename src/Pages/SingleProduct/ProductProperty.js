import React, { useContext, useState } from "react";
import { ProductContext } from "./SingleProduct";

const ProductProperty = ({ dispatch }) => {
  const state = useContext(ProductContext);
  const product = state.product;
  const sku = state.sku;
  const [props, setProps] = useState(sku.props);
  const skus = product.variation.skus;
  const handleSetNewSku = (id) => {
    props.map((prop, index) => {
      if (prop.toString().length === id.toString().length) {
        props[index] = id;
      }
      return setProps(props);
    });
    const newSku = skus.find(
      (sku) => JSON.stringify(sku.props) === JSON.stringify(props)
    );
    dispatch({ type: "SET_SKU", payload: product, sku: newSku });
  };
  return (
    <div>
      <div className="bg-base-100 rounded-xl p-5">
        {product.variation.props.map((type) => (
          <div key={type.id} className="my-2">
            {type.values.map(
              (value) =>
                props.indexOf(value.id) !== -1 && (
                  <h2 key={value.id} className="text-lg">
                    {type.name} :{" "}
                    <span className="font-semibold">{value.title}</span>
                  </h2>
                )
            )}
            <div className="flex flex-wrap items-center gap-3">
              {type.values.map((value) => (
                <div key={value.id}>
                  {value.color ? (
                    <div
                      onClick={() => handleSetNewSku(value.id)}
                      className={` border-2 ${
                        props.indexOf(value.id) !== -1 &&
                        " border-cyan-600 shadow-xl"
                      }  hover:cursor-pointer p-5 bg-white rounded-full  overflow-hidden`}
                    >
                      <img
                        className={`text-center ${
                          props.indexOf(value.id) !== -1 && "scale-125"
                        } scale-100`}
                        src={value.thumb}
                        alt={value.title}
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => handleSetNewSku(value.id)}
                      className={` border-2 ${
                        props.indexOf(value.id) !== -1 &&
                        " border-cyan-600 text-black font-semibold shadow-xl"
                      } bg-white hover:cursor-pointer w-[50px] h-[50px] flex justify-center items-center rounded-full  text-gray-500`}
                    >
                      <h2>{value.title}</h2>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductProperty;
