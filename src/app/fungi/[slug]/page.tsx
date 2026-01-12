import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllFungi, getFungiBySlug } from "@/lib/mdx";
import { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FungiDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: FungiDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const fungi = await getFungiBySlug(slug);

  if (!fungi) {
    return {
      title: "Fungi Not Found",
    };
  }

  return {
    title: fungi.title,
    description: fungi.summary,
  };
}

export async function generateStaticParams() {
  const fungi = await getAllFungi();
  return fungi.map((f) => ({
    slug: f.slug,
  }));
}

export default async function FungiDetailPage({ params }: FungiDetailPageProps) {
  const { slug } = await params;
  const fungi = await getFungiBySlug(slug);

  if (!fungi) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/fungi"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Fungi
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden relative">
                <Image
                  src={fungi.image || "/images/placeholder-fungi.jpg"}
                  alt={fungi.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="font-serif text-4xl font-bold">{fungi.title}</h1>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    fungi.edibility === "Edible" 
                      ? "bg-success/20 text-success" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {fungi.edibility}
                  </span>
                </div>
                <p className="text-xl text-muted-foreground italic mb-6">{fungi.latinName}</p>
                <p className="text-lg text-foreground mb-6">{fungi.summary}</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Season</h3>
                    <p>{fungi.season}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Habitat</h3>
                    <p>{fungi.habitat}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-stone max-w-none">
              {fungi.content.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={index} className="font-serif text-2xl font-bold mt-8 mb-4">{paragraph.slice(3)}</h2>;
                }
                if (paragraph.startsWith("### ")) {
                  return <h3 key={index} className="font-serif text-xl font-semibold mt-6 mb-3">{paragraph.slice(4)}</h3>;
                }
                if (paragraph.startsWith("- ")) {
                  return <li key={index} className="ml-4">{paragraph.slice(2)}</li>;
                }
                if (paragraph.match(/^\d+\. /)) {
                  return <p key={index} className="ml-4">{paragraph}</p>;
                }
                if (paragraph.trim() === "") {
                  return null;
                }
                return <p key={index} className="mb-4">{paragraph}</p>;
              })}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
