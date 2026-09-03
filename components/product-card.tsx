import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/app/actions/cart";
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
  const hasOptions = product.options.length > 0;
  const from =
    product.variants.length > 1 &&
    product.variants.some((v) => v.price !== price);

  return (
    <article className="group flex h-full flex-col">
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#e8ddd4]">
          {image ? (
            <Image
              src={shopifyImage(image.src, 720)}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#8a7d72]">
              No photo yet
            </div>
          )}
          {sale && (
            <span className="absolute bottom-2 left-2 bg-[#6b4f3a] px-2 py-0.5 text-[11px] text-white">
              Sale
            </span>
          )}
        </div>
        <h3 className="mt-3 text-[15px] leading-snug underline-offset-4 group-hover:underline">
          {product.title}
        </h3>
        <p className="mt-1 text-[14px]">
          {compare && compare > price && (
            <s className="mr-2 text-[#8a7d72]">{formatInr(compare)}</s>
          )}
          <span>
            {from ? "From " : ""}
            {formatInr(price)}
          </span>
        </p>
      </Link>
      <div className="mt-3">
        {hasOptions ? (
          <Link
            href={`/products/${product.handle}`}
            className="dawn-btn-secondary"
          >
            Choose options
          </Link>
        ) : (
          <form action={addToCart}>
            <input type="hidden" name="handle" value={product.handle} />
            <input
              type="hidden"
              name="variantId"
              value={String(product.variants[0]?.id ?? "")}
            />
            <input type="hidden" name="quantity" value="1" />
            <button
              type="submit"
              name="intent"
              value="add"
              className="dawn-btn-secondary"
              disabled={!product.available}
            >
              {product.available ? "Add to cart" : "Sold out"}
            </button>
          </form>
        )}
      </div>
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
        {empty ?? "Nothing here yet. Check back soon, or send a custom order."}
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
