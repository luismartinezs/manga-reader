import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MangaReaderProps {
  pages: string[];
  title?: string;
}

export default function MangaReader({ pages, title = "Manga Reader" }: MangaReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px) to trigger page change
  const minSwipeDistance = 50;

  const goToNextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, pages.length]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToNextPage();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPreviousPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPreviousPage]);

  // Touch gesture handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextPage();
    } else if (isRightSwipe) {
      goToPreviousPage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <div className="text-sm text-muted-foreground">
            Page {currentPage + 1} / {pages.length}
          </div>
        </div>
      </header>

      {/* Main reader area */}
      <main 
        className="flex-1 flex items-center justify-center p-4 relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Previous button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 hover:bg-background/90 backdrop-blur hidden md:flex"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Manga page image */}
        <div className="max-w-4xl w-full">
          <img
            src={pages[currentPage]}
            alt={`Page ${currentPage + 1}`}
            className="w-full h-auto rounded-lg shadow-2xl"
            loading="lazy"
          />
        </div>

        {/* Next button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 hover:bg-background/90 backdrop-blur hidden md:flex"
          onClick={goToNextPage}
          disabled={currentPage === pages.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </main>

      {/* Mobile navigation footer */}
      <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky bottom-0 md:hidden">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={goToNextPage}
            disabled={currentPage === pages.length - 1}
          >
            Next
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
