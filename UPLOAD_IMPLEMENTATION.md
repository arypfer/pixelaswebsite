# 📤 File Upload Implementation Guide

## 🚀 Complete File Upload Setup

### **Step 1: Install Required Packages**
```bash
npm install formidable @types/formidable
```

### **Step 2: Complete the API Route**
Replace the placeholder in `/app/api/upload/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedFiles: string[] = [];

    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, buffer);
        uploadedFiles.push(filename);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Uploaded ${uploadedFiles.length} files`,
      files: uploadedFiles
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// GET endpoint to list uploaded images (already implemented)
export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');

    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(imagesDir);
    const images = files.filter(file =>
      file.endsWith('.jpg') ||
      file.endsWith('.jpeg') ||
      file.endsWith('.png') ||
      file.endsWith('.webp')
    );

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to list images', details: (error as Error).message },
      { status: 500 }
    );
  }
}
```

### **Step 3: Test the Upload**
1. Go to `/admin` in your browser
2. Click "Upload Images" button
3. Select multiple image files
4. Images should appear in the gallery below
5. Click any image to copy its path or use it in product editing

## 📋 **Current Features Ready**

### **✅ What's Working Now:**
- **Upload Button**: Click to select multiple files
- **Image Gallery**: Shows all uploaded images
- **Click to Use**: Click images to apply them to products
- **Path Copying**: Click images outside editing to copy paths
- **Progress Feedback**: Upload status and error handling

### **🔧 What Needs Implementation:**
- **File Processing**: Install formidable and update API route
- **File Validation**: Size limits, type checking
- **Error Handling**: Better error messages and recovery

## 🎯 **How It Works**

1. **Upload**: Files go to `/public/images/products/`
2. **Display**: Gallery shows thumbnails of uploaded images
3. **Integration**: Click images to use them in product forms
4. **Paths**: Automatic path generation (`/images/products/filename.jpg`)

## 🚀 **Quick Test (Without Full Implementation)**

Even without formidable installed, you can:
1. Manually upload images to `/public/images/products/`
2. See them appear in the admin gallery
3. Use them in your products

The interface is ready - just add the backend processing! 🎉
