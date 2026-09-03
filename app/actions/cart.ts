"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CART_COOKIE,
  lineId,
  parseCart,
  type CartData,
  type CartLine,
} from "@/lib/cart-data";
import { getProduct } from "@/lib/catalog";

function serialize(cart: CartData) {
  return JSON.stringify(cart);
}

async function readCart(): Promise<CartData> {
  const jar = await cookies();
  return parseCart(jar.get(CART_COOKIE)?.value);
}

async function writeCart(cart: CartData) {
  const jar = await cookies();
  jar.set(CART_COOKIE, serialize(cart), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}

export async function addToCart(formData: FormData) {
  const handle = String(formData.get("handle") ?? "");
  const variantId = String(formData.get("variantId") ?? "");
  const nameToPaint = String(formData.get("nameToPaint") ?? "").trim();
  const quantity = Math.max(1, Number(formData.get("quantity") ?? 1) || 1);
  const intent = String(formData.get("intent") ?? "add");
  const product = getProduct(handle);
  const option1 = String(formData.get("option1") ?? "");
  const option2 = String(formData.get("option2") ?? "");
  const option3 = String(formData.get("option3") ?? "");
  const variant =
    product?.variants.find((v) => {
      if (option1 || option2 || option3) {
        return (
          (!option1 || v.option1 === option1) &&
          (!option2 || v.option2 === option2) &&
          (!option3 || v.option3 === option3)
        );
      }
      return String(v.id) === variantId;
    }) ?? product?.variants.find((v) => String(v.id) === variantId);
  if (!product || !variant?.available) {
    return;
  }

  const resolvedId = String(variant.id);
  const id = lineId(handle, resolvedId, nameToPaint);
  const cart = await readCart();
  const existing = cart.items.find((item) => item.id === id);
  const line: CartLine = {
    id,
    handle,
    variantId: resolvedId,
    quantity,
    nameToPaint: nameToPaint || undefined,
  };
  const items = existing
    ? cart.items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    : [...cart.items, line];
  await writeCart({ ...cart, items });
  if (intent === "buy") redirect("/checkout");
  redirect("/cart");
}

export async function updateCartQty(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const quantity = Math.max(0, Number(formData.get("quantity") ?? 0) || 0);
  const cart = await readCart();
  const items =
    quantity <= 0
      ? cart.items.filter((item) => item.id !== id)
      : cart.items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        );
  await writeCart({ ...cart, items });
}

export async function removeCartItem(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const cart = await readCart();
  await writeCart({
    ...cart,
    items: cart.items.filter((item) => item.id !== id),
  });
}

export async function applyCoupon(formData: FormData) {
  const coupon = String(formData.get("coupon") ?? "");
  const cart = await readCart();
  await writeCart({ ...cart, coupon });
}

export async function clearCart() {
  await writeCart({ items: [], coupon: "" });
}
