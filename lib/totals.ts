import { resolveLine, type CartData } from "@/lib/cart-data";
import { site } from "@/lib/site";

export function cartTotals(cart: CartData) {
  const lines = cart.items
    .map(resolveLine)
    .filter((line): line is NonNullable<typeof line> => Boolean(line));
  const count = lines.reduce((n, line) => n + line.quantity, 0);
  const subtotal = lines.reduce((n, line) => n + line.price * line.quantity, 0);
  const couponApplied =
    cart.coupon.trim().toUpperCase() === site.welcomeCode && subtotal > 0;
  const discount = couponApplied
    ? Math.round(subtotal * site.welcomeDiscount)
    : 0;
  const afterDiscount = subtotal - discount;
  const shipping =
    afterDiscount === 0 || afterDiscount >= site.freeShippingMin
      ? 0
      : site.shippingFee;
  return {
    lines,
    count,
    subtotal,
    discount,
    shipping,
    total: afterDiscount + shipping,
    couponApplied,
    coupon: cart.coupon,
  };
}
