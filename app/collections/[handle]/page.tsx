import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import {
  collections,
  getCollection,
  products,
  productsForCollection,
} from "@/lib/catalog";
import { minPrice, type Product } from "@/lib/types";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export function generateStaticParams() {
  return [{ handle: "all" }, ...collections.map((c) => ({ handle: c.handle }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  if (handle === "all") return { title: "All products" };
  const col = getCollection(handle);
  return { title: col?.title ?? "Collection", description: col?.description };
}

function sortProducts(items: Product[], sort: string) {
  const copy = [...items];
  if (sort === "price-asc") copy.sort((a, b) => minPrice(a) - minPrice(b));
  else if (sort === "price-desc") copy.sort((a, b) => minPrice(b) - minPrice(a));
  else if (sort === "alpha") copy.sort((a, b) => a.title.localeCompare(b.title));
  return copy;
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const { sort = "featured" } = await searchParams;
  const isAll = handle === "all";
  const col = isAll
    ? {
        title: "All products",
        description:
          "Every hand-painted piece currently in the studio — nameplates, magnets, wall decor, and return gifts.",
      }
    : getCollection(handle);
  if (!col) notFound();

  const items = sortProducts(
    isAll ? products : productsForCollection(handle),
    sort,
  );

  return (
    <div className="page-width py-10">
      <h1 className="section-heading">
        {isAll ? col.title : `Collection: ${col.title}`}
      </h1>
      {col.description && (
        <p className="mt-4 max-w-3xl whitespace-pre-line text-[16px] leading-7">
          {col.description}
        </p>
      )}
      <form
        className="mt-8 flex flex-wrap items-center justify-end gap-3 text-[14px]"
        method="get"
      >
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          name="sort"
          defaultValue={sort}
          className="h-10 border-0 bg-transparent text-[14px]"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
          <option value="alpha">Alphabetically, A-Z</option>
        </select>
        <button type="submit" className="underline">
          Apply
        </button>
        <span>
          {items.length} {items.length === 1 ? "product" : "products"}
        </span>
      </form>
      <div className="mt-6">
        <ProductGrid
          products={items}
          empty="This collection is being restocked. Follow @kaaghaz_theartstudio or send a custom order."
        />
      </div>
    </div>
  );
}
