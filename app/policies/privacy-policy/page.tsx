import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-7">
      <h1 className="text-4xl">Privacy policy</h1>
      <p>
        Kaaghaz The Art Studio collects only what we need to paint and ship
        your order.
      </p>
      <h2 className="text-2xl">What we collect</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Name, phone, email, and shipping address when you order</li>
        <li>The personalisation text you want painted</li>
        <li>Messages you send on WhatsApp, Instagram, or email</li>
      </ul>
      <h2 className="text-2xl">How we use it</h2>
      <p>
        We use your details to confirm the design, take payment, pack the
        parcel, and answer your questions. We do not sell your information.
      </p>
      <h2 className="text-2xl">Where it lives</h2>
      <p>
        Orders are sent to Smita on WhatsApp. Cart contents stay in your
        browser until you check out. Product photos are served from the
        original studio image host.
      </p>
      <h2 className="text-2xl">Contact</h2>
      <p>
        Questions about your data: {site.email} or {site.phone}.
      </p>
    </article>
  );
}
