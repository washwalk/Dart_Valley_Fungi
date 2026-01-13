"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/shopify";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, AlertCircle } from "lucide-react";

export function CartDrawer() {
  const { cart, isOpen, isLoading, error, closeCart, updateItem, removeItem, clearError } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={closeCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
              <button onClick={clearError} className="ml-auto text-xs underline">
                Dismiss
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4">
            {!cart || cart.lines.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={closeCart}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.lines.map((item) => (
                  <li key={item.id} className="flex gap-4 border-b pb-4">
                    {item.image && (
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.productTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.productTitle}</h3>
                      {item.variantTitle !== "Default Title" && (
                        <p className="text-sm text-gray-500">{item.variantTitle}</p>
                      )}
                      <p className="mt-1 font-medium">
                        {formatPrice(item.price, item.currency)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateItem(item.id, item.quantity - 1)}
                            disabled={isLoading || item.quantity <= 1}
                            className="p-1 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="p-1 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isLoading}
                          className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cart && cart.lines.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(cart.totalAmount, cart.currency)}</span>
              </div>
              <p className="text-sm text-gray-500">Shipping calculated at checkout</p>
              <a
                href={cart.checkoutUrl}
                className="block w-full rounded-lg bg-primary py-3 text-center text-white font-medium hover:bg-primary/90"
              >
                Proceed to Checkout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
