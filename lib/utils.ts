import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function shopifyImage(src: string, width = 800) {
  if (!src) return src;
  const joiner = src.includes("?") ? "&" : "?";
  return `${src}${joiner}width=${width}`;
}
