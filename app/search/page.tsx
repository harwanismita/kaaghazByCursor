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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl">Search</h1>
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
