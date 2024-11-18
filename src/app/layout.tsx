import type { Metadata } from "next";
import "./globals.css";
import { Tajawal } from "next/font/google";
import Layout from "@/components/layouts/layout";
import CartProvider from "@/store/cart-context";

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Omar Store",
  description: "Store for clothing salling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className}`}>
        <CartProvider>
          <Layout>{children}</Layout>
        </CartProvider>
      </body>
    </html>
  );
}
