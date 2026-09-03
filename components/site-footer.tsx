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
    <footer className="border-t border-[#ece4db] bg-[#f7f3ee]">
      <div className="page-width grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.5fr]">
        <div>
          <h2 className="font-serif text-[22px]">Quick links</h2>
          <ul className="mt-5 space-y-2.5 text-[15px]">
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
          <p className="mt-5 text-[15px] leading-7">
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
      <div className="border-t border-[#ece4db]">
        <div className="page-width flex flex-col items-center justify-between gap-4 py-4 text-xs text-[#6b4f3a] sm:flex-row">
          <p>© {new Date().getFullYear()}, Kaaghaz - The art studio</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/KaaghazArtStudio/"
              aria-label="Facebook"
              className="hover:text-[#2e2a27]"
            >
              Facebook
            </a>
            <a
              href={site.instagram}
              aria-label="Instagram"
              className="hover:text-[#2e2a27]"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@kaaghaz-theartstudio5202"
              aria-label="YouTube"
              className="hover:text-[#2e2a27]"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
