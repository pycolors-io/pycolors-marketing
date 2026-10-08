import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteButton } from "@/components/site-button";

describe("site action composition", () => {
  it("preserves native button refs, disabled state and event handling", () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    const { rerender } = render(
      <SiteButton ref={ref} type="button" onClick={onClick} disabled>
        Save
      </SiteButton>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("data-slot", "button");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    rerender(
      <SiteButton ref={ref} type="button" onClick={onClick}>
        Save
      </SiteButton>,
    );
    button.focus();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(button).toHaveFocus();
  });

  it("keeps caller-owned links, refs and geometry when composed with asChild", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <SiteButton asChild size="lg" className="px-8 rounded-lg">
        <a ref={ref} href="/docs" target="_blank" rel="noopener noreferrer">
          Read the complete integration documentation
        </a>
      </SiteButton>,
    );
    const link = screen.getByRole("link");
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).not.toHaveAttribute("role", "button");
    expect(link).toHaveClass(
      "px-8",
      "rounded-lg",
      "whitespace-normal",
      "h-auto",
    );
    expect(link).not.toHaveClass("px-4");
  });
});
