import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllProducts, getProductByHandle, formatPrice } from "@/lib/shopify";
import { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";
import { ProductActions } from "@/components/shop/product-actions";

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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                  {product.productType}
                </p>
                <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
                <p className="text-2xl font-semibold text-primary mb-6">
                  {formatPrice(product.price)}
                </p>

                {product.availableForSale && (
                  <span className="flex items-center gap-2 text-success mb-6 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    In Stock
                  </span>
                )}

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Block Weight</p>
                    <p className="font-medium">{product.blockWeight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Fruiting Temp</p>
                    <p className="font-medium">{product.fruitingTemp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Incubation</p>
                    <p className="font-medium">{product.incubationTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Expected Yield</p>
                    <p className="font-medium">{product.expectedYield}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Storage</p>
                  <p className="text-sm text-gray-600">{product.storageInstructions}</p>
                </div>

                <div className="border-t border-gray-100 pt-8 space-y-6">
                  <ProductActions product={product} />

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-500">or</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    For wholesale orders of 10+ blocks or to arrange delivery, please email us.
                  </p>
                  <a
                    href="mailto:hello@dartvalleyfungi.co.uk?subject=Order inquiry: {product.title}"
                    className="inline-flex items-center gap-2 text-primary px-6 py-3 rounded-md font-medium hover:bg-primary/5 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Order by Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
