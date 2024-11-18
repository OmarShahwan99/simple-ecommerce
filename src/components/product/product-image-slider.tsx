"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import CustomImage from "../ui/custom-image";

const ProductImageSlider = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper !pb-8"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <CustomImage
            src={img}
            alt="Product"
            width={320}
            height={320}
            className="rounded-xl"
            priority
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductImageSlider;
