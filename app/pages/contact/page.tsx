"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    kind: "Custom nameplate",
    details: "",
    qty: "1",
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      [
        `Custom order enquiry from ${form.name}`,
        `Phone: ${form.phone}`,
        form.email ? `Email: ${form.email}` : "",
        `Type: ${form.kind}`,
        `Quantity: ${form.qty}`,
        "",
        form.details,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.open(
      `https://wa.me/91${site.phone}?text=${msg}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <div className="page-width max-w-3xl py-12">
      <h1 className="section-heading">Custom Orders</h1>
      <p className="mt-4 leading-7 text-[#4a403a]">
        Have something specific in mind? We hand-paint custom nameplates,
        signs, and bulk orders to your brief.
      </p>

      <h2 className="mt-10 text-3xl">What we customise</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        <li>Personalised nameplates — your name, theme and colours</li>
        <li>Free-standing name signs — kids&apos; rooms, photo booths, events</li>
        <li>Return gifts and party favours — bulk pricing for 5+ pieces</li>
        <li>Bulk and corporate orders — weddings, baby showers, office gifting</li>
      </ul>

      <h2 className="mt-10 text-3xl">How it works</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">
        <li>Tell us what you want — fill the form, WhatsApp, or email.</li>
        <li>We confirm details and pricing within 24 hours.</li>
        <li>
          Production takes 5–7 days for custom orders. Bulk orders may need
          longer — we will tell you upfront.
        </li>
        <li>
          We ship via tracked courier across India. Bulk orders are charged
          actual courier cost — we share the exact amount before processing.
        </li>
      </ol>

      <h2 className="mt-10 text-3xl">Bulk pricing</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        <li>5+ pieces: 10% off</li>
        <li>10+ pieces: 15% off</li>
        <li>Custom packaging available on request</li>
      </ul>

      {sent ? (
        <p className="mt-10 border border-[#e8ddd4] bg-white p-5 leading-7">
          WhatsApp should be open with your brief. If not, message {site.phone}{" "}
          or email {site.email}.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <div>
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              required
              className="mt-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">WhatsApp</Label>
              <Input
                id="phone"
                required
                className="mt-2"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
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
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="kind">What do you need?</Label>
              <Input
                id="kind"
                className="mt-2"
                value={form.kind}
                onChange={(e) => setForm({ ...form, kind: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="qty">Quantity</Label>
              <Input
                id="qty"
                className="mt-2"
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="details">Details</Label>
            <Textarea
              id="details"
              required
              className="mt-2"
              placeholder="Names, theme, colours, date you need it by…"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
            />
          </div>
          <Button type="submit">Send on WhatsApp</Button>
        </form>
      )}
    </div>
  );
}
