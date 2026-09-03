import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import {
  collections,
  getCollection,
  products,
  productsForCollection,
} from "@/lib/catalog";

type Props = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return [{ handle: "all" }, ...collections.map((c) => ({ handle: c.handle }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  if (handle === "all") return { title: "All products" };
  const col = getCollection(handle);
  return { title: col?.title ?? "Collection", description: col?.description };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const isAll = handle === "all";
  const col = isAll
    ? {
        title: "All products",
        description:
          "Every hand-painted piece currently in the studio — nameplates, magnets, wall decor, and return gifts.",
      }
    : getCollection(handle);
  if (!col) notFound();

  const items = isAll ? products : productsForCollection(handle);

  return (
    <div className="page-width py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-heading">{col.title}</h1>
          {col.description && (
            <p className="mt-4 max-w-3xl whitespace-pre-line text-[16px] leading-7">
              {col.description}
            </p>
          )}
        </div>
        <p className="text-[14px]">
          {items.length} {items.length === 1 ? "product" : "products"}
        </p>
      </div>
      <div className="mt-10">
        <ProductGrid
          products={items}
          empty="This collection is being restocked. Follow @kaaghaz_theartstudio or send a custom order."
        />
      </div>
    </div>
  );
}
