import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Category from "../Category/Category";
import Loading from "../Loading/Loading";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoding] = useState(true);

  async function getAllCategories() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
      setIsLoding(false);
    } catch (err) {
      setIsLoding(true);
    }
  }

  async function getSubCategories(categoryId) {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories/" + data._id
      );
      setCategories(data.data);
      setIsLoding(false);
    } catch (err) {
      setIsLoding(true);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>FreshCart - catigories</title>
      </Helmet>

      <div className="py-10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-16">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
              {categories.map((category, index) => (
                <Category category={category} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
