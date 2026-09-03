import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund policy" };

export default function RefundPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-7">
      <h1 className="text-4xl">Refund policy</h1>
      <p>
        Every Kaaghaz piece is hand-painted to order. Because of that, we
        cannot accept returns for a change of mind, a spelling we painted
        exactly as you sent, or a colour you approved.
      </p>
      <h2 className="text-2xl">When we will make it right</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>The piece arrives broken or with transit damage.</li>
        <li>We painted a name different from the one you confirmed.</li>
        <li>The item is clearly not the theme you ordered.</li>
      </ul>
      <h2 className="text-2xl">How to raise a claim</h2>
      <p>
        Message {site.email} or WhatsApp {site.phone} within 48 hours of
        delivery. Please include:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Your order details</li>
        <li>A short unboxing video showing the packing and the damage</li>
        <li>Clear photos of the piece</li>
      </ul>
      <p>
        We will repair, repaint, or refund that piece after we review the
        video. Refunds, when approved, go back to the same UPI or bank
        account you paid from.
      </p>
    </article>
  );
}
