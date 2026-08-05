import { NextResponse } from "next/server";
import { createShopifyCheckout, ShopifyCheckoutLineItem } from "@/lib/shopify";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lineItems = body.lineItems as ShopifyCheckoutLineItem[];

    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const checkout = await createShopifyCheckout(lineItems);
    return NextResponse.json({ webUrl: checkout.webUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
