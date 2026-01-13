"use client";

import { useCart } from "@/lib/cart-context";
import { ShoppingBag } from "lucide-react";

export function CartButton() {
  const { openCart, cart } = useCart();
  const itemCount = cart?.totalQuantity || 0;

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-gray-100 rounded-full"
      aria-label="Open cart"
    >
      <ShoppingBag className="h-5 w-5 text-gray-600" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-xs text-white font-medium">
          {itemCount}
        </span>
      )}
    </button>
  );
}
