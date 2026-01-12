import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart with fresh gourmet mushrooms from Dart Valley Fungi.",
};

export default function CartPage() {
  const cartItems: Array<{
    id: string;
    product: {
      id: string;
      title: string;
      price: number;
      images: string[];
    };
    quantity: number;
  }> = [];

  const subtotal = 0;
  const shipping = subtotal >= 30 ? 0 : 4.99;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold mb-8">Your Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 py-4 border-b last:border-0">
                        <div className="w-20 h-20 bg-muted rounded-md" />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.title}</h3>
                          <p className="text-muted-foreground">£{item.product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon">-</Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon">+</Button>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>£{(subtotal + shipping).toFixed(2)}</span>
                    </div>
                    <Button className="w-full" disabled={cartItems.length === 0}>
                      Proceed to Checkout
                    </Button>
                    {subtotal < 30 && (
                      <p className="text-xs text-muted-foreground text-center">
                        Add £{(30 - subtotal).toFixed(2)} more for free delivery!
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="font-serif text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added any mushrooms to your cart yet.
                </p>
                <Link href="/shop">
                  <Button>Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
