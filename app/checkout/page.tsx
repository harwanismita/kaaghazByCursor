import Link from "next/link";
import { cookies } from "next/headers";
import { CheckoutForm } from "@/components/checkout-form";
import { Button } from "@/components/ui/button";
import { CART_COOKIE, parseCart } from "@/lib/cart-data";
import { cartTotals } from "@/lib/totals";

export default async function CheckoutPage() {
  const jar = await cookies();
  const cart = parseCart(jar.get(CART_COOKIE)?.value);
  const totals = cartTotals(cart);

  if (totals.lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-4xl">Nothing to check out</h1>
        <p className="mt-4 text-[#4a403a]">Add a piece to your cart first.</p>
        <Button asChild className="mt-8">
          <Link href="/collections/all">Browse the studio</Link>
        </Button>
      </div>
    );
  }

  return (
    <CheckoutForm
      lines={totals.lines}
      subtotal={totals.subtotal}
      discount={totals.discount}
      shipping={totals.shipping}
      total={totals.total}
      couponApplied={totals.couponApplied}
    />
  );
}
