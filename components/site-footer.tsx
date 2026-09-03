import Link from "next/link";
import { site } from "@/lib/site";

const quickLinks = [
  { href: "/pages/about", label: "About Kaaghaz" },
  { href: "/pages/contact", label: "Custom Orders" },
  { href: "/pages/faq", label: "FAQ" },
  { href: "/search", label: "Search" },
];

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-[#ece4db] bg-[#f7f3ee]">
      <div className="page-width grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr]">
        <div>
          <h2 className="font-serif text-[22px]">Quick links</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-[22px]">Reach us</h2>
          <p className="mt-4 text-[15px] leading-7">
            ✉ {site.email}
            <br />
            📷 {site.instagramHandle}
            <br />
            📍 Hand-painted in India
          </p>
          <p className="mt-4 text-[15px] leading-7">
            {site.emailAlt}
            <br />
            Phone no- {site.phone}
          </p>
        </div>
        <div>
          <h2 className="font-serif text-[22px] leading-snug">
            Subscribe to our emails (Join us — early access to new pieces,
            festival drops, founder notes.)
          </h2>
          <form action={`mailto:${site.email}`} method="get" className="mt-5">
            <div className="flex max-w-md border border-[#d4c6b8] bg-white">
              <input
                type="email"
                name="body"
                required
                placeholder="Email"
                className="h-12 min-w-0 flex-1 px-3 text-sm outline-none"
              />
              <button
                type="submit"
                className="px-4 text-[#6b4f3a]"
                aria-label="Subscribe"
              >
                →
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-[#ece4db] px-4 py-4 text-center text-xs text-[#6b4f3a]">
        © {new Date().getFullYear()}, Kaaghaz - The art studio
      </div>
    </footer>
  );
}
