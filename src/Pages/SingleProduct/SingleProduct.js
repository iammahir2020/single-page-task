import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProductProperty from "./ProductProperty";
import ImageSlider from "./ImageSlider";

export const ProductContext = createContext({});

const initialState = {
  loading: true,
  error: "",
  product: {},
  sku: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: "",
        product: action.payload,
        sku: action.payload.variation.skus[0],
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: action.payload.message,
        product: {},
        sku: {},
      };
    case "SET_SKU":
      return {
        loading: false,
        error: "",
        product: action.payload,
        sku: action.sku,
      };
    default:
      return state;
  }
};

const SingleProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(
        "https://moveon-api-server.sbox.ali2bd.net/api/v1/customer/dummy-product"
      )
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR", payload: error });
      });
  }, []);

  // loading screen while data is being fetched
  if (state.loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // error screen to display if any error while fetching the data
  if (state.error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2>{state.error}</h2>
      </div>
    );
  }

  return (
    <ProductContext.Provider value={state}>
      <div className="my-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            {/* displaying the default image gallery  */}
            <ImageSlider></ImageSlider>
          </div>
          <div>
            <div className="card w-full bg-base-100">
              {/* section fo the information regarding the product  */}
              <div className="pt-5 lg:pt-0 lg:pl-5">
                <h2 className=" text-xl lg:text-2xl font-semibold">
                  {state.product.title}
                </h2>
                <div className="flex gap-5 mt-5">
                  {/* displaying the rating using the react-rating package  */}
                  <Rating
                    initialRating={state.product.ratings_average}
                    emptySymbol={<FontAwesomeIcon icon={faStar} />}
                    fullSymbol={
                      <FontAwesomeIcon
                        style={{ color: "goldenrod" }}
                        icon={faStar}
                      />
                    }
                    readonly
                  ></Rating>
                  <span className="font-semibold">
                    {state.product.ratings_average}/5.0
                  </span>
                  <span className="text-gray-500">
                    {state.product.ratings_count} Votes
                  </span>
                </div>
                <div className="flex gap-5 items-center mt-5">
                  <span className="text-xl lg:text-3xl font-semibold">
                    Rs.{state.sku.price.discounted}
                  </span>
                  <span className="lg:text-xl text-gray-500 line-through">
                    Rs.{state.sku.price.old}
                  </span>
                  <span className="text-red-500 lg:text-xl">
                    {/* calculating discount percentage based on new and old price  */}
                    (
                    {100 -
                      Math.ceil(
                        (state.sku.price.discounted / state.sku.price.old) * 100
                      )}
                    % OFF)
                  </span>
                </div>
                <ProductProperty dispatch={dispatch}></ProductProperty>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductContext.Provider>
  );
};

export default SingleProduct;
