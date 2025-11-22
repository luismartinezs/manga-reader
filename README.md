# Manga Reader

A simple, minimal static website for reading manga page by page. Features a clean, dark interface optimized for both mobile and desktop devices.

## Features

- **Page-by-page navigation** - Navigate using keyboard arrows, touch swipes, or on-screen buttons
- **Responsive design** - Works beautifully on mobile and desktop
- **Optimized images** - WebP format with quality optimization for fast loading
- **Minimal UI** - Clean, distraction-free reading experience
- **Touch gestures** - Swipe left/right on mobile devices
- **Keyboard shortcuts** - Arrow keys for quick navigation

## Tech Stack

- React 19
- Tailwind CSS 4
- Vite
- TypeScript
- Wouter (routing)
- shadcn/ui components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/luismartinezs/manga-reader.git
cd manga-reader
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The site will be available at `http://localhost:3000`

## Adding Your Manga Pages

### Using the Batch Optimization Script

1. Place your raw manga page images (JPG, JPEG, or PNG) in the `raw-pages` directory

2. Run the optimization script:
```bash
./optimize-images.sh ./raw-pages ./client/public/pages
```

This will:
- Convert images to WebP format
- Resize to max width of 1200px (maintains aspect ratio)
- Apply quality optimization (85%)
- Strip metadata to reduce file size
- Save optimized images to `client/public/pages`

### Manual Setup

Alternatively, you can manually add optimized images to `client/public/pages/` and update the page list in `client/src/pages/Home.tsx`:

```tsx
const pages = [
  "/pages/page-1.webp",
  "/pages/page-2.webp",
  "/pages/page-3.webp",
  // Add more pages here
];
```

## Project Structure

```
manga-reader/
├── client/
│   ├── public/
│   │   └── pages/          # Optimized manga page images
│   └── src/
│       ├── components/
│       │   └── MangaReader.tsx  # Main reader component
│       └── pages/
│           └── Home.tsx     # Home page with page list
├── raw-pages/              # Place raw images here for optimization
├── optimize-images.sh      # Batch image optimization script
└── README.md
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm check` - Type check with TypeScript

## Navigation Controls

- **Desktop:**
  - Arrow keys (←/→ or ↑/↓)
  - Click side buttons
  
- **Mobile:**
  - Swipe left/right
  - Tap bottom navigation buttons

## License

MIT
