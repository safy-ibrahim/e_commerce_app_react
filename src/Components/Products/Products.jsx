import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import Product from '../Product/Product';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Products() {

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let {data, isLoading, isFetching} = useQuery('products', getProducts);

  return (
    <>
      <Helmet>
        <title>FreshCart - products</title>
      </Helmet>
      <div className=' py-10'>
        <div className=" px-16">
          {isLoading ? <Loading /> : <div className="grid grid-cols-4 gap-4">
            {data?.data?.data.map((product, index) => {
              return <Product product={product} key={index} />
            })}
          </div>
          }
        </div>
      </div>
    </>
  )
}
