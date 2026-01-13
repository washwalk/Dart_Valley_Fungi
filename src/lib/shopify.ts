import type { Product, Cart } from "@/types";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-01";

console.log("Shopify config:", { domain, hasToken: !!storefrontAccessToken, apiVersion });

async function shopifyFetch<T>({ query, variables }: { query: string; variables?: Record<string, unknown> }): Promise<T> {
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  console.log("Making Shopify API request to:", endpoint);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  console.log("Shopify API response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Shopify API error:", response.statusText, errorText);
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message || "Unknown Shopify error");
  }

  return json.data;
}

interface ProductFragment {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  productType: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
  metafields: Array<{ key: string; value: string } | null>;
}

interface CartFragment {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: { title: string; handle: string };
          image: { url: string } | null;
          price: { amount: string; currencyCode: string };
        };
      };
    }[];
  };
}

function transformProduct(product: ProductFragment): Product {
  const metafields = product.metafields?.filter(Boolean) || [];
  const getMetafield = (key: string) => {
    const field = metafields.find((f) => f?.key === key);
    return field?.value || undefined;
  };

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    price: parseFloat(product.priceRange.minVariantPrice.amount),
    currency: product.priceRange.minVariantPrice.currencyCode,
    images: product.images.edges.map((edge) => edge.node.url),
    availableForSale: product.availableForSale,
    productType: product.productType || "Product",
    blockWeight: getMetafield("block_weight"),
    fruitingTemp: getMetafield("fruiting_temp"),
    incubationTime: getMetafield("incubation_time"),
    expectedYield: getMetafield("expected_yield"),
    storageInstructions: getMetafield("storage_instructions"),
  };
}

function transformCart(cart: CartFragment): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    totalAmount: parseFloat(cart.cost.totalAmount.amount),
    currency: cart.cost.totalAmount.currencyCode,
    lines: cart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      variantId: node.merchandise.id,
      variantTitle: node.merchandise.title,
      productTitle: node.merchandise.product.title,
      productHandle: node.merchandise.product.handle,
      price: parseFloat(node.merchandise.price.amount),
      currency: node.merchandise.price.currencyCode,
      image: node.merchandise.image?.url || null,
    })),
  };
}

function getMockProducts(): Product[] {
  return [
    {
      id: "prod_1",
      handle: "lions-mane-substrate",
      title: "Lion's Mane Substrate Block",
      description: "Premium ready-to-fruit substrate block for Lion's Mane mushrooms. Grown on organic peat-free substrate using sustainable by-products from local farms.",
      price: 8.50,
      currency: "GBP",
      images: ["/images/lions-mane.jpg"],
      availableForSale: true,
      productType: "Substrate Block",
      blockWeight: "~2.5kg",
      fruitingTemp: "15-20°C",
      incubationTime: "14-21 days",
      expectedYield: "500-800g",
      storageInstructions: "Store at 2-4°C. Use within 2 weeks of delivery for best results.",
    },
    {
      id: "prod_2",
      handle: "king-oyster-substrate",
      title: "King Oyster Substrate Block",
      description: "High-yield substrate block for King Oyster mushrooms. Produces large, meaty mushrooms with excellent texture and flavour.",
      price: 7.95,
      currency: "GBP",
      images: ["/images/king-oyster.jpg"],
      availableForSale: true,
      productType: "Substrate Block",
      blockWeight: "~2.5kg",
      fruitingTemp: "15-18°C",
      incubationTime: "14-21 days",
      expectedYield: "600-900g",
      storageInstructions: "Store at 2-4°C. Use within 2 weeks of delivery for best results.",
    },
    {
      id: "prod_3",
      handle: "hen-of-woods-substrate",
      title: "Hen of Woods Substrate Block",
      description: "Premium substrate for Hen of Woods (Maitake). Produces clusters with exceptional truffle-like flavour.",
      price: 8.45,
      currency: "GBP",
      images: ["/images/hen-of-woods.jpg"],
      availableForSale: true,
      productType: "Substrate Block",
      blockWeight: "~2.5kg",
      fruitingTemp: "12-16°C",
      incubationTime: "21-28 days",
      expectedYield: "400-700g",
      storageInstructions: "Store at 2-4°C. Use within 2 weeks of delivery for best results.",
    },
    {
      id: "prod_4",
      handle: "mixed-substrate-pack",
      title: "Mixed Substrate Pack (3 Blocks)",
      description: "Assorted pack containing one block each of Lion's Mane, King Oyster, and Hen of Woods. Perfect for trying different varieties.",
      price: 22.00,
      currency: "GBP",
      images: ["/images/lions-mane.jpg", "/images/king-oyster.jpg", "/images/hen-of-woods.jpg"],
      availableForSale: true,
      productType: "Substrate Pack",
      blockWeight: "~7.5kg total",
      fruitingTemp: "Varies by variety",
      incubationTime: "14-28 days",
      expectedYield: "1.5-2.5kg total",
      storageInstructions: "Store at 2-4°C. Use within 2 weeks of delivery for best results.",
    },
    {
      id: "fresh_1",
      handle: "lions-mane-fresh",
      title: "Fresh Lion's Mane",
      description: "Freshly harvested Lion's Mane mushrooms. Known for their delicate seafood-like flavour and impressive health benefits. Perfect for pan-frying or roasting.",
      price: 12.00,
      currency: "GBP",
      images: ["/images/lions-mane.jpg"],
      availableForSale: true,
      productType: "Fresh Produce",
      weight: "~200g",
      harvestDate: "Harvested to order",
      storageInstructions: "Store in paper bag in refrigerator. Best used within 5 days of harvest.",
    },
    {
      id: "fresh_2",
      handle: "king-oyster-fresh",
      title: "Fresh King Oyster",
      description: "Premium fresh King Oyster mushrooms. Large, meaty caps with a rich, savory flavour. Excellent grilled, roasted, or in stir-fries.",
      price: 10.00,
      currency: "GBP",
      images: ["/images/king-oyster.jpg"],
      availableForSale: true,
      productType: "Fresh Produce",
      weight: "~250g",
      harvestDate: "Harvested to order",
      storageInstructions: "Store in paper bag in refrigerator. Best used within 7 days of harvest.",
    },
    {
      id: "fresh_3",
      handle: "oyster-mushroom-fresh",
      title: "Fresh Oyster Mushrooms",
      description: "Freshly harvested Oyster mushrooms. Mild, sweet flavour with tender texture. Versatile and quick-cooking - great in soups, stir-fries, or simply sautéed.",
      price: 8.50,
      currency: "GBP",
      images: ["/images/oyster-mushroom.jpg"],
      availableForSale: true,
      productType: "Fresh Produce",
      weight: "~300g",
      harvestDate: "Harvested to order",
      storageInstructions: "Store in paper bag in refrigerator. Best used within 5 days of harvest.",
    },
  ];
}

export async function getAllProducts(): Promise<Product[]> {
  const query = `
    query Products {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            availableForSale
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            metafields(identifiers: [
              {namespace: "custom", key: "block_weight"},
              {namespace: "custom", key: "fruiting_temp"},
              {namespace: "custom", key: "incubation_time"},
              {namespace: "custom", key: "expected_yield"},
              {namespace: "custom", key: "storage_instructions"}
            ]) {
              key
              value
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ products: { edges: { node: ProductFragment }[] } }>({ query });
    return data.products.edges.map(({ node }) => transformProduct(node));
  } catch {
    return getMockProducts();
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query Product($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        availableForSale
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
        metafields(identifiers: [
          {namespace: "custom", key: "block_weight"},
          {namespace: "custom", key: "fruiting_temp"},
          {namespace: "custom", key: "incubation_time"},
          {namespace: "custom", key: "expected_yield"},
          {namespace: "custom", key: "storage_instructions"}
        ]) {
          key
          value
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ product: ProductFragment | null }>({ query, variables: { handle } });
    if (!data.product) return null;
    return transformProduct(data.product);
  } catch {
    const mockProducts = getMockProducts();
    return mockProducts.find((p) => p.handle === handle) || null;
  }
}

export async function getProductsByType(productType: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.productType === productType);
}

export async function createCart(): Promise<Cart> {
  console.log("Creating new Shopify cart...");
  const query = `
    mutation CartCreate {
      cartCreate {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    image {
                      url
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartCreate: { cart: CartFragment } }>({ query });
  console.log("Cart created:", data.cartCreate.cart.id);
  return transformCart(data.cartCreate.cart);
}

export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  console.log("Adding to cart:", { cartId, variantId, quantity });
  const query = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    image {
                      url
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesAdd: { cart: CartFragment } }>({
    query,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });
  console.log("Add to cart result, total quantity:", data.cartLinesAdd.cart.totalQuantity);
  return transformCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const query = `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    image {
                      url
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesUpdate: { cart: CartFragment } }>({
    query,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  });
  return transformCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart> {
  const query = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    image {
                      url
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesRemove: { cart: CartFragment } }>({
    query,
    variables: { cartId, lineIds: [lineId] },
  });
  return transformCart(data.cartLinesRemove.cart);
}

export function formatPrice(price: number, currency: string = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(price);
}
