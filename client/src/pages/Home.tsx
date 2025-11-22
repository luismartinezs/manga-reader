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
    "/pages/page-4.webp",
    "/pages/page-5.webp",
    "/pages/page-6.webp",
    "/pages/page-7.webp",
    "/pages/page-8.webp",
    "/pages/page-9.webp",
    "/pages/page-10.webp",
    "/pages/page-11.webp",
    "/pages/page-12.webp",
    "/pages/page-13.webp",
    "/pages/page-14.webp",
    "/pages/page-15.webp",
    "/pages/page-16.webp",
    "/pages/page-17.webp",
    "/pages/page-18.webp",
    "/pages/page-19.webp",
    "/pages/page-20.webp",
  ];

  return <MangaReader pages={pages} title="Manga Reader" />;
}
