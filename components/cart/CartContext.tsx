"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  sizeClass?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  lastAdded: CartItem | null;
  toastVisible: boolean;
  hideToast: () => void;
  cartGlow: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [cartGlow, setCartGlow] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("deadwood_cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("deadwood_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  function addItem(item: Omit<CartItem, "quantity">) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    const newItem: CartItem = { ...item, quantity: 1 };
    setLastAdded(newItem);
    setToastVisible(true);

    // Glow the cart icon in navbar
    setCartGlow(true);
    setTimeout(() => setCartGlow(false), 1400);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  function hideToast() {
    setToastVisible(false);
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        addItem,
        removeItem,
        clearCart,
        lastAdded,
        toastVisible,
        hideToast,
        cartGlow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
