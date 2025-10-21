# 🎴 Image-to-Product Linking Guide

## 📋 Current Product Data Structure

Each product has **two image fields**:

```javascript
{
  title: "Software Pixelas Studio",
  image: "URL_FOR_CARD_VIEW",        // 600x450px - shows in grid
  detailedImage: "URL_FOR_MODAL",    // 1200x900px - shows in popup
  // ... other fields
}
```

## 🔗 How Images Connect to Cards

### **Product Card View** (Grid)
- Uses the **`image`** field
- Background image in each card
- 600×450px recommended

### **Product Modal View** (Popup)
- Uses the **`detailedImage`** field  
- Large image in detail modal
- 1200×900px recommended

## 📁 Recommended File Naming & Linking

```
📦 public/images/products/
├── 📄 pixelas-studio-card.jpg     → image: "/images/products/pixelas-studio-card.jpg"
├── 📄 pixelas-studio-modal.jpg    → detailedImage: "/images/products/pixelas-studio-modal.jpg"
├── 📄 amlo-pose-card.jpg          → image: "/images/products/amlo-pose-card.jpg"
├── 📄 amlo-pose-modal.jpg         → detailedImage: "/images/products/amlo-pose-modal.jpg"
└── 📄 photoshop-plugin-card.jpg   → image: "/images/products/photoshop-plugin-card.jpg"
```

## 🔄 Replace Unsplash URLs in Admin

### **For "Software Pixelas Studio":**
```javascript
// In admin panel, replace:
image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop"
// With:
image: "/images/products/pixelas-studio-card.jpg"

detailedImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop"
// With:
detailedImage: "/images/products/pixelas-studio-modal.jpg"
```

## 📝 Step-by-Step Process

1. **Upload images** to `/public/images/products/`
2. **Go to `/admin`** in your browser
3. **Edit each product**
4. **Replace URLs** in "Card Image" and "Modal Image" fields
5. **Save changes** - images update immediately

## 🎯 Example Mapping

| Product Title | Card Image Path | Modal Image Path |
|---------------|----------------|------------------|
| Software Pixelas Studio | `/images/products/pixelas-studio-card.jpg` | `/images/products/pixelas-studio-modal.jpg` |
| Aplikasi Amlo Pose | `/images/products/amlo-pose-card.jpg` | `/images/products/amlo-pose-modal.jpg` |
| Aplikasi Shotto | `/images/products/shotto-card.jpg` | `/images/products/shotto-modal.jpg` |

**That's it! Each product gets exactly two images - one for the card view and one for the detailed modal view.** 🎨
