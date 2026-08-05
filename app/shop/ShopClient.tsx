"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ShopifyCategory, ShopifyProduct } from "@/lib/shopify";

type ShopClientProps = {
  categories: ShopifyCategory[];
  products: ShopifyProduct[];
};

type CartItem = {
  variantId: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
};

const CART_STORAGE_KEY = "mbc-shop-cart";

function getSavedCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(CART_STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export default function ShopClient({ categories, products }: ShopClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getSavedCart());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const productsByCategory = useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }

    return products.filter((product) => product.collectionHandle === activeCategory);
  }, [activeCategory, products]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const categoriesWithAll = useMemo(
    () => [{ id: "all", handle: "all", title: "All", imageUrl: "" }, ...categories],
    [categories]
  );

  const addToCart = (product: ShopifyProduct) => {
    setCartOpen(true);
    setCartItems((current) => {
      const existing = current.find((item) => item.variantId === product.variantId);
      if (existing) {
        return current.map((item) =>
          item.variantId === product.variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          variantId: product.variantId,
          title: product.title,
          price: Number(product.price),
          currency: product.currency,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (variantId: string, amount: number) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (variantId: string) => {
    setCartItems((current) => current.filter((item) => item.variantId !== variantId));
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#24252b]">
      <section className="border-b border-black/5 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#585bb0]">
              Shop
            </p>
            <h1 className="mt-4 font-serif text-5xl">Our Shopify collection</h1>
            <p className="mt-4 max-w-2xl text-base text-black/70">
              Browse live product inventory, shop by category and keep your basket open while you browse.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="rounded-full bg-[#585bb0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#46479a]"
            >
              Basket ({cartCount})
            </button>
            <Link
              href="/cart"
              className="rounded-full border border-[#585bb0] px-5 py-3 text-sm font-semibold text-[#585bb0] transition hover:bg-[#f5f5f5]"
            >
              Go to basket
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-3 overflow-x-auto pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-max gap-2">
            {categoriesWithAll.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.handle)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category.handle
                    ? "border-[#585bb0] bg-[#585bb0] text-white"
                    : "border-black/10 bg-white text-[#24252b] hover:border-[#585bb0] hover:text-[#585bb0]"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="text-sm text-black/60">
            {productsByCategory.length} items available
          </div>
        </div>

        <div className="grid gap-6 pt-6 sm:grid-cols-2 xl:grid-cols-3">
          {productsByCategory.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
              <div className="relative overflow-hidden bg-[#f5f5f3]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-72 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[#585bb0]">
                  {product.collectionTitle || "Featured"}
                </div>
                <h2 className="font-serif text-xl">{product.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/60">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-2xl font-semibold text-[#24252b]">
                      {product.currency} {product.price}
                    </div>
                    <div className="mt-1 text-sm text-black/50">Live Shopify price</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-[#585bb0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#46479a]"
                  >
                    Add to basket
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform border-l border-black/5 bg-white shadow-2xl transition duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#585bb0]">Your basket</p>
              <p className="mt-2 text-2xl font-semibold">{cartCount} items</p>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="rounded-full border border-black/10 px-3 py-2 text-sm font-semibold"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            {cartItems.length === 0 ? (
              <div className="space-y-3 text-sm text-black/60">
                <p>Your cart is empty.</p>
                <p>Tap any product to add it to your basket.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.variantId} className="rounded-3xl border border-black/5 bg-[#faf9f7] p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 rounded-3xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-black/60">
                          {item.currency} {item.price.toFixed(2)}
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variantId, -1)}
                            className="h-9 w-9 rounded-full border border-black/10 text-lg font-bold"
                          >
                            −
                          </button>
                          <span className="min-w-[24px] text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variantId, 1)}
                            className="h-9 w-9 rounded-full border border-black/10 text-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.variantId)}
                      className="mt-4 text-sm font-semibold text-[#585bb0]"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-black/10 px-6 py-5">
            <div className="flex items-center justify-between text-sm text-black/60">
              <span>Subtotal</span>
              <strong>{cartItems[0]?.currency ?? "£"} {cartTotal}</strong>
            </div>

            <div className="mt-4 space-y-3">
              <Link
                href="/cart"
                className="block rounded-full bg-[#585bb0] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#46479a]"
              >
                View basket
              </Link>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="block w-full rounded-full border border-black/10 px-6 py-3 text-sm font-semibold"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
