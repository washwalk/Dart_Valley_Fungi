export interface Fungi {
  slug: string;
  title: string;
  latinName: string;
  season: string;
  habitat: string;
  edibility: string;
  summary: string;
  content: string;
  image?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  availableForSale: boolean;
  productType: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalAmount: number;
  currency: string;
}
