import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { site } from "@/lib/site";

const announcements = [
  "Free shipping on orders over ₹1,199 · 100% Hand-painted in India · Made-to-order",
  "Use code WELCOME10 for 10% off your first order",
];

export function SiteHeader({
  cartCount,
  pathname = "/",
}: {
  cartCount: number;
  pathname?: string;
}) {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#6b4f3a] text-white">
        <p className="px-4 py-2 text-center text-[13px] leading-snug">
          {announcements[0]}
        </p>
        <p className="hidden border-t border-white/10 px-4 py-1.5 text-center text-[13px] sm:block">
          {announcements[1]}
        </p>
      </div>
      <div className="border-b border-[#e8ddd4] bg-[#f7f3ee]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <details className="group lg:hidden">
            <summary
              className="relative z-[90] cursor-pointer list-none p-2 [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6 group-open:hidden" />
              <X className="hidden h-6 w-6 group-open:block" />
            </summary>
            <div className="fixed inset-0 z-[80]">
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-[#f7f3ee] p-5 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-serif text-xl">Kaaghaz</span>
                  <span className="p-2 text-sm text-[#6b4f3a]">
                    <X className="pointer-events-none h-6 w-6" />
                  </span>
                </div>
                <form action="/search" className="mb-6">
                  <input
                    name="q"
                    placeholder="Search the studio"
                    className="h-11 w-full border border-[#d4c6b8] bg-white px-3 text-sm"
                  />
                </form>
                <nav className="flex flex-col gap-4 text-base">
                  <Link href="/">Home</Link>
                  {site.nav.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </details>
          <Link href="/" className="flex items-center">
            <Image
              src={site.logo}
              alt={site.name}
              width={120}
              height={120}
              className="h-16 w-16 object-contain md:h-20 md:w-20"
              priority
            />
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-5 text-[13px] lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap hover:underline ${
                  pathname === item.href ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <form action="/search" className="hidden md:block">
              <label className="sr-only" htmlFor="header-search">
                Search
              </label>
              <div className="flex items-center gap-1">
                <Search className="h-4 w-4 opacity-60" />
                <input
                  id="header-search"
                  name="q"
                  placeholder="Search"
                  className="h-9 w-36 border border-[#d4c6b8] bg-white px-2 text-sm"
                />
              </div>
            </form>
            <Link href="/search" className="p-2 md:hidden" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative p-2">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6b4f3a] px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
