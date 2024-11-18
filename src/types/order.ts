import { CartItem } from "@/store/cart-context";

export interface OrderModel {
  total: number;
  orderItems: CartItem[];
}
