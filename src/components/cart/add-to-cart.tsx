"use client";
import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { ProductModel } from "@/types/product";
import { useCart } from "@/store/cart-context";

const AddToCart = ({ product }: { product: ProductModel }) => {
  const { addItem, items, removeItem } = useCart();

  const existingCartItem = items.find((item) => item.product.id === product.id);

  const handleIncrease = () => {
    addItem({
      product,
      quantity: 1,
    });
  };
  const handleDecrease = () => {
    if (existingCartItem) {
      if (existingCartItem?.quantity > 1)
        addItem({
          product,
          quantity: -1,
        });
      else removeItem(product.id);
    }
  };

  return (
    <>
      {existingCartItem ? (
        <div className="flex gap-6 items-center bg-primary w-fit px-3 py-2 rounded-lg ">
          <Button
            onClick={handleDecrease}
            size="icon"
            variant="ghost"
            className=" w-6 h-6 text-white"
          >
            <Minus />
          </Button>
          <p className="text-white">{existingCartItem.quantity}</p>
          <Button
            onClick={handleIncrease}
            size="icon"
            variant="ghost"
            className=" w-6 h-6 text-white"
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <Button onClick={handleIncrease}>
          <ShoppingCart />
          أضف إلى السلة
        </Button>
      )}
    </>
  );
};

export default AddToCart;
