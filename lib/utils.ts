import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatInr(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function shopifyImage(src: string, width = 800) {
  if (!src) return src;
  const joiner = src.includes("?") ? "&" : "?";
  return `${src}${joiner}width=${width}`;
}
