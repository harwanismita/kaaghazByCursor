import { getProduct } from "@/lib/catalog";

export type CartLine = {
  id: string;
  handle: string;
  variantId: string;
  quantity: number;
  nameToPaint?: string;
};

export type CartData = {
  items: CartLine[];
  coupon: string;
};

export const CART_COOKIE = "kaaghaz_cart";
export const emptyCart = (): CartData => ({ items: [], coupon: "" });

export function parseCart(raw: string | undefined): CartData {
  if (!raw) return emptyCart();
  try {
    const parsed = JSON.parse(raw) as CartData;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      coupon: typeof parsed.coupon === "string" ? parsed.coupon : "",
    };
  } catch {
    return emptyCart();
  }
}

export function lineId(handle: string, variantId: string, nameToPaint?: string) {
  return `${handle}::${variantId}::${(nameToPaint ?? "").trim().toLowerCase()}`;
}

export function resolveLine(line: CartLine) {
  const product = getProduct(line.handle);
  const variant =
    product?.variants.find((v) => String(v.id) === String(line.variantId)) ??
    product?.variants[0];
  if (!product || !variant) return null;
  return {
    ...line,
    productTitle: product.title,
    variantTitle:
      variant.title === "Default Title" ? "Standard" : variant.title,
    price: variant.price,
    image: product.images[0]?.src ?? null,
    productHandle: product.handle,
  };
}
