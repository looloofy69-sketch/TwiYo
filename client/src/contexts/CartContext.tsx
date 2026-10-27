import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../data/siteData";
import { canAddDemoProduct, mergeCartQuantity, normalizeCartQuantity } from "../lib/cartRules";

export type CartItem = { product: Product; variant: string; quantity: number };
export type DemoOrder = { reference: string; items: CartItem[]; subtotal: number };
type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  lastOrder: DemoOrder | null;
  addItem: (product: Product, variant: string, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  completeDemoOrder: () => string;
};

const CartContext = createContext<CartContextValue | null>(null);
export const cartKey = (item: Pick<CartItem, "product" | "variant">) => `${item.product.id}:${item.variant}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<DemoOrder | null>(null);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addItem = useCallback((product: Product, variant: string, quantity = 1) => {
    // Keep cart invariants at the domain boundary, not only in UI controls.
    const requestedQuantity = normalizeCartQuantity(quantity);
    if (!canAddDemoProduct(product.demoAvailability) || requestedQuantity === null) return;
    setItems((current) => {
      const key = `${product.id}:${variant}`;
      const existing = current.find((item) => cartKey(item) === key);
      if (existing) {
        return current.map((item) => cartKey(item) === key
          ? { ...item, quantity: mergeCartQuantity(existing.quantity, requestedQuantity) }
          : item);
      }
      return [...current, { product, variant, quantity: requestedQuantity }];
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    const safeQuantity = normalizeCartQuantity(quantity);
    if (safeQuantity === null) return;
    setItems((current) => current.map((item) => cartKey(item) === key ? { ...item, quantity: safeQuantity } : item));
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => cartKey(item) !== key));
  }, []);

  const completeDemoOrder = useCallback(() => {
    const snapshot = items.map((item) => ({ ...item }));
    const order = {
      reference: `TW-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
      items: snapshot,
      subtotal: snapshot.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    };
    setLastOrder(order);
    setItems([]);
    return order.reference;
  }, [items]);

  const value = useMemo(() => ({ items, count, subtotal, lastOrder, addItem, updateQuantity, removeItem, completeDemoOrder }), [items, count, subtotal, lastOrder, addItem, updateQuantity, removeItem, completeDemoOrder]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
