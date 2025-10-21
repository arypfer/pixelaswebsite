# Pixelas Studio - Next.js Website

A world-class, minimalist software store built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ Minimalist hero section with animated particles
- 🎨 Beautiful product showcase cards
- 🚀 Built with Next.js 15 and React 18
- 💎 TypeScript for type safety
- 🎭 Tailwind CSS for styling
- 📱 Fully responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
pixelas-nextjs/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page with products
│   └── globals.css      # Global styles
├── components/
│   └── ui/
│       └── hero-minimalism.tsx  # Minimalist hero component
├── lib/
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Font:** Hubot Sans (via CDN)

## Customization

### Update Products

Edit the products in `app/page.tsx` by modifying the `ProductCard` components.

### Customize Hero

Modify the hero content in `components/ui/hero-minimalism.tsx`:
- Change brand name
- Update title and subtitle
- Adjust particle animation settings

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline in components

## Build for Production

```bash
npm run build
npm start
```

## Deploy

Deploy easily to Vercel:

```bash
vercel
```

Or any other hosting platform that supports Next.js.

## License

© 2024 Amlolife. All rights reserved.
