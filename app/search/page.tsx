import { ProductGrid } from "@/components/product-card";
import { searchProducts } from "@/lib/catalog";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchProducts(q);

  return (
    <div className="page-width py-10">
      <h1 className="section-heading">Search</h1>
      <form action="/search" className="mt-6 max-w-xl">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search"
          className="h-12 w-full border border-[#d4c6b8] bg-white px-3 text-sm outline-none"
        />
      </form>
      {q ? (
        <p className="mt-3 text-[#4a403a]">
          {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
        </p>
      ) : (
        <p className="mt-3 text-[#4a403a]">
          Type a name, theme, or product — rainbow, magnet, pet, pinewood.
        </p>
      )}
      <div className="mt-10">
        <ProductGrid
          products={results}
          empty={
            q
              ? `No pieces matched “${q}”. Try rainbow, magnet, pinewood, or pet.`
              : "Start with a search above."
          }
        />
      </div>
    </div>
  );
}
