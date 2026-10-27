export const MAX_CART_QUANTITY = 99;

export function canAddDemoProduct(availability: string): boolean {
  return availability === "sample-available";
}

/** Return a safe integer quantity, or null when the input is invalid. */
export function normalizeCartQuantity(value: number): number | null {
  if (!Number.isFinite(value) || value < 1) return null;
  return Math.min(Math.floor(value), MAX_CART_QUANTITY);
}

export function mergeCartQuantity(current: number, requested: number): number {
  const safeCurrent = normalizeCartQuantity(current) ?? 0;
  const safeRequested = normalizeCartQuantity(requested) ?? 0;
  return Math.min(safeCurrent + safeRequested, MAX_CART_QUANTITY);
}
