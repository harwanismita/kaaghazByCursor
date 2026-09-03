import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About — Kaaghaz The Art Studio" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl">Kaaghaz · The Art Studio</h1>
      <p className="mt-3 text-lg text-[#4a403a]">
        Hand-painted words for meaningful homes.
      </p>
      <div className="relative my-8 aspect-[4/3] overflow-hidden bg-[#e8ddd4]">
        <Image
          src={site.founderImage}
          alt="Smita at Kaaghaz"
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-5 text-[16px] leading-8">
        <p>
          Kaaghaz (कागज़) means paper in Hindi — the canvas where every story
          begins.
        </p>
        <p>
          We started by painting on paper. The stories then migrated to wood,
          and somewhere along the way that became the studio. The name stayed
          because the spirit did: turning a blank surface into something
          personal, by hand.
        </p>
        <h2 className="pt-4 text-3xl">What we make</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Personalised kids&apos; nameplates — hand-painted on sturdy wooden
            bases, in themes from rainbows to storybook nights. Every
            nameplate is made for one child.
          </li>
          <li>
            Home nameplates &amp; signs — arched, free-standing, wood-plank,
            pinewood. For your front door, your nursery, your wall.
          </li>
          <li>
            Hinglish quote magnets — Sukoon, Sab Moh Maya Hai, Meri Chai Kahan
            Hai, Nautanki and more. ₹220 each — the kind of thing that makes
            you smile every morning at the fridge.
          </li>
          <li>
            Wood-plank return gifts &amp; bulk orders — for birthdays, baby
            showers, weddings, corporate gifting.
          </li>
        </ul>
        <h2 className="pt-4 text-3xl">How we work</h2>
        <p>
          Everything is made to order — no factory line, no pre-stocking.
          Magnets ship within 2 days. Nameplates take 5–7 days because they
          are hand-painted, person by person, name by name.
        </p>
        <h2 className="pt-4 text-3xl">Founder</h2>
        <p>
          Kaaghaz is run by Smita, who paints every piece herself. If you have
          DMed us, you have spoken to her directly.
        </p>
        <p>
          Instagram ·{" "}
          <a className="underline" href={site.instagram}>
            {site.instagramHandle}
          </a>
          <br />
          Email: {site.email}
        </p>
      </div>
      <Button asChild className="mt-8">
        <Link href="/pages/contact">Start a custom order</Link>
      </Button>
    </div>
  );
}
