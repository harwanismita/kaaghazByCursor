import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-7">
      <h1 className="text-4xl">Terms of service</h1>
      <p>
        By ordering from Kaaghaz The Art Studio you agree to these terms.
      </p>
      <h2 className="text-2xl">Handmade work</h2>
      <p>
        Each piece is painted by hand. Small variations in brushwork, wood
        grain, and colour are part of the work, not defects.
      </p>
      <h2 className="text-2xl">Orders and payment</h2>
      <p>
        An order is confirmed when Smita accepts it on WhatsApp and payment
        is received. Prices are in Indian rupees.
      </p>
      <h2 className="text-2xl">Personalisation</h2>
      <p>
        You are responsible for the spelling and details you send. We paint
        what you confirm.
      </p>
      <h2 className="text-2xl">Intellectual property</h2>
      <p>
        Photographs and product designs on this site belong to Kaaghaz unless
        noted otherwise. Please do not copy the listings for another shop.
      </p>
      <h2 className="text-2xl">Contact</h2>
      <p>
        {site.email} · {site.phone}
      </p>
    </article>
  );
}
