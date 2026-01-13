"use client";

import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { Product } from "@/types";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  return <AddToCartButton product={product} />;
}
