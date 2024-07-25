import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Wishlist() {
  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addCartIsLoading, setAddCartIsLoading] = useState({});

  async function getLoggedUserWish() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setWishList(data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  //  --------------------- function remove item
  async function removeWishItem(productId) {
    setIsLoading(true);
    try {
      await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      await getLoggedUserWish();
    } catch (err) {
      setIsLoading(false);
    }
  }

  //  --------------------- function add to cart
  async function addProductToCart(productId) {
    setAddCartIsLoading((prevLoading) => ({
      ...prevLoading,
      [productId]: true,
    }));
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      await getLoggedUserWish();
      setAddCartIsLoading((prevLoading) => ({
        ...prevLoading,
        [productId]: false,
      }));
      // Handle cart update logic here if needed
    } catch (err) {
      setAddCartIsLoading((prevLoading) => ({
        ...prevLoading,
        [productId]: false,
      }));
    }
  }

  useEffect(() => {
    getLoggedUserWish();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-16">
      <div className="p-16 bg-gray-100 space-y-6">
        <>
          <div className="">
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold">My Wish List</h3>
            </div>
          </div>
          {wishList.map((product, i) => (
            <div
              className="flex flex-col lg:flex-row lg:items-center shadow mb-2 hover:bg-white hover:shadow-lg"
              key={i}
            >
              <img
                src={product?.imageCover}
                className="w-52 h-46"
                alt={product?.title}
              />

              <div className="flex flex-col sm:flex-row justify-between w-full">
                <div className="ms-6 flex-1">
                  <h1 className="font-semibold text-lg text-gray-950">
                    {product?.title}
                  </h1>
                  <div className="">
                    <p className="font-semibold text-gray-700 my-2">
                      {product?.price} EGP
                    </p>
                    <p>
                      {product?.ratingsAverage}{" "}
                      <i className="fas fa-star text-yellow-400"></i>
                    </p>
                    <button
                      onClick={() => {
                        removeWishItem(product._id);
                      }}
                      className="mt-2 text-red-700"
                    >
                      <i className="fa fa-trash"></i> remove
                    </button>
                  </div>
                </div>
                <div className="mt-4 me-2 sm:mt-0 flex justify-center sm:justify-start items-center w-full sm:w-auto">
                  <button
                    onClick={() => {
                      addProductToCart(product._id);
                    }}
                    className="px-5 py-3 border rounded border-green-500 text-lg w-3/4 sm:w-auto "
                    disabled={addCartIsLoading[product._id]}
                  >
                    {addCartIsLoading[product._id]
                      ? "Adding..."
                      : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
