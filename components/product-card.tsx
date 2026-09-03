import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  isOnSale,
  maxCompare,
  minPrice,
  type Product,
} from "@/lib/types";
import { formatInr, shopifyImage } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const price = minPrice(product);
  const compare = maxCompare(product);
  const sale = isOnSale(product);
  const from = product.variants.length > 1 && product.variants.some((v) => v.price !== price);

  return (
    <article className="group">
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#e8ddd4]">
          {image ? (
            <Image
              src={shopifyImage(image.src, 720)}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#8a7d72]">
              No photo yet
            </div>
          )}
          {sale && (
            <Badge className="absolute left-2 top-2">Sale</Badge>
          )}
          {!product.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f7f3ee]/70 text-sm font-semibold uppercase tracking-wider text-[#6b4f3a]">
              Sold out
            </div>
          )}
        </div>
        <h3 className="mt-3 text-[15px] leading-snug text-[#2e2a27] underline-offset-4 group-hover:underline">
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-[#2e2a27]">
          {compare && compare > price && (
            <span className="mr-2 text-[#8a7d72] line-through">
              {formatInr(compare)}
            </span>
          )}
          {from ? "From " : ""}
          {formatInr(price)}
        </p>
      </Link>
    </article>
  );
}

export function ProductGrid({
  products,
  empty,
}: {
  products: Product[];
  empty?: string;
}) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-[#6b4f3a]">
        {empty ?? "Nothing here yet. Check back soon, or send us a custom order."}
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.handle} product={p} />
      ))}
    </div>
  );
}
