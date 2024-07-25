import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Brand from "../Brand/Brand";
import Loading from "../Loading/Loading";
import axios from "axios";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoding] = useState(true);

  async function getAllBrands() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
      setIsLoding(false);
    } catch (err) {
      setIsLoding(true);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>FreshCart - brands</title>
      </Helmet>
 
      <div className="py-10">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {brands.map((brand, index) => (
                <Brand brand={brand} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
