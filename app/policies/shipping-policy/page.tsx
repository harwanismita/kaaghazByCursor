import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Shipping policy" };

export default function ShippingPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-7">
      <h1 className="text-4xl">Shipping policy</h1>
      <p>
        Thank you for choosing Kaaghaz The Art Studio. Please read this before
        you place an order.
      </p>
      <h2 className="text-2xl">1. Order processing</h2>
      <p>
        Allow up to 10 working days for painting and packing. Nameplates are
        made to order; magnets are usually faster.
      </p>
      <h2 className="text-2xl">2. Shipping method</h2>
      <p>
        We ship only within India, by tracked Indian Post or courier. We do
        not offer international shipping.
      </p>
      <h2 className="text-2xl">3. Shipping costs</h2>
      <p>
        Orders of ₹{site.freeShippingMin.toLocaleString("en-IN")} and above
        ship free. Below that, a flat ₹{site.shippingFee} fee is added at
        checkout. Bulk orders may be charged actual courier cost — we share
        the amount before you pay.
      </p>
      <h2 className="text-2xl">4. Tracking</h2>
      <p>
        Once a parcel leaves the studio, we send the tracking number on
        WhatsApp or email.
      </p>
      <h2 className="text-2xl">5. Delivery time</h2>
      <p>
        Transit time depends on your city and the courier. Weather and
        logistics delays are outside our control.
      </p>
      <h2 className="text-2xl">6. Damaged products</h2>
      <p>
        If a piece arrives damaged, follow the refund policy and share an
        unboxing video so we can make it right.
      </p>
      <h2 className="text-2xl">7. Address accuracy</h2>
      <p>
        Please double-check the shipping address. We cannot be responsible
        for delays caused by an incomplete or incorrect address. Write to{" "}
        {site.email} or WhatsApp {site.phone} if you need to change it before
        the parcel leaves.
      </p>
    </article>
  );
}
