import Categories from "@/components/categories/categories";
import ProductsGrid from "@/components/product/products-grid";
import CategoriesSkeleton from "@/components/ui/skeletons/CategoriesSkeleton";
import ProductsListSkeleton from "@/components/ui/skeletons/ProductsListSkeleton";
import { Suspense } from "react";

export default function Home(params: {
  searchParams: {
    category: string;
  };
}) {
  const categoryId = params.searchParams.category;

  return (
    <section className="py-16">
      <div className="container">
        <div className="space-y-5">
          <Suspense fallback={<CategoriesSkeleton />}>
            <Categories />
          </Suspense>
          <Suspense fallback={<ProductsListSkeleton />} key={categoryId}>
            <ProductsGrid categoryId={categoryId} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
