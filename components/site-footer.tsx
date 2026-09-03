import Link from "next/link";
import { site } from "@/lib/site";

const shopLinks = [
  { href: "/collections/kids-nameplates", label: "Kids Nameplates" },
  { href: "/collections/home-nameplates", label: "Home Nameplates" },
  { href: "/collections/pinewood-nameplates-for-kids", label: "Pinewood Nameplates" },
  { href: "/collections/pet-nameplates", label: "Pet Nameplates" },
  { href: "/collections/free-standing-name-signs", label: "Free-Standing Signs" },
  { href: "/collections/return-favors", label: "Return Gifts" },
  { href: "/collections/hinglish-magnets-hand-painted", label: "Hinglish Magnets" },
  { href: "/collections/all", label: "All products" },
];

const helpLinks = [
  { href: "/pages/about", label: "About Kaaghaz" },
  { href: "/pages/contact", label: "Custom Orders" },
  { href: "/pages/faq", label: "FAQ" },
  { href: "/policies/shipping-policy", label: "Shipping" },
  { href: "/policies/refund-policy", label: "Refunds" },
  { href: "/policies/privacy-policy", label: "Privacy" },
  { href: "/policies/terms-of-service", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#e8ddd4] bg-[#e8ddd4]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-2xl">Reach us</h2>
          <p className="mt-3 text-sm leading-7">
            ✉ {site.email}
            <br />
            📷{" "}
            <a
              className="underline underline-offset-4"
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
            >
              {site.instagramHandle}
            </a>
            <br />
            📍 Hand-painted in India
          </p>
          <p className="mt-3 text-sm leading-7">
            {site.emailAlt}
            <br />
            Phone — {site.phone}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Studio</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {helpLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[#d4c6b8] px-4 py-4 text-center text-xs text-[#6b4f3a]">
        © {new Date().getFullYear()} Kaaghaz · The Art Studio. Hand-painted in India.
      </div>
    </footer>
  );
}
