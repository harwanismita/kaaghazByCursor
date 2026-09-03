import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="page-width max-w-xl py-16">
      <h1 className="section-heading">Account</h1>
      <p className="mt-5 leading-7">
        This free site does not use customer logins. Browse the shop, add
        pieces to your cart, and send the order on WhatsApp — Smita confirms
        payment with you directly.
      </p>
      <Link href="/cart" className="dawn-btn mt-8">
        View cart
      </Link>
    </div>
  );
}
