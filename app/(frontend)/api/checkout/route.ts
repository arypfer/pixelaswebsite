import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productSlug, name, email, mobile } = body

    if (!productSlug || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Fetch product from Payload to get the real price (prevent tampering)
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'products',
      where: { slug: { equals: productSlug }, visible: { equals: true } },
      limit: 1,
    })

    const product = docs[0]
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (!product.price || product.price <= 0) {
      return NextResponse.json({ error: 'Product has no price' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://pixelas.store'

    // Create invoice via Mayar API
    const mayarRes = await fetch('https://api.mayar.id/hl/v1/invoice/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAYAR_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        mobile: mobile || '',
        redirectUrl: `${siteUrl}/checkout/success?product=${productSlug}`,
        description: `Purchase: ${product.name}`,
        items: [
          {
            quantity: 1,
            rate: product.price,
            description: product.name,
          },
        ],
      }),
    })

    const mayarData = await mayarRes.json()

    if (mayarData.statusCode !== 200) {
      console.error('Mayar API error:', mayarData)
      return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 })
    }

    return NextResponse.json({
      paymentUrl: mayarData.data.link,
      invoiceId: mayarData.data.id,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
