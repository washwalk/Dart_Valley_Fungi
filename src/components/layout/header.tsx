"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl font-bold text-primary">
              Dart Valley Fungi
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/fungi" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Our Fungi
            </Link>
            <Link href="/shop" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/blog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/cart" className="relative" aria-label="Shopping cart">
              <ShoppingBag className="h-5 w-5 text-foreground/80 hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-accent text-[10px] font-medium text-accent-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/fungi"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Fungi
              </Link>
              <Link
                href="/shop"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/cart"
                className="flex items-center space-x-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
