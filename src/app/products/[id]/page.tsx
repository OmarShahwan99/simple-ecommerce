import AddToCart from "@/components/cart/add-to-cart";
import ProductImageSlider from "@/components/product/product-image-slider";
import { Badge } from "@/components/ui/badge";
import { DetailsSkeleton } from "@/components/ui/skeletons/DetailsSkeleton";
import { getProduct } from "@/services/product";
import { Suspense } from "react";

async function ProductDetalis({ params: { id } }: { params: { id: string } }) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <ProductImageSlider images={product.images} />
      <div className="space-y-4">
        <h2 className="font-bold text-primary text-2xl sm:text-4xl">
          {product.title}
        </h2>
        <p className="leading-7 text-base ">{product.description}</p>
        <Badge variant="secondary" className="block w-fit">
          {product.category.name}
        </Badge>
        <h3 className="font-semibold text-4xl text-primary">{product.price}</h3>
        <AddToCart product={product} />
      </div>
    </div>
  );
}

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="py-8">
      <div className="container">
        <Suspense fallback={<DetailsSkeleton />}>
          <ProductDetalis params={params} />
        </Suspense>
      </div>
    </div>
  );
}
