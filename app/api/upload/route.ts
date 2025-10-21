import { NextRequest, NextResponse } from 'next/server';
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
    // Get the form data
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
        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name;
        const extension = path.extname(originalName);
        const baseName = path.basename(originalName, extension);
        const filename = `${timestamp}-${baseName}${extension}`;

        const filepath = path.join(uploadDir, filename);

        // Convert file to buffer and save
        const buffer = Buffer.from(await file.arrayBuffer());
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
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// GET endpoint to list uploaded images
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
