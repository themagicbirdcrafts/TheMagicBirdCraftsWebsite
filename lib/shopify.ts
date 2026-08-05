export type ShopifyCategory = {
  id: string;
  title: string;
  handle: string;
  imageUrl?: string;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  price: string;
  currency: string;
  variantId: string;
  collectionHandle?: string;
  collectionTitle?: string;
};

export type ShopifyCheckoutLineItem = {
  variantId: string;
  quantity: number;
};

const shopifyDomain =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!shopifyDomain || !storefrontToken) {
  throw new Error(
    "Missing Shopify environment variables. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
  );
}

const SHOPIFY_API_URL = `https://${shopifyDomain}/api/2024-10/graphql.json`;

async function shopifyFetch(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  if (!response.ok || json.errors) {
    const errorMessage = json.errors?.[0]?.message || response.statusText;
    throw new Error(`Shopify request failed: ${errorMessage}`);
  }

  return json.data;
}

export async function getShopifyCollectionsAndProducts() {
  const query = `
    query shopCollectionsAndProducts($collectionsFirst: Int!, $productsFirst: Int!) {
      collections(first: $collectionsFirst) {
        nodes {
          id
          handle
          title
          image {
            url
          }
        }
      }
      products(first: $productsFirst) {
        nodes {
          id
          title
          handle
          description
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
          variants(first: 1) {
            nodes {
              id
              priceV2 {
                amount
                currencyCode
              }
            }
          }
          collections(first: 1) {
            nodes {
              handle
              title
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, {
    collectionsFirst: 8,
    productsFirst: 24,
  });

  const categories = (data.collections.nodes as Array<any>).map((collection: any) => ({
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    imageUrl: collection.image?.url ?? "",
  }));

  const products = (data.products.nodes as Array<any>)
    .map((product: any) => {
      const variant = product.variants.nodes[0];
      const image = product.images.nodes[0];
      const collection = product.collections.nodes[0];

      if (!variant) return null;

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description ?? "",
        image: image?.url ?? "/placeholder.jpg",
        price: variant.priceV2.amount,
        currency: variant.priceV2.currencyCode,
        variantId: variant.id,
        collectionHandle: collection?.handle,
        collectionTitle: collection?.title,
      } as ShopifyProduct;
    })
    .filter(Boolean) as ShopifyProduct[];

  return {
    categories,
    products,
  };
}

export async function createShopifyCheckout(lineItems: ShopifyCheckoutLineItem[]) {
  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(mutation, {
    input: {
      lineItems: lineItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    },
  });

  const result = data.checkoutCreate;
  if (result.userErrors?.length) {
    throw new Error(result.userErrors.map((error: any) => error.message).join(" ")); 
  }

  return result.checkout;
}
