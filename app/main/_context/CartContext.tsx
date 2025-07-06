"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Food } from "@/types/food";
import { CartDataTypes } from "@/types";

type CartContextType = {
  cartItems: CartDataTypes[];
  addToCart: (food: Food, quantity?: number) => void;
  removeFromCart: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartDataTypes[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food: Food, quantity: number = 1) => {
    setCartItems((prevFoods) => {
      const existing = prevFoods.find((foods) => foods.food._id === food._id);
      if (existing) {
        return prevFoods.map((foods) =>
          foods.food._id === food._id
            ? { ...foods, quantity: foods.quantity + quantity }
            : foods
        );
      } else {
        return [...prevFoods, { food, quantity }];
      }
    });
  };

  const removeFromCart = (foodId: string) => {
    setCartItems((prevFoods) =>
      prevFoods.filter((foods) => foods.food._id !== foodId)
    );
  };

  const updateQuantity = (foodId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(foodId);
    } else {
      setCartItems((prevFoods) =>
        prevFoods.map((foods) =>
          foods.food._id === foodId ? { ...foods, quantity } : foods
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.food.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
