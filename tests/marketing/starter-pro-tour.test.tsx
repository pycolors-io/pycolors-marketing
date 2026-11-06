import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { StarterProTour } from "@/components/starters/starter-pro-tour";
import { STARTER_PRO_TOUR } from "@/lib/products/starter-pro-tour";

afterEach(() => vi.restoreAllMocks());

describe("Starter Pro product tour", () => {
  it("offers a lightweight poster and an accessible transcript before playback", async () => {
    const { container } = render(<StarterProTour />);
    expect(
      screen.getByRole("region", { name: STARTER_PRO_TOUR.title }),
    ).toHaveAttribute("id", "product-tour");
    expect(
      screen.getByRole("button", { name: /Play Starter Pro product tour/u }),
    ).toBeVisible();
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("source")).toBeNull();
    const transcript = container.querySelector("details")!;
    expect(transcript.querySelector("summary")).toHaveTextContent(
      "Read the tour transcript",
    );
    for (const chapter of STARTER_PRO_TOUR.transcript) {
      expect(transcript).toHaveTextContent(chapter.title);
      expect(transcript).toHaveTextContent(chapter.text);
    }
    expect((await axe(container)).violations).toEqual([]);
  });

  it("requests playback only after activation and preserves native controls, focus and captions", async () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValue();
    const { container } = render(<StarterProTour />);
    expect(play).not.toHaveBeenCalled();
    fireEvent.click(
      screen.getByRole("button", { name: /Play Starter Pro product tour/u }),
    );
    const video = screen.getByLabelText("Starter Pro product tour");
    await waitFor(() => expect(play).toHaveBeenCalledOnce());
    expect(video).toHaveFocus();
    expect(video).toHaveAttribute("src", STARTER_PRO_TOUR.source);
    expect(video).toHaveAttribute("preload", "none");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("playsinline");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).not.toHaveAttribute("loop");
    expect(video.querySelector('track[kind="captions"]')).toHaveAttribute(
      "src",
      STARTER_PRO_TOUR.captions,
    );
    expect(
      screen.queryByRole("button", { name: /Play Starter Pro product tour/u }),
    ).toBeNull();
    expect((await axe(container)).violations).toEqual([]);
  });

  it("keeps a usable player when the browser requires another playback gesture", async () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockRejectedValue(
        new DOMException("Playback blocked", "NotAllowedError"),
      );
    render(<StarterProTour />);
    fireEvent.click(
      screen.getByRole("button", { name: /Play Starter Pro product tour/u }),
    );
    await waitFor(() => expect(play).toHaveBeenCalledOnce());
    expect(screen.getByLabelText("Starter Pro product tour")).toHaveAttribute(
      "controls",
    );
    expect(screen.getByLabelText("Starter Pro product tour")).toHaveAttribute(
      "poster",
      STARTER_PRO_TOUR.poster,
    );
  });
});
