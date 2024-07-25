import React from "react";

export default function Category({ category }) {
  return (
    <>
      <div className="p-2">
        <div className=" h-80 border border-gray-300 rounded-lg hover:shadow-md hover:shadow-green-700 transition duration-300">
          <div className=" h-3/4">
            <img
              src={category?.image}
              alt=""
              className="w-full h-full rounded-lg"
            />
          </div>
          <h1 className="flex justify-center items-center font-bold text-xl text-green-600 h-1/4">
            {category?.name}
          </h1>
        </div>
      </div>
    </>
  );
}
