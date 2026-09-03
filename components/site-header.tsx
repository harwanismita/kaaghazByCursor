"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { site } from "@/lib/site";

const announcements = [
  "Free shipping on orders over ₹1,199 · 100% Hand-painted in India · Made-to-order",
  "Use code WELCOME10 for 10% off your first order",
];

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const openedAt = useRef(0);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setSearchOpen(false);
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  const menu =
    mounted &&
    open &&
    createPortal(
      <div className="fixed inset-0 z-[80] lg:hidden">
        <button
          type="button"
          className="absolute inset-0 bg-black/40"
          aria-label="Close menu"
          onClick={() => {
            if (Date.now() - openedAt.current < 300) return;
            setOpen(false);
          }}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-[#f7f3ee] p-5 shadow-xl"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-serif text-xl">Kaaghaz</span>
            <button
              type="button"
              className="p-2"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={onSearch} className="mb-6 flex gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the studio"
            />
          </form>
          <nav className="flex flex-col gap-4 text-base">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>,
      document.body,
    );

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
          <button
            type="button"
            className="relative z-[90] p-2 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() =>
              setOpen((value) => {
                const next = !value;
                if (next) openedAt.current = Date.now();
                return next;
              })
            }
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
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
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/cart" aria-label="Cart" className="relative p-2">
              <ShoppingBag className="h-5 w-5" />
              <span
                className={`absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6b4f3a] px-1 text-[10px] text-white ${
                  count === 0 ? "hidden" : ""
                }`}
              >
                {count}
              </span>
            </Link>
          </div>
        </div>
        {searchOpen && (
          <form
            onSubmit={onSearch}
            className="mx-auto flex max-w-6xl gap-2 px-4 pb-4"
          >
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search nameplates, magnets, gifts…"
              autoFocus
            />
            <Button type="submit">Search</Button>
          </form>
        )}
      </div>
      {menu}
    </header>
  );
}
