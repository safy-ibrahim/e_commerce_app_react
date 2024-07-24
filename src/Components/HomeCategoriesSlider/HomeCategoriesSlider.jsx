
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'


export default function HomeCategoriesSlider() {

    const [homeCategories, setHomeCategories] = useState([])

    async function getHomeCategories() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        console.log(data.data);
        setHomeCategories(data.data);
    }

    useEffect(() => {
        getHomeCategories();

    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className="px-16 my-6">
                <Slider {...settings}>
                    {homeCategories.map((category, i) => <div key={i}>
                        <img className='w-full h-56' src={category.image} alt={category.name} />
                    </div>)}
                </Slider>
            </div>
        </>
    )
}
