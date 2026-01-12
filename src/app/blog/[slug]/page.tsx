import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <article className="max-w-3xl mx-auto">
            <header className="mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h1 className="font-serif text-4xl font-bold mb-4">{post.title}</h1>
              <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            </header>

            <div className="prose prose-stone max-w-none">
              {post.content.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={index} className="font-serif text-2xl font-bold mt-8 mb-4">{paragraph.slice(3)}</h2>;
                }
                if (paragraph.startsWith("### ")) {
                  return <h3 key={index} className="font-serif text-xl font-semibold mt-6 mb-3">{paragraph.slice(4)}</h3>;
                }
                if (paragraph.startsWith("- ")) {
                  return <li key={index} className="ml-4">{paragraph.slice(2)}</li>;
                }
                if (paragraph.startsWith("*")) {
                  return <li key={index} className="ml-4">{paragraph.slice(1)}</li>;
                }
                if (paragraph.trim() === "") {
                  return null;
                }
                return <p key={index} className="mb-4">{paragraph}</p>;
              })}
            </div>

            <hr className="my-8" />

            <p className="text-muted-foreground italic">
              Have questions about this post? Get in touch with us at{" "}
              <a href="mailto:hello@dartvalleyfungi.co.uk" className="text-primary hover:underline">
                hello@dartvalleyfungi.co.uk
              </a>
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
