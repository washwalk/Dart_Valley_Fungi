import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllProducts, getProductByHandle, formatPrice } from "@/lib/shopify";
import { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, CheckCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
              <Image
                src={product.images[0] || "/images/placeholder-product.jpg"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.productType}
              </p>
              <h1 className="font-serif text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-3xl font-semibold text-primary mb-6">
                {formatPrice(product.price, product.currency)}
              </p>
              
              <div className="flex items-center gap-2 mb-6">
                {product.availableForSale ? (
                  <span className="flex items-center gap-2 text-success">
                    <CheckCircle className="h-5 w-5" />
                    In Stock
                  </span>
                ) : (
                  <span className="text-muted-foreground">Out of Stock</span>
                )}
              </div>

              <p className="text-muted-foreground mb-8">{product.description}</p>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Product Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Type:</strong> {product.productType}</li>
                    <li><strong>Price:</strong> {formatPrice(product.price, product.currency)}</li>
                    <li><strong>Currency:</strong> {product.currency}</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button size="lg" className="w-full gap-2" disabled={!product.availableForSale}>
                  <ShoppingBag className="h-5 w-5" />
                  {product.availableForSale ? "Add to Cart" : "Out of Stock"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Free delivery on orders over £30. Fresh mushrooms delivered in eco-friendly packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
