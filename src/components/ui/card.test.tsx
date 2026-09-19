import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card, CardBody, CardTitle } from "@/components/ui/card";

describe("Card", () => {
  it("renders its title and body", () => {
    render(
      <Card>
        <CardTitle>Seat intelligence</CardTitle>
        <CardBody>Ranked seats with scores.</CardBody>
      </Card>,
    );

    expect(
      screen.getByRole("heading", { name: "Seat intelligence" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Ranked seats with scores.")).toBeInTheDocument();
  });

  it("appends caller class names to the design-token defaults", () => {
    const { container } = render(<Card className="mt-8">body</Card>);

    expect(container.firstElementChild).toHaveClass("bg-ink-card", "mt-8");
  });
});
