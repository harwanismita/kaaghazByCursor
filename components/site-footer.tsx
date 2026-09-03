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
    <footer className="mt-9 border-t border-[#ece4db] bg-[#f7f3ee]">
      <div className="page-width grid gap-10 py-9 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.5fr]">
        <div>
          <h2 className="font-serif text-[18px]">Quick links</h2>
          <ul className="mt-5 space-y-2.5 text-[16px]">
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
          <h2 className="font-serif text-[18px]">Reach us</h2>
          <p className="mt-5 text-[16px] leading-7">
            ✉ {site.email}
            <br />
            📷 {site.instagramHandle}
            <br />
            📍 Hand-painted in India
          </p>
          <p className="mt-4 text-[16px] leading-7">
            {site.emailAlt}
            <br />
            Phone no- {site.phone}
          </p>
        </div>
        <div>
          <h2 className="font-serif text-[18px] leading-snug">
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
        <div className="page-width flex flex-col items-center justify-between gap-4 py-5 text-[13px] sm:flex-row">
          <div>
            <p>© {new Date().getFullYear()}, Kaaghaz - The art studio</p>
            <p className="mt-1">Payment methods · UPI · Cards · Net Banking</p>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://www.facebook.com/KaaghazArtStudio/" aria-label="Kaaghaz on Facebook">
              <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.7a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.96.18-.24.5-.36.94-.36h1.36V3.35a15.85 15.85 0 00-1.94-.1c-1.02 0-1.84.3-2.46.9-.62.6-.94 1.44-.94 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.7.2-.18.42-.28.7-.28h15.44z"
                />
              </svg>
            </a>
            <a href={site.instagram} aria-label="Kaaghaz on Instagram">
              <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.16.7.35.96.61s.45.55.61.96c.12.31.26.77.3 1.63.04.92.05 1.2.05 3.54s-.01 2.62-.05 3.54c-.04.86-.18 1.32-.3 1.63-.16.41-.35.7-.61.96s-.55.45-.96.61c-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62-.01-3.54-.05c-.86-.04-1.32-.18-1.63-.3a2.6 2.6 0 01-.96-.61 2.6 2.6 0 01-.61-.96c-.12-.31-.26-.77-.3-1.63-.04-.92-.05-1.2-.05-3.54s.01-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.61-.96s.55-.45.96-.61c.31-.12.77-.26 1.63-.3.92-.04 1.2-.05 3.54-.05m0-1.58C6.39 0 6.09.01 5.16.05 4.23.09 3.6.24 3.04.46c-.58.22-1.07.52-1.56 1.01C.99 1.96.69 2.46.46 3.04.24 3.6.09 4.23.05 5.16.01 6.09 0 6.39 0 8.77s.01 2.68.05 3.61c.04.93.19 1.56.41 2.12.22.58.52 1.07 1.01 1.56.49.49.98.79 1.56 1.01.56.22 1.19.37 2.12.41.93.04 1.23.05 3.61.05s2.68-.01 3.61-.05c.93-.04 1.56-.19 2.12-.41.58-.22 1.07-.52 1.56-1.01.49-.49.79-.98 1.01-1.56.22-.56.37-1.19.41-2.12.04-.93.05-1.23.05-3.61s-.01-2.68-.05-3.61c-.04-.93-.19-1.56-.41-2.12a4.17 4.17 0 00-1.01-1.56A4.17 4.17 0 0014.5.46c-.56-.22-1.19-.37-2.12-.41C11.45.01 11.15 0 8.77 0z"
                />
                <path
                  fill="currentColor"
                  d="M8.77 4.28a4.49 4.49 0 100 8.98 4.49 4.49 0 000-8.98zm0 7.4a2.91 2.91 0 110-5.82 2.91 2.91 0 010 5.82zM14.5 4.1a1.05 1.05 0 11-2.1 0 1.05 1.05 0 012.1 0z"
                />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@kaaghaz-theartstudio5202"
              aria-label="Kaaghaz on YouTube"
            >
              <svg viewBox="0 0 20 14" className="h-3.5 w-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M19.58 2.2A2.5 2.5 0 0017.83.44C16.27 0 10 0 10 0S3.73 0 2.17.44A2.5 2.5 0 00.42 2.2 26.3 26.3 0 000 7a26.3 26.3 0 00.42 4.8 2.5 2.5 0 001.75 1.76C3.73 14 10 14 10 14s6.27 0 7.83-.44a2.5 2.5 0 001.75-1.76A26.3 26.3 0 0020 7a26.3 26.3 0 00-.42-4.8zM8 10V4l5.2 3L8 10z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
