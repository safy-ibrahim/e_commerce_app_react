import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Products() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading, isFetching } = useQuery("products", getProducts);

  return (
    <>
      <Helmet>
        <title>FreshCart - products</title>
      </Helmet>
      <div className="py-10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-16">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.data?.data.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
