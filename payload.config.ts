import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.SUPABASE_STORAGE_BUCKET || 'product-images',
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_STORAGE_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_STORAGE_SECRET_ACCESS_KEY || '',
        },
        region: process.env.SUPABASE_STORAGE_REGION || 'ap-southeast-1',
        endpoint: process.env.SUPABASE_STORAGE_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
})
