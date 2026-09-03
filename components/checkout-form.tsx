"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { clearCart } from "@/app/actions/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";
import { formatInr } from "@/lib/utils";

type CheckoutLine = {
  productTitle: string;
  variantTitle: string;
  nameToPaint?: string;
  quantity: number;
  price: number;
};

export function CheckoutForm({
  lines,
  subtotal,
  discount,
  shipping,
  total,
  couponApplied,
}: {
  lines: CheckoutLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponApplied: boolean;
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  function buildMessage() {
    const rows = [
      `New Kaaghaz order from ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      "",
      "Items:",
      ...lines.map(
        (i) =>
          `• ${i.productTitle} (${i.variantTitle}${
            i.nameToPaint ? `, name: ${i.nameToPaint}` : ""
          }) × ${i.quantity} — ${formatInr(i.price * i.quantity)}`,
      ),
      "",
      `Subtotal: ${formatInr(subtotal)}`,
      couponApplied ? `Discount WELCOME10: -${formatInr(discount)}` : "",
      `Shipping: ${shipping === 0 ? "Free" : formatInr(shipping)}`,
      `Total: ${formatInr(total)}`,
      "",
      "Ship to:",
      form.address,
      `${form.city}, ${form.state} ${form.pincode}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean);
    return rows.join("\n");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(buildMessage());
    window.open(
      `https://wa.me/91${site.phone}?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
    await clearCart();
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-4xl">Order sent on WhatsApp</h1>
        <p className="mt-4 leading-7 text-[#4a403a]">
          WhatsApp should have opened with your order for Smita. If it did not,
          message {site.phone} or email {site.email}. She will confirm the
          painting details and share a UPI / payment link.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to the studio</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl">Checkout</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[#4a403a]">
        Your order opens on WhatsApp to {site.phone}. Smita confirms the piece,
        then you pay by UPI, card, or bank transfer — without the ₹2,000/month
        store bill.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              required
              className="mt-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">WhatsApp number</Label>
            <Input
              id="phone"
              required
              className="mt-2"
              placeholder="10-digit mobile"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="address">Shipping address</Label>
          <Textarea
            id="address"
            required
            className="mt-2"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              required
              className="mt-2"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              required
              className="mt-2"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="pincode">PIN code</Label>
            <Input
              id="pincode"
              required
              className="mt-2"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="notes">Notes for Smita</Label>
          <Textarea
            id="notes"
            className="mt-2"
            placeholder="Colours, spelling, gift wrap, delivery date…"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
        <div className="border border-[#e8ddd4] bg-white p-4 text-sm">
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
          <div className="mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatInr(total)}</span>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Send order on WhatsApp
        </Button>
      </form>
    </div>
  );
}
