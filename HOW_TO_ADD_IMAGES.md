# 📸 How to Add Images to Product Cards

## Overview

Each product card now supports background images with beautiful gradient overlays that ensure text remains readable.

## Image Features

✅ **Automatic gradient overlay** - Multi-layer gradients blend the image smoothly
✅ **Text readability** - Drop shadows and opacity ensure text is always visible
✅ **Hover effects** - Image brightens slightly on hover
✅ **Responsive** - Images scale perfectly on all devices
✅ **Optional** - Cards work with or without images

## How to Add Images

### Method 1: Using URLs (Easiest)

Simply add the `image` prop to any `ProductCard`:

```tsx
<ProductCard
  icon={<Star className="w-5 h-5" />}
  title="Software Pixelas Studio"
  subtitle="International Payment"
  description="Professional AI-powered image editing software..."
  price="$12.99"
  featured
  link="https://lynk.id/pixelas.cloud/mq7on743wrqq"
  image="https://your-image-url.com/image.jpg"  // ← Add this line
/>
```

### Method 2: Using Local Images

1. **Create a public folder** (if not exists):
   ```
   pixelas-nextjs/
   └── public/
       └── products/
           ├── pixelas-studio.jpg
           ├── amlo-pose.jpg
           └── shotto.jpg
   ```

2. **Add images to the folder**

3. **Reference in code**:
   ```tsx
   image="/products/pixelas-studio.jpg"
   ```

### Method 3: Using Unsplash (For Testing)

Use Unsplash URLs with specific dimensions:

```tsx
image="https://images.unsplash.com/photo-[ID]?w=400&h=300&fit=crop"
```

**Recommended Unsplash Images for Software:**
- Tech/Code: `photo-1550745165-9bc0b252726f`
- Design: `photo-1561070791-2526d30994b5`
- Creative: `photo-1558655146-9f40138edfeb`
- AI/Tech: `photo-1677442136019-21780ecad995`
- Workspace: `photo-1498050108023-c5249f4df085`

## Image Specifications

### Recommended Dimensions
- **Width:** 400-600px
- **Height:** 300-400px
- **Aspect Ratio:** 4:3 or 16:9
- **Format:** JPG, PNG, WebP
- **File Size:** < 200KB (optimized)

### Image Guidelines

✅ **DO:**
- Use high-quality images
- Choose images with good contrast
- Use images related to your product
- Optimize images before uploading
- Test on mobile devices

❌ **DON'T:**
- Use images with too much text
- Use very bright/light images (hard to read text)
- Use huge file sizes (slow loading)
- Use copyrighted images without permission

## Gradient Overlay System

The card uses **3 layers of gradients** for perfect text readability:

1. **Top-to-Bottom:** `from-black/80 via-black/70 to-black/90`
   - Darkens the top and bottom
   
2. **Bottom-to-Top:** `from-black/95 via-transparent to-transparent`
   - Extra darkness at bottom for price/button
   
3. **Left-to-Right:** `from-black/50 via-transparent to-black/50`
   - Darkens edges for better card definition

## Example: All Products with Images

```tsx
// Featured Product
<ProductCard
  image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop"
  // ... other props
/>

// Amlo Pose
<ProductCard
  image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
  // ... other props
/>

// Shotto
<ProductCard
  image="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop"
  // ... other props
/>

// Plugin Retouch
<ProductCard
  image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
  // ... other props
/>
```

## Customizing the Gradient

To adjust the gradient overlay, edit `app/page.tsx`:

```tsx
{/* Multi-layer gradient for smooth blending */}
<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
```

**Adjust opacity:**
- `/80` = 80% opacity
- `/70` = 70% opacity
- `/90` = 90% opacity

**Make darker:** Increase opacity (e.g., `/90` → `/95`)
**Make lighter:** Decrease opacity (e.g., `/80` → `/60`)

## Image Optimization Tips

### Using Next.js Image Component (Optional)

For better performance, you can use Next.js `Image` component:

```tsx
import Image from 'next/image'

// In ProductCard component:
{image && (
  <div className="absolute inset-0 z-0">
    <Image 
      src={image} 
      alt={title}
      fill
      className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
    {/* gradients... */}
  </div>
)}
```

### Online Image Optimization Tools

- **TinyPNG:** https://tinypng.com/
- **Squoosh:** https://squoosh.app/
- **ImageOptim:** https://imageoptim.com/

## Troubleshooting

### Image not showing
- Check the URL is correct
- Ensure CORS is enabled (for external URLs)
- Check browser console for errors
- Verify image file exists

### Text hard to read
- Increase gradient opacity
- Use darker images
- Add more drop-shadow to text

### Slow loading
- Optimize image file size
- Use WebP format
- Implement lazy loading
- Use CDN for images

## Best Practices

1. **Consistency:** Use similar style images across all cards
2. **Quality:** Always use high-resolution images
3. **Relevance:** Choose images that represent your product
4. **Performance:** Optimize all images before uploading
5. **Accessibility:** Always include alt text

---

**Need Help?** Check the example in `app/page.tsx` (line 39)
