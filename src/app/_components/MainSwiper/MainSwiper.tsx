'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import img1 from "../../../../public/images/slide-1.jpg";
import img4 from "../../../../public/images/grocery-banner-2.jpg";
import img5 from "../../../../public/images/grocery-banner.png";


export default function MainSwiper(){


  return <>
  
  {/* Left Slider */}
      <div className="w-3/4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          className="rounded-lg overflow-hidden"
        >
          <SwiperSlide>
            <Image
              src={img1}
              alt="slide 1"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img4}
              alt="slide 4"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img5}
              alt="slide 5"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
  </>
}
