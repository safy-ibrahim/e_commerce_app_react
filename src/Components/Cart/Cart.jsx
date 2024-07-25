import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { cartCountContext } from "../../Context/CartCountContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [cartData, setCartData] = useState(undefined);
  const [isLoading, setIsLoding] = useState(true);
  const { setCartCount } = useContext(cartCountContext);

  async function getLoggedUseCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartData(data);
      setCartCount(data.numOfCartItems);
    } catch (err) {
      console.error(
        "Error fetching cart data:",
        err.response ? err.response.data : err.message
      );
      setCartData(undefined);
      setCartCount(0);
    } finally {
      setIsLoding(false);
    }
  }

  async function removeCartItem(productId) {
    setIsLoding(true);
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartData(data);
      setCartCount(data.numOfCartItems);
    } catch (err) {
      console.error(
        "Error removing cart item:",
        err.response ? err.response.data : err.message
      );
    } finally {
      setIsLoding(false);
    }
  }

  async function clearCartItems() {
    setIsLoding(true);
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart/",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartData(undefined);
      setCartCount(0);
    } catch (err) {
      console.error(
        "Error clearing cart:",
        err.response ? err.response.data : err.message
      );
    } finally {
      setIsLoding(false);
    }
  }

  async function updateProductCount(productId, productCount) {
    if (productCount === 0) {
      removeCartItem(productId);
    } else {
      try {
        setIsLoding(true);
        const { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count: productCount },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setCartData(data);
      } catch (err) {
        console.error(
          "Error updating product count:",
          err.response ? err.response.data : err.message
        );
      } finally {
        setIsLoding(false);
      }
    }
  }

  useEffect(() => {
    getLoggedUseCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>FreshCart - cart</title>
      </Helmet>

      <div className="p-16">
        <div className="p-16 bg-gray-100 space-y-6">
          {!isLoading &&
          cartData &&
          cartData.data &&
          cartData.data.products &&
          cartData.data.products.length > 0 ? (
            <>
              <div className="flex justify-between">
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold">Cart Shop</h3>
                  <p className="text-lg font-semibold">
                    Total price: {cartData?.data.totalCartPrice} EGP
                  </p>
                </div>
                <div className="space-y-6">
                  <Link
                    to={`/address/${cartData?.data._id}`}
                    className="block rounded py-3 px-8 text-white text-lg bg-green-600"
                  >
                    Check out
                  </Link>
                  <p className="text-lg font-semibold">
                    Total number of items:{" "}
                    <span className="text-green-500">
                      {cartData?.data?.products?.length}
                    </span>
                  </p>
                </div>
              </div>
              {cartData.data.products.map((product, i) => (
                <div
                  className="flex flex-col lg:flex-row lg:items-center shadow mb-2 hover:bg-white hover:shadow-lg"
                  key={i}
                >
                  <img
                    src={product.product.imageCover}
                    className="w-52 h-46"
                    alt={product.product.title}
                  />
                  <div className="flex justify-between w-full">
                    <div className="ms-6">
                      <h1 className="font-semibold text-lg text-gray-950">
                        {product?.product.title}
                      </h1>
                      <div>
                        <p className="font-semibold text-gray-700 my-2">
                          {product.price} EGP
                        </p>
                        <p>
                          {product?.product.ratingsAverage}{" "}
                          <i className="fas fa-star text-yellow-400"></i>
                        </p>
                        <button
                          onClick={() => removeCartItem(product.product._id)}
                          className="mt-2 text-red-700"
                        >
                          <i className="fa fa-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <button
                          onClick={() =>
                            updateProductCount(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          className="mx-2 px-3 py-2 border rounded border-green-500"
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading..." : "-"}
                        </button>
                        <span>{product.count}</span>
                        <button
                          onClick={() =>
                            updateProductCount(
                              product.product._id,
                              product.count + 1
                            )
                          }
                          className="mx-2 px-3 py-2 border rounded border-green-500"
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading..." : "+"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            !isLoading &&
            !cartData && (
              <h1 className="flex justify-center items-start font-semibold text-lg">
                No products in your cart yet
              </h1>
            )
          )}

          {isLoading && <Loading />}
          {cartData?.data?.products?.length > 0 && (
            <div className="mt-5">
              <button
                onClick={clearCartItems}
                className="block m-auto px-5 py-3 border rounded border-green-500 text-lg"
              >
                Clear Your Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
