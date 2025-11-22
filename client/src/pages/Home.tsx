import MangaReader from "@/components/MangaReader";

/**
 * Home page - Manga Reader
 * Displays manga pages with intuitive navigation
 */
export default function Home() {
  // Placeholder pages - will be replaced with actual optimized images
  const pages = [
    "/pages/page-1.webp",
    "/pages/page-2.webp",
    "/pages/page-3.webp",
  ];

  return <MangaReader pages={pages} title="Manga Reader" />;
}
