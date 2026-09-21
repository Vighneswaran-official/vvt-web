# Vogue Ventures Technologies (VVT)

**Digital Growth Partner & Creative Tech**

A modern React website for Vogue Ventures Technologies — helping brands grow through e-commerce marketplace management, Shopify stores, Meta advertising, content creation, and website development.

## Tech Stack

- **React 19** — Component-based UI
- **Vite** — Fast dev server & optimized builds
- **Vanilla CSS** — Custom design system with CSS variables

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm (comes with Node.js)

### Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally (http://localhost:4173)
npm run preview
```

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite — click **Deploy**
5. Every `git push` to `main` triggers auto-deployment

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

## Project Structure

```
src/
├── components/       # React components (one folder per section)
│   ├── Header/
│   ├── MobileDrawer/
│   ├── Hero/
│   ├── Highlights/
│   ├── Brands/
│   ├── VideoShowcase/
│   ├── Capabilities/
│   ├── Approach/
│   ├── Contact/
│   └── Footer/
├── data/             # Site content & brand data
├── hooks/            # Custom React hooks
├── styles/           # Global CSS & design tokens
├── App.jsx           # Root component
└── main.jsx          # Entry point
public/
├── assets/           # Brand logos & images
└── videos/           # Reel video files
```

## License

© 2026 Vogue Ventures Technologies. All Rights Reserved.
