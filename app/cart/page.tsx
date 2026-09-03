import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { applyCoupon, removeCartItem, updateCartQty } from "@/app/actions/cart";
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
      <div className="page-width py-20 text-center">
        <h1 className="section-heading">Your cart is empty</h1>
        <Link href="/collections/all" className="dawn-btn mt-8">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page-width py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="section-heading">Your cart</h1>
        <Link href="/collections/all" className="text-[15px] underline">
          Continue shopping
        </Link>
      </div>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-[#e8ddd4] border-t border-[#e8ddd4]">
          {lines.map((item) => (
            <li key={item.id} className="flex gap-5 py-6">
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
                  className="text-[#2e2a27] hover:underline"
                >
                  {item.productTitle}
                </Link>
                <p className="text-[14px]">{item.variantTitle}</p>
                {item.nameToPaint && (
                  <p className="text-[14px]">Name: {item.nameToPaint}</p>
                )}
                <p className="mt-1 text-[14px]">{formatInr(item.price)}</p>
                <div className="mt-3 flex items-center gap-4">
                  <form action={updateCartQty} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={item.id} />
                    <input
                      name="quantity"
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className="h-10 w-16 border border-[#d4c6b8] bg-white px-2 text-sm"
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
              <p className="text-[15px] text-[#2e2a27]">
                {formatInr(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <aside>
          <h2 className="font-serif text-[22px] text-[#2e2a27]">
            Estimated total
          </h2>
          <div className="mt-4 space-y-2 text-[15px]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatInr(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span>WELCOME10</span>
                <span>-{formatInr(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatInr(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-[#e8ddd4] pt-3 text-[16px] text-[#2e2a27]">
              <span>Total</span>
              <span>{formatInr(total)}</span>
            </div>
          </div>
          <form action={applyCoupon} className="mt-5 flex gap-2">
            <input
              name="coupon"
              defaultValue={coupon}
              placeholder="Discount code"
              className="h-12 min-w-0 flex-1 border border-[#d4c6b8] bg-white px-3 text-sm"
            />
            <button type="submit" className="dawn-btn-secondary !w-auto px-5">
              Apply
            </button>
          </form>
          {coupon && !couponApplied && (
            <p className="mt-2 text-xs">
              Try {site.welcomeCode} for 10% off your first order.
            </p>
          )}
          {couponApplied && (
            <p className="mt-2 text-xs">First-order discount applied.</p>
          )}
          {subtotal < site.freeShippingMin && (
            <p className="mt-3 text-xs">
              Add {formatInr(site.freeShippingMin - subtotal)} more for free
              shipping.
            </p>
          )}
          <Link href="/checkout" className="dawn-btn mt-6 w-full">
            Check out
          </Link>
        </aside>
      </div>
    </div>
  );
}
