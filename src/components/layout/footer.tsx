import Link from "next/link";
import { Leaf, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-bold text-primary">
                Dart Valley Fungi
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Gourmet mushrooms grown sustainably in Devon using upcycled agricultural waste.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/fungi" className="text-muted-foreground hover:text-primary transition-colors">
                Our Fungi
              </Link>
              <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                Shop Mushrooms
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-semibold">Contact</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Devon, United Kingdom</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@dartvalleyfungi.co.uk" className="hover:text-primary transition-colors">
                  hello@dartvalleyfungi.co.uk
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-semibold">Sustainability</h3>
            <p className="text-sm text-muted-foreground">
              We grow our mushrooms using upcycled agricultural waste and by-products from local organic producers.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dart Valley Fungi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
