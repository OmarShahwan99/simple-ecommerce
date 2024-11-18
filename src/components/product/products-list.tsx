"use client";
import { ProductModel } from "@/types/product";
import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProducts } from "@/services/product";

const ProductsList = ({
  initialProducts,
  categoryId,
}: {
  initialProducts: ProductModel[];
  categoryId: string;
}) => {
  const [products, setProducts] = useState(initialProducts);

  const [page, setPage] = useState(0);

  const handleNext = async () => {
    setPage((prev) => prev + 1);
  };

  const handleMore = async () => {
    const data = await getProducts(page, categoryId);
    setProducts((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    if (page > 0) {
      handleMore();
    }
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={handleNext}
      hasMore
      loader={
        <h2 className="text-center text-primary text-2xl mt-5">
          جاري التحميل...
        </h2>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((pr, index) => (
          <ProductCard key={index} pr={pr} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductsList;
