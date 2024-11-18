import React from "react";
import { getProducts } from "@/services/product";
import ProductsList from "./products-list";

async function ProductsGrid({ categoryId }: { categoryId: string }) {
  const products = await getProducts(0, categoryId);

  return <ProductsList initialProducts={products} categoryId={categoryId} />;
}

export default ProductsGrid;
