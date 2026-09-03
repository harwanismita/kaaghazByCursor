import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  featuredCollectionCards,
  getProduct,
  site,
} from "@/lib/catalog";

const trust = [
  {
    title: "Made-to-order",
    text: "Hand-painted just for you",
    image: "https://studiokaaghaz.com/cdn/shop/files/pallte.png?v=1778392639&width=200",
  },
  {
    title: "Pan-India shipping",
    text: "Tracked courier delivery",
    image: "https://studiokaaghaz.com/cdn/shop/files/truck.png?v=1778392589&width=200",
  },
  {
    title: "Custom orders welcome",
    text: "Names, themes, colours — your call",
    image: "https://studiokaaghaz.com/cdn/shop/files/pencil1.png?v=1778392589&width=200",
  },
  {
    title: "Pay on WhatsApp",
    text: "UPI · Cards · Bank transfer",
    image: "https://studiokaaghaz.com/cdn/shop/files/locks.png?v=1778392589&width=200",
  },
];

export default function HomePage() {
  const newLaunch = site.homeNewLaunch
    .map((h) => getProduct(h))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const loved = site.homeLoved
    .map((h) => getProduct(h))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const categories = featuredCollectionCards();

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div className="relative aspect-square overflow-hidden bg-[#e8ddd4]">
          <Image
            src={site.heroImage}
            alt="Hand-painted Kaaghaz nameplates"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl leading-tight md:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-5 text-[17px] leading-7 text-[#4a403a]">
            {site.subhead}
          </p>
          <Button asChild className="mt-8">
            <Link href="/collections/pinewood-nameplates-for-kids">
              Shop pinewood
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl">New Launch: Pinewood Nameplates ✨</h2>
          <Link
            href="/collections/pinewood-nameplates-for-kids"
            className="hidden text-sm underline underline-offset-4 md:inline"
          >
            View all
          </Link>
        </div>
        <p className="mb-8 max-w-2xl text-[#4a403a]">
          Hand-painted on premium pinewood, made for your little one’s space.
        </p>
        <ProductGrid products={newLaunch} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-8 text-3xl md:text-4xl">Most Loved !</h2>
        <ProductGrid products={loved} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-8 text-3xl md:text-4xl">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.handle}
              href={`/collections/${c.handle}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden bg-[#e8ddd4]">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />
                )}
              </div>
              <h3 className="mt-3 text-lg underline-offset-4 group-hover:underline">
                {c.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-[#4a403a]">
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden bg-[#e8ddd4] md:aspect-[4/5]">
          <Image
            src={site.founderImage}
            alt="Smita painting in the studio"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="text-center md:px-6">
          <h2 className="text-4xl">Painted by hand. By me</h2>
          <p className="mt-5 text-[17px] leading-8">
            Hi, I&apos;m <strong>Smita</strong>. I paint every piece you see
            here, in my studio, by hand. What started as painting on paper
            became painting on wood — magnets, nameplates, signs, every one of
            them made for someone in particular.
          </p>
          <Button asChild className="mt-7">
            <Link href="/pages/about">Read the full story</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#e8ddd4]">
          <Image
            src={site.customImage}
            alt="Custom nameplate work on the studio table"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="text-center md:px-6">
          <h2 className="text-4xl">Need a name on it? Bulk for an event?</h2>
          <p className="mt-5 text-[17px] leading-8">
            We hand-paint custom nameplates, bulk return gifts, and wedding
            favors. Tell us what you need — we&apos;ll quote within 24 hours.
          </p>
          <Button asChild className="mt-7">
            <Link href="/pages/contact">Start a custom order</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
        {trust.map((t) => (
          <div key={t.title} className="text-center">
            <div className="mx-auto relative h-20 w-20 overflow-hidden rounded-full">
              <Image src={t.image} alt="" fill className="object-cover" />
            </div>
            <h3 className="mt-3 font-sans text-sm font-semibold">{t.title}</h3>
            <p className="mt-1 text-sm text-[#4a403a]">{t.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
