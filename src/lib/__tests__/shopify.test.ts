import { describe, it, expect } from "vitest";
import { formatPrice } from "@/lib/shopify";

describe("shopify utilities", () => {
  describe("formatPrice", () => {
    it("formats price in GBP", () => {
      expect(formatPrice(8.50, "GBP")).toBe("£8.50");
    });

    it("formats price with two decimal places", () => {
      expect(formatPrice(10, "GBP")).toBe("£10.00");
    });

    it("handles larger amounts", () => {
      expect(formatPrice(1250.99, "GBP")).toBe("£1,250.99");
    });
  });
});
