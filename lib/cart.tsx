"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { site } from "@/lib/site";

export type CartItem = {
  id: string;
  productHandle: string;
  productTitle: string;
  variantId: string;
  variantTitle: string;
  price: number;
  image: string | null;
  quantity: number;
  nameToPaint?: string;
};

type Persist = { items: CartItem[]; coupon: string };

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  coupon: string;
  setCoupon: (code: string) => void;
  discount: number;
  shipping: number;
  total: number;
  couponApplied: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kaaghaz-cart-v1";
const serverSnapshot: Persist = { items: [], coupon: "" };

function readStorage(): Persist {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], coupon: "" };
    const parsed = JSON.parse(raw) as Persist;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      coupon: typeof parsed.coupon === "string" ? parsed.coupon : "",
    };
  } catch {
    return { items: [], coupon: "" };
  }
}

function saveStorage(next: Persist) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
}

let snapshot: Persist = { items: [], coupon: "" };
if (typeof window !== "undefined") {
  snapshot = readStorage();
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function write(next: Persist) {
  snapshot = next;
  saveStorage(next);
  listeners.forEach((listener) => listener());
}

function makeId(item: Pick<CartItem, "variantId" | "nameToPaint">) {
  return `${item.variantId}::${item.nameToPaint?.trim().toLowerCase() || ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const persist = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback(
    (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => {
      const id = makeId(item);
      const qty = item.quantity ?? 1;
      const current = snapshot;
      const existing = current.items.find((p) => p.id === id);
      write({
        ...current,
        items: existing
          ? current.items.map((p) =>
              p.id === id ? { ...p, quantity: p.quantity + qty } : p,
            )
          : [...current.items, { ...item, id, quantity: qty }],
      });
    },
    [],
  );

  const updateQty = useCallback((id: string, quantity: number) => {
    const current = snapshot;
    write({
      ...current,
      items:
        quantity <= 0
          ? current.items.filter((p) => p.id !== id)
          : current.items.map((p) => (p.id === id ? { ...p, quantity } : p)),
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    write({
      ...snapshot,
      items: snapshot.items.filter((p) => p.id !== id),
    });
  }, []);

  const clear = useCallback(() => {
    write({ ...snapshot, items: [] });
  }, []);

  const setCoupon = useCallback((code: string) => {
    write({ ...snapshot, coupon: code });
  }, []);

  const value = useMemo(() => {
    const items = persist.items;
    const coupon = persist.coupon;
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
    const couponApplied =
      coupon.trim().toUpperCase() === site.welcomeCode && subtotal > 0;
    const discount = couponApplied
      ? Math.round(subtotal * site.welcomeDiscount)
      : 0;
    const afterDiscount = subtotal - discount;
    const shipping =
      afterDiscount === 0 || afterDiscount >= site.freeShippingMin
        ? 0
        : site.shippingFee;
    return {
      items,
      addItem,
      updateQty,
      removeItem,
      clear,
      count,
      subtotal,
      coupon,
      setCoupon,
      discount,
      shipping,
      total: afterDiscount + shipping,
      couponApplied,
    };
  }, [persist, addItem, updateQty, removeItem, clear, setCoupon]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
