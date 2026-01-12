import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FungiCard } from "@/components/fungi/fungi-card";
import { getAllFungi } from "@/lib/mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fungi",
  description: "Explore our collection of gourmet mushrooms. Learn about oyster, lion's mane, shiitake, and more.",
};

export default async function FungiPage() {
  const fungi = await getAllFungi();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl font-bold mb-4">Our Fungi</h1>
            <p className="text-muted-foreground text-lg">
              Discover the wonderful world of gourmet mushrooms we grow on our Devon farm.
              Each variety has its own unique characteristics, flavors, and growing requirements.
            </p>
          </div>

          {fungi.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fungi.map((fungiItem) => (
                <FungiCard key={fungiItem.slug} fungi={fungiItem} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No fungi profiles available yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
