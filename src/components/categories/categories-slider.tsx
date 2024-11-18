"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import React from "react";
import { FreeMode } from "swiper/modules";
import { CategoryModel } from "@/types/product";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const CategoriesSlider = ({ categories }: { categories: CategoryModel[] }) => {
  const searchParams = useSearchParams();

  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const selectedCatId = params.get("category");

  const handleSelect = (catId: string) => {
    if (catId) {
      params.set("category", catId);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Swiper
      slidesPerView={7}
      spaceBetween={10}
      freeMode={true}
      modules={[FreeMode]}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 20,
        },
      }}
      className="mySwiper !pb-5 !pt-2"
    >
      <SwiperSlide>
        <Button
          className={cn(
            "text-xl",
            (selectedCatId === "all" || !selectedCatId) && "bg-secondary"
          )}
          variant="ghost"
          onClick={() => handleSelect("all")}
        >
          جميع المنتجات
        </Button>
      </SwiperSlide>
      {categories.map((cat) => (
        <SwiperSlide key={cat.id}>
          <Button
            onClick={() => handleSelect(cat.id.toString())}
            className={cn(
              "text-xl",
              selectedCatId === cat.id.toString() && "bg-secondary"
            )}
            variant="ghost"
          >
            {cat.name}
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesSlider;
