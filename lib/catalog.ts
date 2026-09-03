import productsJson from "@/data/products.json";
import collectionsJson from "@/data/collections.json";
import type { Collection, Product } from "@/lib/types";
import { site } from "@/lib/site";

export type { Collection, Product } from "@/lib/types";
export {
  findVariant,
  isOnSale,
  maxCompare,
  minPrice,
} from "@/lib/types";
export { site };

export const products = productsJson as Product[];
export const collections = collectionsJson as Collection[];

const productByHandle = new Map(products.map((p) => [p.handle, p]));
const collectionByHandle = new Map(collections.map((c) => [c.handle, c]));

export function getProduct(handle: string) {
  return productByHandle.get(handle);
}

export function getCollection(handle: string) {
  return collectionByHandle.get(handle);
}

export function productsForCollection(handle: string) {
  if (handle === "all") return products;
  const col = collectionByHandle.get(handle);
  if (!col) return [];
  return col.productHandles
    .map((h) => productByHandle.get(h))
    .filter((p): p is Product => Boolean(p));
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const hay = `${p.title} ${p.description} ${p.tags.join(" ")} ${p.type}`.toLowerCase();
    return hay.includes(q);
  });
}

export function featuredCollectionCards() {
  return site.shopByCategory
    .map((handle) => collectionByHandle.get(handle))
    .filter((c): c is Collection => Boolean(c));
}
