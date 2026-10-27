import { describe, expect, it } from "vitest";
import {
  MAX_CART_QUANTITY,
  canAddDemoProduct,
  mergeCartQuantity,
  normalizeCartQuantity,
} from "./cartRules";

describe("demo cart rules", () => {
  it("accepts only products marked available in the demo", () => {
    expect(canAddDemoProduct("sample-available")).toBe(true);
    expect(canAddDemoProduct("sample-unavailable")).toBe(false);
    expect(canAddDemoProduct("unknown")).toBe(false);
  });

  it("rejects non-finite, zero, and negative quantities", () => {
    for (const value of [Number.NaN, Number.POSITIVE_INFINITY, 0, -1]) {
      expect(normalizeCartQuantity(value)).toBeNull();
    }
  });

  it("normalizes valid quantities to an integer capped at the maximum", () => {
    expect(normalizeCartQuantity(1)).toBe(1);
    expect(normalizeCartQuantity(2.8)).toBe(2);
    expect(normalizeCartQuantity(500)).toBe(MAX_CART_QUANTITY);
  });

  it("does not let repeated additions exceed the maximum quantity", () => {
    expect(mergeCartQuantity(2, 3)).toBe(5);
    expect(mergeCartQuantity(98, 5)).toBe(MAX_CART_QUANTITY);
  });

  it("preserves cart invariants when merge inputs are invalid", () => {
    expect(mergeCartQuantity(Number.NaN, 2)).toBe(2);
    expect(mergeCartQuantity(3, Number.POSITIVE_INFINITY)).toBe(3);
    expect(mergeCartQuantity(-8, 2)).toBe(2);
    expect(mergeCartQuantity(3, -2)).toBe(3);
  });
});
