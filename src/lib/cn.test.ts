import { describe, expect, it } from "vitest";

import { cn } from "@/lib/cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values so conditionals stay inline", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});
