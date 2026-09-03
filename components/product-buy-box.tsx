"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findVariant, type Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { formatInr } from "@/lib/utils";

export function ProductBuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const initial = Object.fromEntries(
    product.options.map((o) => [o.name, o.values[0]]),
  );
  const [selected, setSelected] = useState<Record<string, string>>(initial);
  const [nameToPaint, setNameToPaint] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = useMemo(
    () => findVariant(product, selected),
    [product, selected],
  );

  function add(goToCart = false) {
    if (!variant) return;
    addItem({
      productHandle: product.handle,
      productTitle: product.title,
      variantId: variant.id,
      variantTitle:
        variant.title === "Default Title" ? "Standard" : variant.title,
      price: variant.price,
      image: product.images[0]?.src ?? null,
      quantity: qty,
      nameToPaint: product.needsName ? nameToPaint.trim() : undefined,
    });
    setAdded(true);
    if (goToCart) router.push("/cart");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xl">
          {variant.compareAt && variant.compareAt > variant.price && (
            <span className="mr-2 text-[#8a7d72] line-through">
              {formatInr(variant.compareAt)}
            </span>
          )}
          {formatInr(variant.price)}
        </p>
        <p className="mt-1 text-sm text-[#6b4f3a]">
          Inclusive of taxes. Free shipping over ₹1,199.
        </p>
      </div>

      {product.options.map((opt) => (
        <div key={opt.name}>
          <Label className="mb-2 block">{opt.name}</Label>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((value) => {
              const active = selected[opt.name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setSelected((s) => ({ ...s, [opt.name]: value }))
                  }
                  className={`border px-3 py-2 text-sm ${
                    active
                      ? "border-[#6b4f3a] bg-[#6b4f3a] text-white"
                      : "border-[#d4c6b8] bg-white hover:border-[#6b4f3a]"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {product.needsName && (
        <div>
          <Label htmlFor="name-to-paint">Name to paint</Label>
          <Input
            id="name-to-paint"
            className="mt-2"
            placeholder="e.g. Aanya, or The Sharmas"
            value={nameToPaint}
            onChange={(e) => setNameToPaint(e.target.value)}
          />
          <p className="mt-1 text-xs text-[#6b4f3a]">
            Spell it exactly as you want it on the piece. Leave blank if you
            will confirm on WhatsApp.
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="qty">Quantity</Label>
        <Input
          id="qty"
          type="number"
          min={1}
          className="mt-2 w-28"
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          className="flex-1"
          disabled={!variant.available}
          onClick={() => add(false)}
        >
          {variant.available ? "Add to cart" : "Sold out"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          disabled={!variant.available}
          onClick={() => add(true)}
        >
          Buy now
        </Button>
      </div>
      {added && (
        <p className="text-sm text-[#6b4f3a]">
          Added to cart.{" "}
          <button type="button" className="underline" onClick={() => router.push("/cart")}>
            View cart
          </button>
        </p>
      )}
    </div>
  );
}
