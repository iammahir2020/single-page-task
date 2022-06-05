import React, { useContext, useState } from "react";
import { ProductContext } from "./SingleProduct";

const ProductProperty = ({ dispatch }) => {
  const state = useContext(ProductContext);
  const product = state.product;
  const sku = state.sku;
  const [props, setProps] = useState(sku.props);
  const [displayName, setDisplayName] = useState("");
  // const props = sku.props;
  const skus = product.variation.skus;
  console.log("Initial sku", sku);
  console.log("Initial props", props);
  console.log("skus", skus);
  const handleSetNewSku = (id) => {
    props.map((prop, index) => {
      if (prop.toString().length === id.toString().length) {
        props[index] = id;
      }
      return setProps(props);
    });
    console.log("New props", props);
    console.log("id", id);
    const newSku = skus.find(
      (sku) => JSON.stringify(sku.props) === JSON.stringify(props)
    );
    console.log("newSku", newSku);
    dispatch({ type: "SET_SKU", payload: product, sku: newSku });
  };
  return (
    <div>
      {/* <h2>Product ID: {product.id}</h2> */}
      {/* <h2>Number of variations: {product.variation.props.length}</h2> */}
      <div className="bg-base-100 rounded-xl p-5">
        {product.variation.props.map((type) => (
          <div key={type.id} className="my-2">
            {/* {type.name} */}
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
                      {/* <p
                        className={`text-center ${
                          props.indexOf(value.id) !== -1
                            ? " font-semibold"
                            : "text-gray-500"
                        }`}
                      >
                        {value.title}
                      </p> */}
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
