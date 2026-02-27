import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const all = searchParams.get('all');

    // Map style IDs to folder names and display names
    const styleMap = [
      { id: '1', folder: 'fuji-5', name: 'Fuji 5' },
      { id: '2', folder: 'clean-film', name: 'Clean Film' },
      { id: '3', folder: 'kodak-alaris', name: 'Kodak Alaris' },
      { id: '4', folder: 'kodak-ektar', name: 'Kodak Ektar' },
      { id: '5', folder: 'silvergreen', name: 'Silvergreen' },
      { id: '6', folder: 'fuji-natura-1600', name: 'Fuji Natura 1600' },
      { id: '7', folder: 'puretone-2', name: 'Puretone 2' },
      { id: '8', folder: 'kodak-satin', name: 'Kodak Satin' }
    ];

    // If all=true, return all galleries
    if (all === 'true') {
      const galleries = styleMap.map(style => {
        const galleryPath = path.join(process.cwd(), 'public', 'canonstyle', 'gallery', style.folder);
        
        // Check if directory exists
        if (!fs.existsSync(galleryPath)) {
          return { styleName: style.name, images: [] };
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
          .map(file => `/canonstyle/gallery/${style.folder}/${file}`);

        return { styleName: style.name, images };
      });

      return NextResponse.json({ galleries });
    }

    // Single style gallery (legacy support)
    const styleId = searchParams.get('style');
    if (!styleId) {
      return NextResponse.json({ error: 'Style ID required' }, { status: 400 });
    }

    const style = styleMap.find(s => s.id === styleId);
    if (!style) {
      return NextResponse.json({ error: 'Invalid style ID' }, { status: 400 });
    }

    const galleryPath = path.join(process.cwd(), 'public', 'canonstyle', 'gallery', style.folder);

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
      .map(file => `/canonstyle/gallery/${style.folder}/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading gallery:', error);
    return NextResponse.json({ galleries: [] });
  }
}
