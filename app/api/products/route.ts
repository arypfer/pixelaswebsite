import { NextRequest, NextResponse } from 'next/server';
import { allProducts } from '@/lib/products';

// For now, use static data since Vercel doesn't support persistent file writes
// In production, you'd use Vercel KV, MongoDB, or another database
const getStoredProducts = () => {
  // For Vercel deployment, return static data
  // Admin changes are handled via localStorage sync
  return allProducts;
};

const updateStoredProducts = (products: any[]) => {
  // For Vercel deployment, this is a no-op
  // Admin changes are handled via localStorage sync
  console.log('Products update requested:', products.length, 'products');
  return true;
};

export async function GET() {
  try {
    const products = getStoredProducts();
    return NextResponse.json({
      success: true,
      products,
      note: "Using static data - admin changes sync via localStorage"
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

    // For Vercel, just acknowledge the update
    // Real persistence would require Vercel KV or database
    updateStoredProducts(products);

    return NextResponse.json({
      success: true,
      message: 'Products update acknowledged',
      products,
      note: "Changes saved locally - use localStorage sync for multi-user updates"
    });
  } catch (error) {
    console.error('Error updating products:', error);
    return NextResponse.json(
      { error: 'Failed to update products' },
      { status: 500 }
    );
  }
}
