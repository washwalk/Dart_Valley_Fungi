import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllFungi } from "@/lib/mdx";
import { getAllProducts } from "@/lib/shopify";
import { getAllBlogPosts } from "@/lib/blog";
import { ArrowRight, Leaf, Truck, Recycle } from "lucide-react";

export default async function HomePage() {
  const fungi = await getAllFungi();
  const products = await getAllProducts();
  const posts = await getAllBlogPosts();

  const featuredFungi = fungi.slice(0, 3);
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative bg-primary text-primary-foreground py-24 lg:py-32">
          <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Gourmet Mushrooms,<br />Grown with Purpose
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                At Dart Valley Fungi, Mic Eaton and Luke Watson cultivate incredible varieties 
                of gourmet mushrooms using upcycled agricultural waste from local Devon producers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shop">
                  <Button size="lg" variant="outline" className="bg-background text-foreground hover:bg-background/90">
                    Shop Mushrooms
                  </Button>
                </Link>
                <Link href="/fungi">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 border-accent">
                    Explore Our Fungi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Sustainable Growing</h3>
                  <p className="text-muted-foreground">
                    We use upcycled agricultural waste, transforming landfill into gourmet food.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Recycle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Local Partnerships</h3>
                  <p className="text-muted-foreground">
                    Sourced from Barnaby's Brewhouse, Riverford Dairy, and local cafes across Devon.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Farm Fresh</h3>
                  <p className="text-muted-foreground">
                    Mushrooms delivered at peak freshness, grown right here in the Devon countryside.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-serif text-3xl font-bold">Featured Fungi</h2>
                <p className="text-muted-foreground mt-1">Discover our favorite mushroom varieties</p>
              </div>
              <Link href="/fungi" className="flex items-center gap-1 text-primary hover:underline">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredFungi.map((f) => (
                <Link key={f.slug} href={`/fungi/${f.slug}`} className="group">
                  <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                      <Image
                        src={f.image || "/images/placeholder-fungi.jpg"}
                        alt={f.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">{f.latinName}</p>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors">
                        {f.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{f.summary}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-serif text-3xl font-bold">Popular Products</h2>
                <p className="text-muted-foreground mt-1">Fresh from our farm to your kitchen</p>
              </div>
              <Link href="/shop" className="flex items-center gap-1 text-primary hover:underline">
                View Shop <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group">
                  <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <Image
                        src={product.images[0] || "/images/placeholder-product.jpg"}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        {product.productType}
                      </p>
                      <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-lg font-semibold text-primary mt-2">
                        £{product.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                <Image
                  src="/images/about-farm.jpg"
                  alt="Dart Valley Fungi Farm"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4">From Our Farm to Your Table</h2>
                <p className="text-muted-foreground mb-6">
                  Just over the hill from our farm in Devon, Mic Eaton and Luke Watson grow an incredible 
                  variety of gourmet mushrooms. Their barn has been specially adapted to create an ideal 
                  environment for all sorts of unusual fungi varieties.
                </p>
                <p className="text-muted-foreground mb-6">
                  They grow using natural by-products from other local organic producers – including our 
                  friends at Barnaby's Brewhouse, and the Riverford Dairy. The resulting mushrooms are 
                  waste-saving, super sustainable, and amazingly tasty.
                </p>
                <Link href="/blog">
                  <Button variant="outline">
                    Read Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {posts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl font-bold">From Our Blog</h2>
                <p className="text-muted-foreground mt-2">Mushroom education and seasonal guides</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {posts.slice(0, 2).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground mb-2">
                          {new Date(post.date).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <h3 className="font-serif text-xl font-semibold mb-2 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
