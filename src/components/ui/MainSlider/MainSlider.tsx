"use client";

import React from "react";
import img1 from "../../../../public/images/slide-1.jpg";
import img2 from "../../../../public/images/slider-2.jpg";
import img3 from "../../../../public/images/grocery-banner.png";
import img4 from "../../../../public/images/grocery-banner-2.jpg";
import img5 from "../../../../public/images/grocery-banner.png";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import MainSwiper from "@/app/_components/MainSwiper/MainSwiper";

export default function MainSlider() {
  return (
    <div className="w-[80%] mx-auto p-4 my-4 flex gap-4">
      <MainSwiper />
      <div className="w-1/4 flex flex-col gap-4">
        <Image
          src={img2}
          alt="banner 1"
          className="w-full h-[190px] object-cover rounded-lg"
        />
        <Image
          src={img3}
          alt="banner 2"
          className="w-full h-[190px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
