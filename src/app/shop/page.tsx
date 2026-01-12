import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/shop/product-card";
import { getAllProducts } from "@/lib/shopify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Buy fresh gourmet mushrooms, grow kits, and mushroom products from Dart Valley Fungi.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl font-bold mb-4">Shop Mushrooms</h1>
            <p className="text-muted-foreground text-lg">
              Fresh gourmet mushrooms and grow kits, delivered from our Devon farm to your door.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
