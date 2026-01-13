"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cart } from "@/types";
import { createCart, addToCart, updateCartLine, removeFromCart } from "@/lib/shopify";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  isOpen: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeCart = async () => {
      const storedCartId = localStorage.getItem("cartId");
      
      if (storedCartId) {
        console.log("Found stored cartId:", storedCartId);
        setCart({ id: storedCartId } as Cart);
      }
      
      try {
        console.log("Creating new cart...");
        const newCart = await createCart();
        console.log("Cart created successfully:", newCart.id);
        setCart(newCart);
        localStorage.setItem("cartId", newCart.id);
      } catch (err) {
        console.error("Failed to create cart:", err);
        setError("Failed to initialize cart. Please refresh the page.");
      }
    };

    initializeCart();
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const clearError = () => setError(null);

  const addItem = async (variantId: string, quantity: number = 1) => {
    if (!cart) {
      console.error("No cart available");
      setError("Cart not initialized. Please refresh the page.");
      return;
    }
    
    console.log("Adding to cart:", { cartId: cart.id, variantId, quantity });
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedCart = await addToCart(cart.id, variantId, quantity);
      console.log("Item added successfully, cart total:", updatedCart.totalQuantity);
      setCart(updatedCart);
      setIsOpen(true);
    } catch (err) {
      console.error("Failed to add item:", err);
      setError("Failed to add item to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart) {
      setError("Cart not initialized. Please refresh the page.");
      return;
    }
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (err) {
      console.error("Failed to update cart item:", err);
      setError("Failed to update cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart) {
      setError("Cart not initialized. Please refresh the page.");
      return;
    }
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
    } catch (err) {
      console.error("Failed to remove cart item:", err);
      setError("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isOpen,
        error,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
