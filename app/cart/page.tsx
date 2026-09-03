import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { applyCoupon, removeCartItem, updateCartQty } from "@/app/actions/cart";
import { Button } from "@/components/ui/button";
import { CART_COOKIE, parseCart } from "@/lib/cart-data";
import { site } from "@/lib/site";
import { cartTotals } from "@/lib/totals";
import { formatInr, shopifyImage } from "@/lib/utils";

export default async function CartPage() {
  const jar = await cookies();
  const cart = parseCart(jar.get(CART_COOKIE)?.value);
  const { lines, subtotal, shipping, discount, total, couponApplied, coupon } =
    cartTotals(cart);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl">Your cart is empty</h1>
        <p className="mt-4 text-[#4a403a]">
          The studio table is clear. Browse nameplates, or tell us what you
          want painted.
        </p>
        <Button asChild className="mt-8">
          <Link href="/collections/all">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl">Your cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-[#e8ddd4]">
          {lines.map((item) => (
            <li key={item.id} className="flex gap-4 py-5">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-[#e8ddd4]">
                {item.image && (
                  <Image
                    src={shopifyImage(item.image, 240)}
                    alt={item.productTitle}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <Link
                  href={`/products/${item.productHandle}`}
                  className="font-medium hover:underline"
                >
                  {item.productTitle}
                </Link>
                <p className="text-sm text-[#6b4f3a]">{item.variantTitle}</p>
                {item.nameToPaint && (
                  <p className="text-sm">Name: {item.nameToPaint}</p>
                )}
                <p className="mt-1 text-sm">{formatInr(item.price)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <form action={updateCartQty} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={item.id} />
                    <input
                      name="quantity"
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className="h-9 w-20 border border-[#d4c6b8] bg-white px-2 text-sm"
                    />
                    <button type="submit" className="text-sm underline">
                      Update
                    </button>
                  </form>
                  <form action={removeCartItem}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" className="text-sm underline">
                      Remove
                    </button>
                  </form>
                </div>
              </div>
              <p className="text-sm font-medium">
                {formatInr(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <aside className="h-fit border border-[#e8ddd4] bg-white p-5">
          <h2 className="font-serif text-2xl">Order note</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatInr(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#6b4f3a]">
                <span>WELCOME10</span>
                <span>-{formatInr(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatInr(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-[#e8ddd4] pt-2 text-base font-semibold">
              <span>Total</span>
              <span>{formatInr(total)}</span>
            </div>
          </div>
          <form action={applyCoupon} className="mt-4">
            <input
              name="coupon"
              defaultValue={coupon}
              placeholder="Discount code"
              className="h-11 w-full border border-[#d4c6b8] bg-white px-3 text-sm"
            />
            <button type="submit" className="mt-2 text-sm underline">
              Apply
            </button>
            {coupon && !couponApplied && (
              <p className="mt-1 text-xs text-red-700">
                Try {site.welcomeCode} for 10% off your first order.
              </p>
            )}
            {couponApplied && (
              <p className="mt-1 text-xs text-[#6b4f3a]">
                First-order discount applied.
              </p>
            )}
          </form>
          {subtotal < site.freeShippingMin && (
            <p className="mt-3 text-xs text-[#6b4f3a]">
              Add {formatInr(site.freeShippingMin - subtotal)} more for free
              shipping.
            </p>
          )}
          <Button asChild className="mt-5 w-full">
            <Link href="/checkout">Checkout on WhatsApp</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
