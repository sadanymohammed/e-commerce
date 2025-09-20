'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { CategtoyType } from "@/types/categoty.type";
export default function CategorySwiper({data}: {data: CategtoyType[]}) {
  
  return (
     <div className="w-[80%] mx-auto">
      <h1 className="text-1xl font-light mb-4">Shop Popular Categories</h1>

      <Swiper
          spaceBetween={0}
          slidesPerView={7}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {data.map((category : CategtoyType) => (  <SwiperSlide key={category._id}>
              <Image
              width={200}
                height={200}
                src={category.image}
                alt={category.name}
            className="w-full object-cover h-[150px] "
              />
              <p className="text-center font-bold"> {category.name} </p>
            </SwiperSlide>
          ))}
        </Swiper>  
     </div>
  );
}
