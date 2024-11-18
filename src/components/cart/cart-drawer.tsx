"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart, Trash, X } from "lucide-react";
import { CartItem, useCart } from "@/store/cart-context";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Separator } from "../ui/separator";
import CustomImage from "../ui/custom-image";
import Checkout from "../checkout/checkout";

const CartDrawer = () => {
  const { total, items, totalAmount, removeItem, clearCart, addItem } =
    useCart();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleIncrease = (item: CartItem) => {
    addItem({
      product: item.product,
      quantity: 1,
    });
  };

  const handleDecrease = (item: CartItem) => {
    if (item.quantity > 1) {
      addItem({
        product: item.product,
        quantity: -1,
      });
    } else {
      removeItem(item.product.id);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const handleClear = () => {
    clearCart();
  };

  return (
    <Drawer direction="right" open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger>
        ({totalAmount}$)
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="!w-7 !h-7" />
          <div className="absolute top-0 right-0 w-4 h-4 flex rounded-full items-center justify-center bg-rose-600 text-white">
            {total}
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex justify-between">
            <span>سلتك</span>
            <div className="flex gap-3 items-center">
              <span>{total} عناصر</span>
              {total > 0 && (
                <Button
                  onClick={handleClear}
                  variant="destructive"
                  size="icon"
                  className="w-7 h-7"
                >
                  <Trash />
                </Button>
              )}
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <Separator />
        <div className="overflow-auto">
          {items?.map((item) => (
            <div key={item.product.id}>
              <div className="flex justify-between items-center p-4 relative">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-2 bg-secondary p-1 rounded-full">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-4 h-4"
                      onClick={() => handleIncrease(item)}
                    >
                      <Plus />
                    </Button>
                    <p>{item.quantity}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-4 h-4"
                      onClick={() => handleDecrease(item)}
                    >
                      <Minus />
                    </Button>
                  </div>
                  <CustomImage
                    src={item.product.images[0]}
                    alt={item.product.title}
                    width={50}
                    height={50}
                  />
                  <div className="space-y-3">
                    <h2>{item.product.title}</h2>
                    <h3>
                      {item.quantity} × {item.product.price}$
                    </h3>
                  </div>
                </div>
                <h2 className="text-xl font-bold">
                  {item.quantity * item.product.price}$
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-4 h-4 text-[#777] absolute top-3 left-3"
                  onClick={() => handleRemoveItem(item.product.id)}
                >
                  <X />
                </Button>
              </div>
              <Separator />
            </div>
          ))}
        </div>
        <DrawerFooter>
          <Checkout totalAmount={totalAmount} setDrawerOpen={setDrawerOpen} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
