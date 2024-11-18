"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ProductModel } from "@/types/product";
import useLocalStorage from "react-use/lib/useLocalStorage";

export interface CartItem {
  product: ProductModel;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedItems = [...state.items];
      const existingIndex = updatedItems.findIndex(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingIndex !== -1) {
        updatedItems[existingIndex].quantity += action.payload.quantity;
      } else {
        updatedItems.push({ ...action.payload, quantity: 1 });
      }

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return { items: updatedItems, totalAmount: updatedTotal };
    }
    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return { items: updatedItems, totalAmount: updatedTotal };
    }

    case "CLEAR_CART":
      return { items: [], totalAmount: 0 };
    case "SET_CART":
      return action.payload;
    default:
      return state;
  }
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: CartState = {
    items: [],
    totalAmount: 0,
  };

  const [savedCart, saveCart] = useLocalStorage(
    "cart",
    JSON.stringify(initialState)
  );

  const [state, dispatch] = useReducer(
    cartReducer,
    savedCart ? JSON.parse(savedCart) : initialState
  );

  const total = state.items.length;

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,

        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return useMemo(() => context, [context]);
};
