import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/shop/product-card";
import { getAllProducts, getProductsByType } from "@/lib/shopify";
import { ArrowRight, Package, Sparkles } from "lucide-react";

export default async function HomePage() {
  const products = await getAllProducts();
  const substrateProducts = await getProductsByType("Substrate Block");
  const freshProducts = await getProductsByType("Fresh Produce");
  
  const featuredSubstrate = substrateProducts.slice(0, 3);
  const featuredFresh = freshProducts.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="flex flex-col md:flex-row min-h-[85vh]">
          <Link
            href="/shop?category=substrate"
            className="flex-1 relative group overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-forest-50" />
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <Image
                src="/images/lions-mane.jpg"
                alt="Substrate background"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Package className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold mb-4 text-primary">
                Substrate
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-sm opacity-80">
                Grow your own gourmet mushrooms
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-medium text-lg group-hover:underline">
                Shop Now <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          </Link>

          <Link
            href="/shop?category=fresh"
            className="flex-1 relative group overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-secondary/10" />
            <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/15 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <Image
                src="/images/king-oyster.jpg"
                alt="Fresh produce background"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold mb-4 text-secondary">
                Fresh
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-sm opacity-80">
                Premium mushrooms, harvested to order
              </p>
              <span className="inline-flex items-center gap-2 text-secondary font-medium text-lg group-hover:underline">
                Shop Now <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          </Link>
        </section>

        {featuredSubstrate.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">Featured Substrate</h2>
                  <p className="text-gray-600">Our most popular growing blocks</p>
                </div>
                <Link
                  href="/shop?category=substrate"
                  className="hidden sm:inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredSubstrate.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {featuredFresh.length > 0 && (
          <section className="py-20 bg-secondary/5">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-semibold mb-2 text-secondary">Fresh This Week</h2>
                  <p className="text-gray-600">Recently harvested gourmet mushrooms</p>
                </div>
                <Link
                  href="/shop?category=fresh"
                  className="hidden sm:inline-flex items-center gap-2 text-secondary font-medium hover:underline"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredFresh.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden order-2 lg:order-1">
                <Image
                  src="/images/founders.jpg"
                  alt="Dart Valley Fungi Farm"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-semibold mb-6">Sustainable Growing</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  At Dart Valley Fungi, we grow our substrate blocks using upcycled agricultural waste
                  from local Devon producers. By transforming by-products from Barnaby&apos;s Brewhouse
                  and Riverford Dairy into premium mushroom substrate, we create a truly circular
                  local food system.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our blocks are peat-free and organic, supporting biodiversity while producing
                  consistent, high-quality results for professional cultivators.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-6">Wholesale Orders</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                For restaurants, professional growers, or high-volume orders, please email us
                to discuss pricing and delivery arrangements.
              </p>
              <a
                href="mailto:hello@dartvalleyfungi.co.uk"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
