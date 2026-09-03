import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kaaghaz The Art Studio",
    template: "%s – Kaaghaz - The art studio",
  },
  description:
    "Kaaghaz is a place where we offer personalized, handcrafted & exclusive nameplates, gifting solutions and home décor. Every piece is painted by hand in India.",
  icons: { icon: site.favicon },
  openGraph: {
    title: "Kaaghaz The Art Studio",
    description:
      "Hand-painted words for little moments and meaningful homes.",
    images: [site.ogImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
