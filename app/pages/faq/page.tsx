import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  {
    q: "How long does a nameplate take?",
    a: "Most nameplates are painted and packed in 5–7 days. Magnets usually ship within 2 days. We then send them by tracked courier across India.",
  },
  {
    q: "Can you paint a specific name and theme?",
    a: "Yes. Add the name on the product page, or send a custom order. Spellings, colours, and themes are confirmed on WhatsApp before painting starts.",
  },
  {
    q: "Do you ship outside India?",
    a: "Not right now. We ship only within India.",
  },
  {
    q: "When is shipping free?",
    a: `Orders of ₹${site.freeShippingMin.toLocaleString("en-IN")} and above ship free. Below that, a flat ₹${site.shippingFee} courier fee is added at checkout.`,
  },
  {
    q: "How do I pay without Shopify?",
    a: "Checkout opens WhatsApp with your order. Smita confirms the piece and shares UPI, card, or bank-transfer details. You pay only for the art and courier — not a monthly website plan.",
  },
  {
    q: "What if something arrives damaged?",
    a: "Message us the same day with an unboxing video. We will repair, repaint, or refund that piece.",
  },
  {
    q: "Is WELCOME10 still valid?",
    a: "Yes. Enter WELCOME10 in the cart for 10% off your first order.",
  },
];

export default function FaqPage() {
  return (
    <div className="page-width max-w-3xl py-12">
      <h1 className="section-heading">FAQ</h1>
      <dl className="mt-10 space-y-8">
        {faqs.map((f) => (
          <div key={f.q}>
            <dt className="font-serif text-2xl">{f.q}</dt>
            <dd className="mt-2 leading-7 text-[#4a403a]">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
