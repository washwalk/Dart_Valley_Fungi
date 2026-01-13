import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/shop/product-card";
import { getAllProducts, getProductsByType } from "@/lib/shopify";
import { Metadata } from "next";
import Link from "next/link";
import { Package, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Products",
  description: "Premium mushroom substrate blocks and fresh produce for professional growers and chefs.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const products = await getAllProducts();
  
  const substrateProducts = await getProductsByType("Substrate Block");
  const substratePackProducts = await getProductsByType("Substrate Pack");
  const freshProducts = await getProductsByType("Fresh Produce");
  
  const substrateAll = [...substrateProducts, ...substratePackProducts];
  
  let displayedProducts = products;
  let pageTitle = "All Products";
  let pageDescription = "Premium mushroom substrate blocks and fresh produce.";
  
  if (category === "substrate") {
    displayedProducts = substrateAll;
    pageTitle = "Substrate Blocks";
    pageDescription = "Ready-to-fruit substrate blocks for cultivating gourmet mushrooms at home or commercially.";
  } else if (category === "fresh") {
    displayedProducts = freshProducts;
    pageTitle = "Fresh Produce";
    pageDescription = "Freshly harvested gourmet mushrooms, delivered at peak freshness.";
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-semibold mb-4">{pageTitle}</h1>
              <p className="text-gray-600 mb-8">
                {pageDescription}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/shop"
                  className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    !category 
                      ? "bg-primary text-white" 
                      : "bg-white text-gray-600 hover:text-primary border border-gray-200"
                  }`}
                >
                  All Products
                </Link>
                <Link
                  href="/shop?category=substrate"
                  className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === "substrate" 
                      ? "bg-primary text-white" 
                      : "bg-white text-gray-600 hover:text-primary border border-gray-200"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  Substrate Blocks
                </Link>
                <Link
                  href="/shop?category=fresh"
                  className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === "fresh" 
                      ? "bg-secondary text-white" 
                      : "bg-white text-gray-600 hover:text-secondary border border-gray-200"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  Fresh Produce
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {displayedProducts.length > 0 ? (
              <>
                {category === "substrate" && (
                  <div className="mb-8 p-4 bg-forest-50 rounded-lg border border-primary/10">
                    <p className="text-sm text-primary">
                      <strong>Tip:</strong> Each substrate block comes with detailed growing instructions. 
                      Store at 2-4°C until ready to fruit.
                    </p>
                  </div>
                )}
                
                {category === "fresh" && (
                  <div className="mb-8 p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                    <p className="text-sm text-secondary">
                      <strong>Fresh:</strong> Harvested to order. Available for local delivery or pickup from the farm.
                      Please order at least 48 hours in advance.
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  {category === "substrate" && "Substrate blocks coming soon!"}
                  {category === "fresh" && "Fresh produce coming soon!"}
                  {!category && "No products available yet."}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Return Home <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
