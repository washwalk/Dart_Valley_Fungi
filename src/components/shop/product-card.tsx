import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/shopify";
import type { Product } from "@/types";
import { ShoppingBag, CheckCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      <div className="aspect-square bg-muted relative overflow-hidden">
        <Image
          src={product.images[0] || "/images/placeholder-product.jpg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.availableForSale && (
          <div className="absolute top-2 right-2">
            <span className="flex items-center gap-1 text-xs bg-success/90 text-success-foreground px-2 py-1 rounded-full">
              <CheckCircle className="h-3 w-3" />
              In Stock
            </span>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {product.productType}
        </p>
        <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <p className="mt-3 text-lg font-semibold text-primary">
          {formatPrice(product.price, product.currency)}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/shop/${product.handle}`} className="w-full">
          <Button className="w-full gap-2">
            <ShoppingBag className="h-4 w-4" />
            View Product
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
