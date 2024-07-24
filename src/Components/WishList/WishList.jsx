
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading'; 

export default function Wishlist() {
  const [wishList, setWishList] = useState([])
  const [isLoading, setIsLoding] = useState(false)
  const [addCartIsLoading, setAddCartIsLoading] = useState(false)

  async function getLoggedUserWish() {
    setIsLoding(true)
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      );
      console.log(data);
      setWishList(data)
      setIsLoding(false)
    } catch (err) {
      setIsLoding(false)
    }

  }
  //  --------------------- function remove item
  async function removeWishItem(productId) {
    setIsLoding(true)
    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + productId, {
      headers: {
        token: localStorage.getItem('token')
      }
    });
    setWishList(data)
    setIsLoding(false)
  }
  
  async function addProductToCart() {
    setAddCartIsLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: wishList.data._id },
        {
            headers: {
                token: localStorage.getItem('token')
            }
        }
    );

    setAddCartIsLoading(false)
    console.log(data);
    if (data.numOfCartItems > cartCount) {
        setCartCount(data.numOfCartItems)
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

  useEffect(() => {
    getLoggedUserWish();
  }, [])

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <div className="p-16">
      <div className="p-16 bg-gray-100 space-y-6">
        <>
          <div className="">
            <div className='space-y-6'>
              <h3 className='text-3xl font-semibold'>My Wish List</h3>
            </div>
          </div>
          {wishList?.data?.map((product, i) => (
            <div className="flex flex-col lg:flex-row lg:items-center shadow mb-2 hover:bg-white hover:shadow-lg" key={i}>
              <img src={product?.imageCover} className="w-52 h-46" alt={product?.title} />
              <div className="flex justify-between w-full">
                <div className="ms-6">
                  <h1 className="font-semibold text-lg text-gray-950">{product?.title}</h1>
                  <div className="">
                    <p className='font-semibold text-gray-700 my-2'>{product?.price} EGP</p>
                    <p>{product?.ratingsAverage} <i className="fas fa-star text-yellow-400"></i></p>
                    <button onClick={() => { removeWishItem(product._id) }} className='mt-2 text-red-700'>
                      <i className='fa fa-trash'></i> remove
                    </button>
                  </div>
                </div>
                <div>
                  <button onClick={() => {
                    addProductToCart(product?._id)
                  }} 
                    className='block me-3 px-5 py-3 border rounded border-green-500 text-lg'
                  >
                    Add to cart
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
