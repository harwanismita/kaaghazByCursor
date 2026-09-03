import { addToCart } from "@/app/actions/cart";
import type { Product } from "@/lib/types";
import { formatInr } from "@/lib/utils";

export function ProductBuyBox({ product }: { product: Product }) {
  const variant = product.variants[0];
  if (!variant) return null;

  return (
    <form action={addToCart} className="space-y-5">
      <input type="hidden" name="handle" value={product.handle} />
      <input type="hidden" name="variantId" value={String(variant.id)} />

      <div>
        {variant.compareAt && variant.compareAt > variant.price && (
          <s className="mr-2 text-[15px]">{formatInr(variant.compareAt)}</s>
        )}
        <span className="text-[16px] text-[#2e2a27]">
          {formatInr(variant.price)}
        </span>
        <p className="mt-1 text-[14px]">Shipping calculated at checkout.</p>
      </div>

      {product.options.map((opt, index) => (
        <div key={opt.name}>
          <label className="mb-2 block text-[14px] text-[#2e2a27]" htmlFor={`opt-${index}`}>
            {opt.name}
          </label>
          <select
            id={`opt-${index}`}
            name={`option${index + 1}`}
            className="h-12 w-full max-w-xs border border-[#d4c6b8] bg-white px-3 text-[15px]"
          >
            {opt.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}

      {product.needsName && (
        <div>
          <label className="mb-2 block text-[14px] text-[#2e2a27]" htmlFor="name-to-paint">
            Name to paint
          </label>
          <input
            id="name-to-paint"
            name="nameToPaint"
            placeholder="e.g. Aanya, or The Sharmas"
            className="h-12 w-full border border-[#d4c6b8] bg-white px-3 text-[15px]"
          />
        </div>
      )}

      <div>
        <label className="mb-2 block text-[14px] text-[#2e2a27]" htmlFor="qty">
          Quantity
        </label>
        <input
          id="qty"
          name="quantity"
          type="number"
          min={1}
          defaultValue={1}
          className="h-12 w-24 border border-[#d4c6b8] bg-white px-3 text-[15px]"
        />
      </div>

      <button
        type="submit"
        name="intent"
        value="add"
        className="dawn-btn w-full max-w-md disabled:opacity-50"
        disabled={!product.available}
      >
        {product.available ? "Add to cart" : "Sold out"}
      </button>
    </form>
  );
}
