"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    setCartItems(getSavedCart());
  }, []);

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    [cartItems]
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems: cartItems.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.webUrl) {
        throw new Error(data.error || "Unable to create checkout.");
      }

      window.location.href = data.webUrl;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : String(error));
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#24252b]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#585bb0]">Basket</p>
            <h1 className="mt-4 font-serif text-5xl">Your shopping basket</h1>
            <p className="mt-4 max-w-2xl text-base text-black/70">
              Review the products in your cart, adjust quantities, and proceed to checkout.
            </p>
          </div>

          <Link
            href="/shop"
            className="rounded-full border border-[#585bb0] px-6 py-3 text-sm font-semibold text-[#585bb0] transition hover:bg-[#f5f5f5]"
          >
            Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-black/10 bg-white p-10 text-center text-lg text-black/70">
            Your basket is empty. Add products from the shop to get started.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.variantId} className="rounded-3xl border border-black/10 bg-white p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-28 w-28 rounded-3xl object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="font-semibold">{item.title}</h2>
                      <p className="mt-2 text-sm text-black/60">
                        {item.currency} {item.price.toFixed(2)}
                      </p>
                      <p className="mt-4 text-sm text-black/60">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-black/60">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-black/60">
                  <span>Subtotal</span>
                  <strong>{cartItems[0]?.currency ?? "£"} {cartTotal}</strong>
                </div>
                {checkoutError ? (
                  <p className="rounded-2xl bg-[#fee2e2] p-3 text-sm text-[#991b1b]">{checkoutError}</p>
                ) : null}
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full rounded-full bg-[#585bb0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#46479a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {checkoutLoading ? "Preparing checkout..." : "Checkout with Shopify"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
