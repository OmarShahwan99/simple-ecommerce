import Link from "next/link";
import React from "react";
import CartDrawer from "../cart/cart-drawer";

const Header = () => {
  return (
    <header className="py-3 sticky top-0 shadow bg-white/90 z-50">
      <div className="container flex justify-between items-center">
        <Link href="/" className="space-y-1">
          <h2 className="text-2xl sm:text-4xl text-primary">متجر عمر</h2>
          <p className="text-base text-[#777]">متجر لبيع الألبسة</p>
        </Link>
        <CartDrawer />
      </div>
    </header>
  );
};

export default Header;
