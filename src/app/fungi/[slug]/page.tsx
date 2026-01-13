import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllFungi, getFungiBySlug } from "@/lib/mdx";
import { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
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

      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <Link
              href="/fungi"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Fungi
            </Link>
            <div className="max-w-3xl">
              <span className="text-sm font-medium text-accent uppercase tracking-wide">
                {fungi.edibility}
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mt-2 mb-4 text-white">
                {fungi.title}
              </h1>
              <p className="text-xl text-primary-foreground/80 italic">
                {fungi.latinName}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden relative shadow-lg">
                <Image
                  src={fungi.image || "/images/placeholder-fungi.jpg"}
                  alt={fungi.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-6">
                <p className="text-lg text-foreground leading-relaxed">
                  {fungi.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">Season</h3>
                      <p className="text-muted-foreground">{fungi.season}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">Grown On</h3>
                      <p className="text-muted-foreground">{fungi.habitat}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <article className="max-w-3xl mx-auto prose prose-stone prose-lg">
              {fungi.content.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <div key={index} className="relative pl-6 border-l-2 border-primary/30">
                      <h2 className="font-serif text-2xl font-bold mt-10 mb-4 text-primary">
                        {paragraph.slice(3)}
                      </h2>
                    </div>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="font-serif text-xl font-semibold mt-8 mb-3">
                      {paragraph.slice(4)}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={index} className="ml-2 list-disc text-muted-foreground">
                      {paragraph.slice(2)}
                    </li>
                  );
                }
                if (paragraph.match(/^\d+\. /)) {
                  return <p key={index} className="ml-4">{paragraph}</p>;
                }
                if (paragraph.trim() === "") {
                  return null;
                }
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
