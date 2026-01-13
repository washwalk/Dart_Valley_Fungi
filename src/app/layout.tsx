import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dart Valley Fungi | Gourmet Mushrooms from Devon",
    template: "%s | Dart Valley Fungi",
  },
  description: "Gourmet mushrooms grown sustainably in Devon using upcycled agricultural waste. Fresh mushrooms, grow kits, and more delivered to your door.",
  keywords: ["mushrooms", "gourmet mushrooms", " Devon", "sustainable farming", "organic", "foraging", "grow kits"],
  authors: [{ name: "Dart Valley Fungi" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Dart Valley Fungi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
