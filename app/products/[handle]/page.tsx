import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/product-buy-box";
import { ProductGallery } from "@/components/product-gallery";
import { ProductGrid } from "@/components/product-card";
import { getProduct, products } from "@/lib/catalog";

type Props = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: "Product" };
  return {
    title: product.title,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const related = products
    .filter(
      (p) =>
        p.handle !== product.handle &&
        (p.type === product.type ||
          p.tags.some((t) => product.tags.includes(t))),
    )
    .slice(0, 4);

  return (
    <div className="page-width py-10">
      <p className="mb-6 text-sm text-[#6b4f3a]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span> / </span>
        <span>{product.title}</span>
      </p>
      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery product={product} />
        <div>
          <h1 className="section-heading">{product.title}</h1>
          <p className="mt-2 text-sm text-[#6b4f3a]">
            100% hand-painted · Made-to-order in India
          </p>
          <div className="mt-6">
            <ProductBuyBox product={product} />
          </div>
          {product.description && (
            <div className="rte mt-10 text-[15px] leading-7 text-[#3d3631] whitespace-pre-line">
              {product.description}
            </div>
          )}
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-3xl">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
