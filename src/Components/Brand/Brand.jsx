
import React from 'react'
import Swal from 'sweetalert2';

function sweetAlet(brand){
    Swal.fire({
        title: `${brand.name}`,
        text: `${brand.name}`,
        imageUrl: `${brand.image}`,
        imageWidth: 400,
        imageHeight: 200,
      });
}

export default function Brand({brand}) {
  return (
    <>
      <div className="p-3">
        <div onClick={()=>{
            sweetAlet(brand)
        }} className="p-3 border border-gray-300 rounded-lg hover:shadow-md hover:shadow-green-700 transition duration-300">
        <img src={brand?.image} alt="" className='w-full' />
        <h1 className='text-center font-bold text-xl'>{brand?.name}</h1>
        </div>
      </div>
    </>
  )
}


