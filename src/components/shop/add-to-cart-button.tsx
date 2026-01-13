"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/shopify";
import { Product } from "@/types";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  variantId?: string;
}

export function AddToCartButton({ product, variantId }: AddToCartButtonProps) {
  const { addItem, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    await addItem(variantId || product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1 || isLoading}
            className="p-3 hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 text-lg font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            disabled={isLoading}
            className="p-3 hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {product.availableForSale ? "In stock" : "Out of stock"}
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!product.availableForSale || isLoading}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
          added
            ? "bg-green-600 text-white"
            : "bg-primary text-white hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
        }`}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            Add to Cart - {formatPrice(product.price * quantity)}
          </>
        )}
      </button>
    </div>
  );
}
