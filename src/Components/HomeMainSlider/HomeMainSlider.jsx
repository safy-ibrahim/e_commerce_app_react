import Slider from "react-slick";
import React, { useRef } from "react";
import mainSlider1 from "../../assets/images/41nN4nvKaAL._AC_SY200_.jpg";
import mainSlider2 from "../../assets/images/slider2_.jpg";
import mainSlider3 from "../../assets/images/slider_.jpg";
import slide1 from "../../assets/images/bagslider.jpg";
import slide2 from "../../assets/images/gitarslider.jpg";

export default function HomeMainSlider() {
  const sliderRef = useRef(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className="hidden lg:flex lg:justify-center lg:gap-4 lg:px-16 lg:my-6">
        <div className="w-1/4">
          <div>
            <Slider {...settings}>
              <img src={mainSlider1} alt="" />
              <img src={mainSlider2} alt="" />
              <img src={mainSlider3} alt="" />
            </Slider>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="btn-next"
            ></button>
          </div>
        </div>
        <div className="w-1/4">
          <img src={slide1} alt="" className="w-full h-[250px] " />
          <img src={slide2} alt="" className="w-full h-[250px]" />
        </div>
      </div>
    </>
  );
}


