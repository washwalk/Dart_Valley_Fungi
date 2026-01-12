import type { Product } from "@/types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    handle: "oyster-mushroom-fresh",
    title: "Fresh Oyster Mushrooms",
    description: "Our signature oyster mushrooms - tender, flavorful, and perfect for any dish. Grown sustainably on upcycled coffee grounds from local cafes.",
    price: 8.50,
    currency: "GBP",
    images: ["/images/oyster-mushroom.jpg"],
    availableForSale: true,
    productType: "Fresh Mushrooms",
  },
  {
    id: "prod_2",
    handle: "lions-mane-fresh",
    title: "Fresh Lion's Mane",
    description: "The culinary marvel with a delicate, seafood-like flavor. Known for its cascading spines and impressive health benefits. Limited availability!",
    price: 12.00,
    currency: "GBP",
    images: ["/images/lions-mane.jpg"],
    availableForSale: true,
    productType: "Fresh Mushrooms",
  },
  {
    id: "prod_3",
    handle: "shiitake-dried",
    title: "Dried Shiitake Mushrooms",
    description: "Intensely flavored dried shiitake mushrooms. Rehydrate for umami-rich stir-fries, soups, or enjoy as a snack. Concentrated flavor.",
    price: 10.00,
    currency: "GBP",
    images: ["/images/shiitake-dried.jpg"],
    availableForSale: true,
    productType: "Dried Mushrooms",
  },
  {
    id: "prod_4",
    handle: "oyster-grow-kit",
    title: "Oyster Mushroom Grow Kit",
    description: "Grow your own oysters at home! This easy-to-use kit includes everything you need for your first harvest. Perfect for beginners.",
    price: 25.00,
    currency: "GBP",
    images: ["/images/grow-kit.jpg"],
    availableForSale: true,
    productType: "Grow Kits",
  },
  {
    id: "prod_5",
    handle: "lions-mane-grow-kit",
    title: "Lion's Mane Grow Kit",
    description: "Experience the joy of growing your own Lion's Mane. This premium grow kit produces multiple flushes of these magnificent mushrooms.",
    price: 32.00,
    currency: "GBP",
    images: ["/images/lions-mane-grow-kit.jpg"],
    availableForSale: true,
    productType: "Grow Kits",
  },
  {
    id: "prod_6",
    handle: "medicinal-mushroom-blend",
    title: "Medicinal Mushroom Blend",
    description: "A curated blend of Lion's Mane, Reishi, and Turkey Tail for daily wellness. Dried and ground, perfect for teas or smoothies.",
    price: 18.00,
    currency: "GBP",
    images: ["/images/mushroom-blend.jpg"],
    availableForSale: true,
    productType: "Supplements",
  },
];

export async function getAllProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const product = MOCK_PRODUCTS.find((p) => p.handle === handle);
  return product || null;
}

export async function getProductsByType(productType: string): Promise<Product[]> {
  return MOCK_PRODUCTS.filter((p) => p.productType === productType);
}

export function formatPrice(price: number, currency: string = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(price);
}
