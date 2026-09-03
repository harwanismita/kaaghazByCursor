import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { site } from "@/lib/site";

export function SiteHeader({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-50 bg-[#f7f3ee]">
      <div className="bg-[#6b4f3a] text-center text-[13px] leading-snug text-white">
        <p className="px-4 py-2">
          Free shipping on orders over ₹1,199 , 100% Hand-painted in India ·
          Made-to-order
        </p>
        <p className="border-t border-white/15 px-4 py-2">
          Use code WELCOME10 for 10% off your first order
        </p>
      </div>
      <div className="border-b border-[#ece4db]">
        <div className="page-width flex flex-wrap items-center gap-x-4 gap-y-2 py-2 md:py-3">
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
              <div className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-[#f7f3ee] p-6">
                <p className="mb-6 font-serif text-2xl">Kaaghaz</p>
                <nav className="flex flex-col gap-4 text-[15px]">
                  {site.nav.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </details>

          <Link href="/" className="shrink-0">
            <Image
              src={site.logo}
              alt={site.name}
              width={140}
              height={140}
              className="h-[88px] w-[88px] object-contain md:h-[140px] md:w-[140px]"
              priority
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-1 text-[14px] lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap py-1 hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Link href="/search" className="p-2" aria-label="Search">
              <Search className="h-5 w-5" strokeWidth={1.6} />
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative p-2">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
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
