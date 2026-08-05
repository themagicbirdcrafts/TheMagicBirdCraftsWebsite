import ShopClient from "./ShopClient";
import { getShopifyCollectionsAndProducts } from "@/lib/shopify";

export default async function ShopPage() {
  const { categories, products } = await getShopifyCollectionsAndProducts();

  return <ShopClient categories={categories} products={products} />;
}
