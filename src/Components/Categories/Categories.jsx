import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Category from '../Category/Category'
import Loading from '../Loading/Loading';
import axios from 'axios';


export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoding] = useState(true);

  async function getAllCategories() {
   try{
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    console.log(data);
    setCategories(data.data);
    setIsLoding(false);
   } catch(err){
    setIsLoding(true);
   }
  }

  async function getSubCategories(categoryId) {
    try{
     let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories/' + data._id);
     console.log(data);
     setCategories(data.data);
     setIsLoding(false);
    } catch(err){
     setIsLoding(true);
    }
   }

  useEffect(() => {
    getAllCategories();

  }, [])

  return (
    <>
      <Helmet>
        <title>FreshCart - catigories</title>
      </Helmet>
      <div className=' py-10'>
        <div className=" px-16">
          {
            isLoading ? <Loading/> : <div className="grid grid-cols-3 gap-4 px-6">
              {categories.map((category, index) => (
                <Category category={category} key={index} />
              ))}
            </div>
          }
        </div>
      </div>    
    </>
  )
}
