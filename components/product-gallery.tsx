"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { shopifyImage } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const current = product.images[index];

  if (!current) {
    return (
      <div className="flex aspect-square items-center justify-center bg-[#e8ddd4] text-sm text-[#8a7d72]">
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
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      {product.images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {product.images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
