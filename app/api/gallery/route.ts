import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const styleId = searchParams.get('style');

    if (!styleId) {
      return NextResponse.json({ error: 'Style ID required' }, { status: 400 });
    }

    // Map style IDs to folder names
    const styleFolderMap: { [key: string]: string } = {
      '1': 'fuji-natura-1600',
      '2': 'kodak-ektar',
      '3': 'puretone-2',
      '4': 'kodak-satin',
      '5': 'kodak-alaris'
    };

    const folderName = styleFolderMap[styleId];
    if (!folderName) {
      return NextResponse.json({ error: 'Invalid style ID' }, { status: 400 });
    }

    const galleryPath = path.join(process.cwd(), 'public', 'canonstyle', 'gallery', folderName);

    // Check if directory exists
    if (!fs.existsSync(galleryPath)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files from the directory
    const files = fs.readdirSync(galleryPath);
    
    // Filter for image files and create URLs
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map(file => `/canonstyle/gallery/${folderName}/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading gallery:', error);
    return NextResponse.json({ images: [] });
  }
}
