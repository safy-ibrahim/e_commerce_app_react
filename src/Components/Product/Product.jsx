
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartCountContext } from '../../Context/CartCountContext';


export default function Product({ product }) {

  const [isLoading, setIsLoading] = useState(false)
  const { cartCount, setCartCount } = useContext(cartCountContext)
  const [isWishlist, setIsWishlist] = useState(false);

  async function addProductToCart() {
    setIsLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: product._id },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      }
    );

    setIsLoading(false)
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

 
  async function addToWishlist() {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId: product._id },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      );
      setIsWishlist(true); // تعيين حالة الرغبة لتكون صحيحة بعد إضافة المنتج
      setIsLoading(false);
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setIsLoading(false);
    }
  }


  return (
    <>
      <div className="p-3 hover:shadow-md hover:border hover:rounded-lg hover:shadow-green-700 transition duration-300">
        <Link to={'/productDetails/' + product._id}>
          <img src={product.imageCover} alt={product.title} className="w-full" />
          <h5 className=" text-green-600">{product.category.name}</h5>
          <h4 className="font-bold my-2">{product.title.split(' ').splice(0, 2).join(' ')}</h4>
          <div className="flex justify-between">
            <h6 className=''>{product.price} EGP</h6>
            <h6><i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage} </h6>
          </div>
        </Link>
        <p className='text-center'>
          <i
            className={`fas fa-heart text-lg cursor-pointer ${isWishlist ? 'text-red-600' : 'text-gray-400'}`}
            onClick={addToWishlist}
          ></i>
        </p>
        <button disabled={isLoading}  onClick={addProductToCart} className="mt-3 w-full text-center rounded bg-green-400 text-white p-2 hover:bg-green-600">
          {isLoading ? <i className='fas fa-spinner'></i> : 'Add to cart'}
        </button>
      </div>
    </>
  )
}
