import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MangaReader from "./MangaReader";

describe("MangaReader", () => {
  const mockPages = ["/pages/page-1.webp", "/pages/page-2.webp", "/pages/page-3.webp"];

  it("renders the manga reader with title and page counter", () => {
    render(<MangaReader pages={mockPages} title="Test Manga" />);
    
    expect(screen.getByText("Test Manga")).toBeInTheDocument();
    expect(screen.getByText("Page 1 / 3")).toBeInTheDocument();
  });

  it("displays the first page initially", () => {
    render(<MangaReader pages={mockPages} />);
    
    const img = screen.getByAltText("Page 1") as HTMLImageElement;
    expect(img.src).toContain("/pages/page-1.webp");
  });

  it("navigates to next page when next button is clicked", () => {
    render(<MangaReader pages={mockPages} />);
    
    const nextButtons = screen.getAllByRole("button", { name: /next/i });
    fireEvent.click(nextButtons[0]);
    
    expect(screen.getByText("Page 2 / 3")).toBeInTheDocument();
    const img = screen.getByAltText("Page 2") as HTMLImageElement;
    expect(img.src).toContain("/pages/page-2.webp");
  });

  it("navigates to previous page when previous button is clicked", () => {
    render(<MangaReader pages={mockPages} />);
    
    // Go to page 2 first
    const nextButtons = screen.getAllByRole("button", { name: /next/i });
    fireEvent.click(nextButtons[0]);
    
    // Then go back to page 1
    const prevButtons = screen.getAllByRole("button", { name: /previous/i });
    fireEvent.click(prevButtons[0]);
    
    expect(screen.getByText("Page 1 / 3")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<MangaReader pages={mockPages} />);
    
    const prevButtons = screen.getAllByRole("button", { name: /previous/i }) as HTMLButtonElement[];
    prevButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("disables next button on last page", () => {
    render(<MangaReader pages={mockPages} />);
    
    // Navigate to last page
    const nextButtons = screen.getAllByRole("button", { name: /next/i }) as HTMLButtonElement[];
    fireEvent.click(nextButtons[0]); // page 2
    fireEvent.click(nextButtons[0]); // page 3
    
    nextButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("navigates with arrow keys", () => {
    render(<MangaReader pages={mockPages} />);
    
    // Navigate forward with ArrowRight
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByText("Page 2 / 3")).toBeInTheDocument();
    
    // Navigate backward with ArrowLeft
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText("Page 1 / 3")).toBeInTheDocument();
  });
});
