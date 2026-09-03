export type ProductImage = { src: string; alt: string };
export type ProductOption = { name: string; values: string[] };
export type ProductVariant = {
  id: string;
  title: string;
  price: number;
  compareAt: number | null;
  available: boolean;
  option1: string | null;
  option2: string | null;
  option3: string | null;
};
export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  type: string;
  tags: string[];
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  needsName: boolean;
  available: boolean;
};
export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string | null;
  productHandles: string[];
  featured: boolean;
};

export function minPrice(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}

export function maxCompare(product: Product) {
  const compares = product.variants
    .map((v) => v.compareAt)
    .filter((n): n is number => n != null && n > 0);
  return compares.length ? Math.max(...compares) : null;
}

export function isOnSale(product: Product) {
  return product.variants.some(
    (v) => v.compareAt != null && v.compareAt > v.price,
  );
}

export function findVariant(
  product: Product,
  selected: Record<string, string>,
) {
  if (product.options.length === 0) return product.variants[0];
  return (
    product.variants.find((v) => {
      return product.options.every((opt, i) => {
        const key = `option${i + 1}` as "option1" | "option2" | "option3";
        return !selected[opt.name] || v[key] === selected[opt.name];
      });
    }) ?? product.variants[0]
  );
}
