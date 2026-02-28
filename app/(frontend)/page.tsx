import { getPayload } from 'payload'
import config from '@payload-config'
import { HomeClient } from './HomeClient'

export const revalidate = 60 // re-fetch from DB at most every 60 seconds

export default async function Home() {
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    where: {
      visible: { equals: true },
    },
    sort: 'order',
    limit: 100,
    depth: 1,
  })

  // Serialize for client component (strip non-serializable data)
  const serializedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline: product.tagline || '',
    shortDescription: product.shortDescription || '',
    category: product.category,
    price: product.price || 0,
    priceLabel: product.priceLabel || '',
    buyUrl: product.buyUrl,
    coverImage:
      typeof product.coverImage === 'object' && product.coverImage !== null
        ? { url: product.coverImage.url || '', alt: product.coverImage.alt || product.name }
        : null,
    badge: product.badge || null,
    featured: product.featured || false,
    order: product.order || 0,
  }))

  return <HomeClient products={serializedProducts} />
}
