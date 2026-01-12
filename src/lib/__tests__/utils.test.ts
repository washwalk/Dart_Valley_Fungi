import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("utility functions", () => {
  describe("cn", () => {
    it("joins class names", () => {
      expect(cn("a", "b", "c")).toBe("a b c");
    });

    it("filters out falsy values", () => {
      expect(cn("a", undefined, "b", null, "c", false, "d")).toBe("a b c d");
    });

    it("handles empty input", () => {
      expect(cn()).toBe("");
    });

    it("handles conditional classes", () => {
      expect(cn("base", true && "active", false && "disabled")).toBe("base active");
    });
  });
});
