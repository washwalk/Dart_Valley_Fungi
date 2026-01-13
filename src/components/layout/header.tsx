"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { CartButton } from "@/components/cart/cart-button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold text-gray-900">
              Dart Valley Fungi
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <div className="relative">
              <button
                onMouseEnter={() => setIsProductsOpen(true)}
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
              >
                Products
              </button>
              {isProductsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <Link
                    href="/shop?category=substrate"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    Substrate Blocks
                  </Link>
                  <Link
                    href="/shop?category=fresh"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-secondary hover:bg-gray-50 transition-colors"
                  >
                    Fresh Produce
                  </Link>
                  <Link
                    href="/shop"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors border-t mt-1 pt-2"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>
            <Link href="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
            <a href="mailto:hello@dartvalleyfungi.co.uk" className="text-sm text-gray-600 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <CartButton />
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-900" />
              ) : (
                <Menu className="h-5 w-5 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <div>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center justify-between w-full"
                >
                  Products
                  <span className={`text-xs transition-transform ${isProductsOpen ? "rotate-180" : ""}`}>▼</span>
                </button>
                {isProductsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href="/shop?category=substrate"
                      className="block text-sm text-gray-600 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Substrate Blocks
                    </Link>
                    <Link
                      href="/shop?category=fresh"
                      className="block text-sm text-gray-600 hover:text-secondary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Fresh Produce
                    </Link>
                    <Link
                      href="/shop"
                      className="block text-sm text-gray-600 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View All
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <a
                href="mailto:hello@dartvalleyfungi.co.uk"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
