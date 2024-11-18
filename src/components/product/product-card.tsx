import { ProductModel } from "@/types/product";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import CustomImage from "../ui/custom-image";
import AltAddToCart from "../cart/alt-add-to-cart";

const ProductCard = ({ pr }: { pr: ProductModel }) => {
  return (
    <Card className="overflow-hidden space-y-2 transition duration-300 group hover:shadow-lg ">
      <Link key={pr.id} href={`/products/${pr.id}`}>
        <CustomImage
          width={380}
          height={180}
          className="transition duration-300 group-hover:scale-105 group-hover:rotate-1"
          objectFit="cover"
          alt={pr.title}
          src={pr.images[0]}
        />
      </Link>
      <CardContent className="min-h-[4.5rem]">
        <h2 className="text-primary font-[500]">{pr.title}</h2>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <h3 className="font-bold text-primary text-4xl">{pr.price}</h3>
        <AltAddToCart product={pr} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
