import { NextRequest, NextResponse } from 'next/server';
import { allProducts } from '@/lib/products';

export async function GET() {
  try {
    // In a real app, this would fetch from a database
    // For now, return the static products data
    return NextResponse.json({
      success: true,
      products: allProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
