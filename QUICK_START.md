# 🚀 Quick Start Guide

## ⚠️ IMPORTANT: Always run commands from the `pixelas-nextjs` directory!

## 📍 Navigate to Project

```bash
# From D:\Website Pixelas\
cd pixelas-nextjs

# Or directly
cd "D:\Website Pixelas\pixelas-nextjs"
```

## 🛠️ Development Commands

### Start Development Server
```bash
npm run dev
```
Then open: http://localhost:3000

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Install Dependencies (if needed)
```bash
npm install
```

## 📁 Project Structure

```
pixelas-nextjs/
├── app/
│   ├── page.tsx          # Main page with products
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── ui/
│       └── hero-minimalism.tsx  # Hero component
├── lib/
│   └── utils.ts          # Utilities
└── package.json          # ← npm needs this file!
```

## 🎨 Customization

### Update Products
Edit: `app/page.tsx`

### Change Hero Content
Edit: `components/ui/hero-minimalism.tsx`

### Modify Styles
Edit: `app/globals.css` or `tailwind.config.ts`

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🆘 Troubleshooting

### Error: Cannot find package.json
**Solution:** Make sure you're in the `pixelas-nextjs` directory!

```bash
# Check current directory
pwd  # or 'cd' on Windows

# Should show: D:\Website Pixelas\pixelas-nextjs
```

### Port 3000 already in use
**Solution:** Kill the process or use a different port

```bash
npm run dev -- -p 3001
```

### Dependencies not installed
**Solution:** Run npm install

```bash
npm install
```

## 📝 Common Tasks

### Add a new page
Create a new file in `app/` directory:
```tsx
// app/about/page.tsx
export default function About() {
  return <div>About Page</div>
}
```

### Add shadcn components
```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

### Update dependencies
```bash
npm update
```

## 🎯 Your Products

All 8 products are listed in `app/page.tsx`:
1. Software Pixelas Studio (International) - $12.99
2. Aplikasi Amlo Pose - IDR 25.000
3. Aplikasi Shotto - IDR 20.000
4. Plugin Retouch Photoshop - IDR 35.000
5. Action Retouch Photoshop - IDR 30.000
6. Amlogen AI - IDR 45.000
7. Amlogen Nano Banana - IDR 28.000
8. Software Pixelas Studio (Windows) - IDR 50.000

## 💡 Tips

- Use `npm run dev` for development (hot reload)
- Use `npm run build` before deploying
- Check the browser console for errors
- The app uses TypeScript - errors will show in your IDE

## 🔗 Useful Links

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Lucide Icons: https://lucide.dev/icons
- Vercel Deploy: https://vercel.com

---

**Need help?** Check the main README.md or visit Next.js documentation.
