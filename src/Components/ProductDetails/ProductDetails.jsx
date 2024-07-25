import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { cartCountContext } from "../../Context/CartCountContext";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoding] = useState(true);
  const [addCartIsLoading, setAddCartIsLoading] = useState(false);
  const { id } = useParams();
  const { cartCount, setCartCount } = useContext(cartCountContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductDetails(productId) {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + productId
    );
    setProductDetails(data.data);
    setIsLoding(false);
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  async function addProductToCart() {
    setAddCartIsLoading(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: productDetails._id },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    setAddCartIsLoading(false);
    if (data.numOfCartItems > cartCount) {
      setCartCount(data.numOfCartItems);
    }

    toast.success(data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  return (
    <>
      <div className="p-16  flex flex-col lg:flex-row  lg:items-center justify-center lg:justify-between">
        <div className=" lg:w-1/4 mb-8 lg:mb-0 ">
          <div className="">
            <Slider {...settings}>
              {productDetails?.images.map((src, i) => (
                <img
                  src={src}
                  alt={productDetails?.title}
                  key={i}
                  className="w-full"
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className=" lg:w-3/4 lg:px-6  ">
          <div>
            <div className="">
              <h1 className="font-bold text-lg text-gray-950">
                {productDetails?.title}
              </h1>
              <p className="text-gray-800 my-4">
                {productDetails?.description}
              </p>
            </div>
            <div className="flex justify-between">
              <h6 className="font-bold">{productDetails?.price} EGP</h6>
              <h6>
                <i className="fas fa-star text-yellow-400"></i>{" "}
                {productDetails?.ratingsAvirage}{" "}
              </h6>
            </div>
            <div className="flex justify-center mt-8">
              <button
                disabled={addCartIsLoading}
                onClick={addProductToCart}
                className="mt-3 border-0 w-2/4 rounded text-center bg-customColor1 text-white p-2"
              >
                {addCartIsLoading ? (
                  <i className="fas fa-spinner"></i>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
