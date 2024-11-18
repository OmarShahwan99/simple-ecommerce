"use client";
import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart-context";
import { ProductModel } from "@/types/product";

const AltAddToCart = ({ product }: { product: ProductModel }) => {
  const { items, addItem, removeItem } = useCart();

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

  return existingCartItem ? (
    <div className="flex gap-4 items-center bg-secondary w-fit px-3 py-2 rounded-lg ">
      <Button
        onClick={handleDecrease}
        size="icon"
        variant="ghost"
        className=" w-6 h-6 text-primary"
      >
        <Minus />
      </Button>
      <p className="text-primary">{existingCartItem.quantity}</p>
      <Button
        onClick={handleIncrease}
        size="icon"
        variant="ghost"
        className=" w-6 h-6 text-primary"
      >
        <Plus />
      </Button>
    </div>
  ) : (
    <Button
      variant="secondary"
      onClick={(e) => {
        e.stopPropagation();
        handleIncrease();
      }}
    >
      <ShoppingCart />
    </Button>
  );
};

export default AltAddToCart;
