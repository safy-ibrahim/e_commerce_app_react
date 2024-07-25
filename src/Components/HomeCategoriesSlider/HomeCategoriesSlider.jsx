import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function HomeCategoriesSlider() {
  const [homeCategories, setHomeCategories] = useState([]);

  async function getHomeCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setHomeCategories(data.data);
  }

  useEffect(() => {
    getHomeCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 my-6">
      <Slider {...settings}>
        {homeCategories.map((category, i) => (
          <div key={i} className="p-2">
            <img
              className="w-full h-40 sm:h-56 object-cover"
              src={category.image}
              alt={category.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
