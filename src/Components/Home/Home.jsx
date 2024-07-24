
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import Product from './../Product/Product';
import HomeCategoriesSlider from '../HomeCategoriesSlider/HomeCategoriesSlider';
import HomeMainSlider from '../HomeMainSlider/HomeMainSlider';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';


export default function Home() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoding] = useState(true);

  async function getAllproducts() {
    setIsLoding(true);
   try{
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    setProducts(data.data);
    setIsLoding(false);
   } catch(err){
    setIsLoding(true);
   }
  }

  useEffect(() => {
    getAllproducts();

  }, [])

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <>
      <Helmet>
        <title>FreshCart - home</title>
      </Helmet>
      <div className=' py-10'>
        <HomeMainSlider />
        <HomeCategoriesSlider />
        <div className=" px-16">
          {
            isLoading ? <Loading /> : <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
              {products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </div>
          }
        </div>
      </div>
    </>
  )
}

