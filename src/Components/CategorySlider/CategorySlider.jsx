import React, { useEffect, useState } from 'react'
import Style from './CategorySlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';


export default function CategorySlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,

  };

const [Categorys, setCategorys] = useState(null);

    async function AllCategorys() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategorys(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
    
    useEffect(()=>{
      AllCategorys()
    },[])

  return<>
   <h2 className='font-light text-2xl'>Shop Popular Categories</h2>

      <Slider className='mt-5 mb-7' {...settings}>
        {Categorys?.map((category) => (
          <div className='flex flex-col items-center' key={category._id}>
            <img src={category.image} className= "p-[0.1rem] rounded-xl w-[100px] h-[100px] md:w-[150px] md:h-[150px] " alt={category.name}/>
<h1 className='text-center mt-2 text-xs sm:text-sm md:text-base truncate sm:whitespace-normal break-words'>
  {category.name}
</h1>
          </div>
        ))}
      </Slider>


    </>
  
}
