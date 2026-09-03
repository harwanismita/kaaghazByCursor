import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/product-buy-box";
import { ProductGallery } from "@/components/product-gallery";
import { ProductGrid } from "@/components/product-card";
import { getProduct, products } from "@/lib/catalog";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ img?: string }>;
};

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

export default async function ProductPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const { img } = await searchParams;
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
      <div className="grid items-start gap-10 md:grid-cols-2">
        <ProductGallery product={product} active={Number(img) || 0} />
        <div>
          <p className="text-[14px]">{product.vendor}</p>
          <h1 className="section-heading mt-2">{product.title}</h1>
          <div className="mt-6">
            <ProductBuyBox product={product} />
          </div>
          {product.descriptionHtml ? (
            <div
              className="rte mt-8 text-[15px] leading-7"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <div className="rte mt-8 whitespace-pre-line text-[15px] leading-7">
              {product.description}
            </div>
          )}
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-heading mb-8">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
