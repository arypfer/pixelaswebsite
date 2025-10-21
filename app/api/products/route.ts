import { NextRequest, NextResponse } from 'next/server';
import { allProducts } from '@/lib/products';
import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load products from file or fallback to static data
const loadProducts = () => {
  try {
    ensureDataDir();
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading products from file:', error);
  }
  return allProducts;
};

// Save products to file
const saveProducts = (products: any[]) => {
  try {
    ensureDataDir();
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving products to file:', error);
    return false;
  }
};

export async function GET() {
  try {
    const products = loadProducts();
    return NextResponse.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { products } = await request.json();

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Invalid products data' },
        { status: 400 }
      );
    }

    // Save the updated products
    const saved = saveProducts(products);

    if (!saved) {
      return NextResponse.json(
        { error: 'Failed to save products' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Products updated successfully',
      products
    });
  } catch (error) {
    console.error('Error updating products:', error);
    return NextResponse.json(
      { error: 'Failed to update products' },
      { status: 500 }
    );
  }
}
