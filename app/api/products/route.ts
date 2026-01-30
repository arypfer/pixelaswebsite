import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { allProducts } from '@/lib/products';

// Product type definition
type Product = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  featured: boolean;
  link: string;
  image: string;
  category: string;
  detailedDescription: string;
  features: string[];
  detailedImage: string;
  downloadButtons: any[];
  icon: string | React.ReactElement;
  createdAt: string;
  updatedAt: string;
};

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('Supabase URL configured:', !!supabaseUrl);
console.log('Supabase Key configured:', !!supabaseServiceKey);

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase credentials not found. Using static data fallback.');
}

// Create Supabase client
const supabase = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

function mapDbProductToApp(product: any): Product {
  return {
    id: product.id,
    title: product.title,
    subtitle: product.subtitle,
    description: product.description,
    featured: product.featured,
    link: product.link,
    image: product.image,
    category: product.category,
    detailedDescription: product.detaileddescription,
    features: product.features ?? [],
    detailedImage: product.detailedimage,
    downloadButtons: product.downloadbuttons ?? [],
    icon: product.icon ?? 'Star',
    createdAt: product.created_at,
    updatedAt: product.updated_at
  };
}

// Get products from Supabase
async function getProductsFromSupabase(): Promise<Product[]> {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return allProducts as unknown as Product[]; // Fallback if no credentials
    }

    // This check is already done above, but TypeScript needs to know supabase is not null
    if (!supabase) return allProducts as unknown as Product[];

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return allProducts as unknown as Product[];
    }

    if (!data) {
      return [];
    }

    return data.length > 0 ? data.map(mapDbProductToApp) : [];
  } catch (error) {
    console.error('Error fetching products from Supabase:', error);
    return allProducts as unknown as Product[];
  }
}

// Save products to Supabase
async function saveProductsToSupabase(products: any[]) {
  console.log('Attempting to save products to Supabase, count:', products.length);
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      console.log('No Supabase credentials, skipping save');
      return false; // No credentials available
    }

    // Clear existing products
    console.log('Clearing existing products...');

    if (!supabase) return false;

    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.error('Error clearing products:', deleteError);
      return false;
    }
    console.log('Products cleared successfully');

    if (products.length === 0) {
      console.log('No products provided after clearing. Leaving table empty.');
      return true;
    }

    // Insert new products with timestamps, mapping to correct schema column names
    const productsWithTimestamps = products.map(product => ({
      title: product.title,
      subtitle: product.subtitle,
      description: product.description,
      featured: product.featured,
      link: product.link,
      image: product.image,
      category: product.category,
      detaileddescription: product.detailedDescription,
      features: product.features,
      detailedimage: product.detailedImage,
      downloadbuttons: product.downloadButtons,
      icon: product.icon ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
    console.log('Inserting products:', productsWithTimestamps.length);

    if (!supabase) return false;

    const { error: insertError } = await supabase
      .from('products')
      .insert(productsWithTimestamps);

    if (insertError) {
      console.error('Error inserting products:', insertError);
      return false;
    }

    console.log('Products inserted successfully');
    return true;
  } catch (error) {
    console.error('Error saving products to Supabase:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const products = await getProductsFromSupabase();

    // Get the base URL for redirects
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // Wrap product links with redirect to bypass in-app browser blocking
    const modifiedProducts = products.map(product => ({
      ...product,
      link: `${baseUrl}/redirect?url=${encodeURIComponent(product.link)}`
    }));

    return NextResponse.json({
      success: true,
      products: modifiedProducts,
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
