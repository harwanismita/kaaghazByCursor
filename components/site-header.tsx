import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 19" className="h-[18px] w-[18px]" fill="none">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.71l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 19" className="h-[18px] w-[18px]" fill="none">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zM5.32 10.22A5.5 5.5 0 00.5 15.5v.75c0 .41.34.75.75.75h15.5a.75.75 0 00.75-.75v-.75a5.5 5.5 0 00-4.82-5.28.5.5 0 00-.13.99 4.5 4.5 0 013.95 4.29H2.25a4.5 4.5 0 013.95-4.29.5.5 0 10-.13-.99 5.47 5.47 0 00-.75.07z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className="h-[22px] w-[22px]" fill="none">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33L28.4 11.8h-3.16v1.25a4.75 4.75 0 11-9.5 0V11.8zm8.5 0v1.25a3.25 3.25 0 11-6.5 0V11.8h6.5zm-9.5-1.5h10.5v.25a4.75 4.75 0 119.5 0h.96l.78 11.78A6.5 6.5 0 0124.2 30.25h-7.38a6.5 6.5 0 01-6.49-6.92L11.1 10.55h.96a4.75 4.75 0 019.5 0v-.25h-6.81z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 16" className="h-5 w-5" fill="none">
      <path
        fill="currentColor"
        d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 17" className="h-5 w-5" fill="none">
      <path
        fill="currentColor"
        d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.5.5 0 00.693-.721L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
      />
    </svg>
  );
}

export function SiteHeader({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-50 bg-[#f7f3ee]">
      <div className="bg-[#6b4f3a] px-5 py-[10px] text-center text-[13px] leading-snug text-white">
        Free shipping on orders over ₹1,199          , 100% Hand-painted in
        India · Made-to-order
      </div>
      <div className="bg-[#6b4f3a] px-5 py-[10px] text-center text-[13px] leading-snug text-white">
        Use code WELCOME10 for 10% off your first order
      </div>

      <div className="border-b border-[#e8ddd4] bg-[#f7f3ee]">
        <div className="page-width py-[10px] lg:py-5">
          <div className="grid grid-cols-[44px_minmax(0,1fr)_120px] items-center lg:grid-cols-[1fr_auto_1fr]">
            <div>
            <details className="group relative lg:hidden">
              <summary
                className="flex h-11 w-11 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
                aria-label="Menu"
              >
                <span className="group-open:hidden">
                  <MenuIcon />
                </span>
                <span className="hidden group-open:block">
                  <CloseIcon />
                </span>
              </summary>
              <div className="fixed inset-0 z-[80]">
                <div className="absolute inset-0 bg-black/40" />
                <nav className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-[#f7f3ee] px-8 py-10 text-[16px] text-[#2e2a27]">
                  {site.nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="border-b border-[#ece4db] py-3"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </details>
            </div>

            <Link href="/" className="justify-self-center">
              <Image
                src={site.logo}
                alt={site.name}
                width={140}
                height={140}
                className="h-[140px] w-[140px] object-contain"
                priority
              />
            </Link>

            <div className="flex items-center justify-end gap-0.5 text-[#2e2a27]">
              <details className="group relative">
                <summary
                  className="flex h-11 w-11 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
                  aria-label="Search"
                >
                  <SearchIcon />
                </summary>
                <form
                  action="/search"
                  className="absolute right-0 top-full z-[70] w-[min(92vw,22rem)] border border-[#e8ddd4] bg-[#f7f3ee] p-3 shadow-sm"
                >
                  <label className="sr-only" htmlFor="header-search">
                    Search
                  </label>
                  <input
                    id="header-search"
                    type="search"
                    name="q"
                    placeholder="Search"
                    className="h-11 w-full border border-[#d4c6b8] bg-white px-3 text-sm outline-none"
                  />
                </form>
              </details>
              <Link
                href="/account"
                aria-label="Account"
                className="hidden h-11 w-11 items-center justify-center lg:flex"
              >
                <AccountIcon />
              </Link>
              <Link
                href="/cart"
                aria-label="Cart"
                className="relative flex h-11 w-11 items-center justify-center"
              >
                <BagIcon />
                {cartCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6b4f3a] px-1 text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <nav className="hidden flex-wrap items-center justify-center pt-1 text-[18px] text-[#2e2a27]/75 lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-8 py-[11px] hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
