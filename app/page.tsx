import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product-card";
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
    title: "Secure payments",
    text: "UPI · Cards · Net Banking via Razorpay",
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
      <section className="page-width py-7 md:py-9">
        <div className="grid items-center md:grid-cols-2">
          <div className="relative aspect-square bg-[#f7f3ee]">
            <Image
              src={site.heroImage}
              alt="Hand-painted Kaaghaz nameplates"
              fill
              priority
              className="object-contain"
              sizes="(min-width: 750px) 50vw, 100vw"
            />
          </div>
          <div className="py-8 text-center md:px-12 md:text-left">
            <h2 className="section-heading">
              {site.tagline}
            </h2>
            <div className="mt-6 text-[15px] leading-7">
              <p>
                <br />
                {site.subhead}
                <br />
                <br />
              </p>
            </div>
            <Link href="/collections/kids-nameboards" className="dawn-btn mt-2">
              Customise Yours
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#e8ddd4]">
        <div className="page-width py-9">
          <h2 className="section-heading">
            New Launch: Pinewood Nameplates ✨
          </h2>
          <p className="mt-3 text-[15px]">
            Hand-painted on premium pinewood, made for your little one’s space
          </p>
          <div className="mt-8">
            <ProductGrid products={newLaunch} />
          </div>
        </div>
      </section>

      <section className="page-width py-10">
        <h2 className="section-heading mb-8">Most Loved !</h2>
        <ProductGrid products={loved} />
      </section>

      <section className="page-width py-10">
        <h2 className="section-heading mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-2">
          {categories.map((c) => (
            <Link key={c.handle} href={`/collections/${c.handle}`} className="group">
              <div className="relative aspect-square overflow-hidden bg-[#e8ddd4]">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 750px) 33vw, 50vw"
                  />
                )}
              </div>
              <h3 className="mt-3 text-[16px]">{c.title}</h3>
              <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#4a403a]">
                {c.description}
                <span className="ml-1">→</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-width grid items-start gap-8 py-10 md:grid-cols-2 md:items-center">
        <div className="relative mx-auto aspect-square w-full overflow-hidden bg-[#f7f3ee]">
          <Image
            src={site.founderImage}
            alt="Smita painting in the studio"
            fill
            className="object-cover"
            sizes="(min-width: 750px) 50vw, 100vw"
          />
        </div>
        <div className="text-center md:px-8">
          <h2 className="section-heading">Painted by hand. By me</h2>
          <p className="mt-5 text-[15px] leading-8">
            Hi, I&apos;m <strong>Smita</strong>. I paint every piece you see
            here, in my studio, by hand. What started as painting on paper
            became painting on wood — magnets, nameplates, signs, every one of
            them made for someone in particular
          </p>
          <Link href="/pages/about" className="dawn-btn mt-7">
            Read the full story
          </Link>
        </div>
      </section>

      <section className="page-width grid items-start gap-8 py-10 md:grid-cols-2 md:items-center">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-[#f7f3ee] md:max-w-none">
          <Image
            src={site.customImage}
            alt="Custom nameplate work on the studio table"
            fill
            className="object-cover"
            sizes="(min-width: 750px) 50vw, 100vw"
          />
        </div>
        <div className="text-left md:px-8 md:text-center">
          <h2 className="section-heading">
            Need a name on it? Bulk for an event?
          </h2>
          <p className="mt-5 text-[15px] leading-8">
            We hand-paint custom nameplates, bulk return gifts, and wedding
            favors. Tell us what you need — we&apos;ll quote within 24 hours.
          </p>
          <Link href="/pages/contact" className="dawn-btn mt-7">
            Start a custom order
          </Link>
        </div>
      </section>

      <section className="page-width grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
        {trust.map((t) => (
          <div key={t.title} className="text-center">
            <div className="relative mx-auto h-[72px] w-[72px] overflow-hidden">
              <Image src={t.image} alt="" fill className="object-contain" />
            </div>
            <h3 className="mt-3 font-sans text-[15px] font-semibold">
              {t.title}
            </h3>
            <p className="mt-1 text-[14px] text-[#4a403a]">{t.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
