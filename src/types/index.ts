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
  weight?: string;
  blockWeight?: string;
  fruitingTemp?: string;
  incubationTime?: string;
  expectedYield?: string;
  storageInstructions?: string;
  harvestDate?: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  variantId: string;
  variantTitle: string;
  productTitle: string;
  productHandle: string;
  price: number;
  currency: string;
  image: string | null;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  totalAmount: number;
  currency: string;
  lines: CartItem[];
}
