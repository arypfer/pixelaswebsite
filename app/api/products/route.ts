import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { allProducts } from '@/lib/products';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase credentials not found. Using static data fallback.');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Get products from Supabase
async function getProductsFromSupabase() {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return allProducts; // Fallback if no credentials
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return allProducts;
    }

    // Return products if found, otherwise return static data
    return data && data.length > 0 ? data : allProducts;
  } catch (error) {
    console.error('Error fetching products from Supabase:', error);
    return allProducts;
  }
}

// Save products to Supabase
async function saveProductsToSupabase(products: any[]) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return false; // No credentials available
    }

    // Clear existing products
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.error('Error clearing products:', deleteError);
      return false;
    }

    // Insert new products with timestamps
    const productsWithTimestamps = products.map(product => ({
      ...product,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    const { error: insertError } = await supabase
      .from('products')
      .insert(productsWithTimestamps);

    if (insertError) {
      console.error('Error inserting products:', insertError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving products to Supabase:', error);
    return false;
  }
}

export async function GET() {
  try {
    const products = await getProductsFromSupabase();
    return NextResponse.json({
      success: true,
      products,
      source: supabaseUrl ? 'supabase' : 'static'
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', products: allProducts },
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

    // Save to Supabase
    const saved = await saveProductsToSupabase(products);

    if (!saved) {
      return NextResponse.json(
        { error: 'Failed to save products to database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Products saved to database successfully',
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
