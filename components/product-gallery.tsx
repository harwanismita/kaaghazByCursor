import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { shopifyImage } from "@/lib/utils";

export function ProductGallery({
  product,
  active = 0,
}: {
  product: Product;
  active?: number;
}) {
  const index = Math.min(Math.max(active, 0), Math.max(product.images.length - 1, 0));
  const current = product.images[index];

  if (!current) {
    return (
      <div className="flex aspect-square items-center justify-center bg-[#e8ddd4] text-sm">
        Photos coming soon
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-[#e8ddd4]">
        <Image
          src={shopifyImage(current.src, 1200)}
          alt={current.alt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 750px) 50vw, 100vw"
        />
      </div>
      {product.images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {product.images.map((img, i) => (
            <Link
              key={img.src}
              href={`/products/${product.handle}?img=${i}`}
              scroll={false}
              className={`relative aspect-square overflow-hidden bg-[#e8ddd4] ${
                i === index ? "ring-2 ring-[#6b4f3a]" : ""
              }`}
            >
              <Image
                src={shopifyImage(img.src, 240)}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
