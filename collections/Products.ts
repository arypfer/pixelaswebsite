import type { CollectionConfig } from 'payload'
import { isAuthenticated } from './access'
import { revalidateProduct } from './hooks/revalidateProduct'

const lucideIconOptions = [
  { label: 'Zap', value: 'Zap' },
  { label: 'Star', value: 'Star' },
  { label: 'Globe', value: 'Globe' },
  { label: 'Shield', value: 'Shield' },
  { label: 'Palette', value: 'Palette' },
  { label: 'Layers', value: 'Layers' },
  { label: 'Camera', value: 'Camera' },
  { label: 'Image', value: 'Image' },
  { label: 'Wand2', value: 'Wand2' },
  { label: 'Sparkles', value: 'Sparkles' },
  { label: 'Cpu', value: 'Cpu' },
  { label: 'Monitor', value: 'Monitor' },
  { label: 'Smartphone', value: 'Smartphone' },
  { label: 'Download', value: 'Download' },
  { label: 'Upload', value: 'Upload' },
  { label: 'Settings', value: 'Settings' },
  { label: 'Sliders', value: 'Sliders' },
  { label: 'Paintbrush', value: 'Paintbrush' },
  { label: 'Pen', value: 'Pen' },
  { label: 'Type', value: 'Type' },
  { label: 'Layout', value: 'Layout' },
  { label: 'Grid', value: 'Grid' },
  { label: 'Box', value: 'Box' },
  { label: 'Crop', value: 'Crop' },
  { label: 'Maximize', value: 'Maximize' },
  { label: 'Eye', value: 'Eye' },
  { label: 'Droplet', value: 'Droplet' },
  { label: 'Sun', value: 'Sun' },
  { label: 'Moon', value: 'Moon' },
  { label: 'Rocket', value: 'Rocket' },
  { label: 'Target', value: 'Target' },
  { label: 'Award', value: 'Award' },
  { label: 'Heart', value: 'Heart' },
  { label: 'Clock', value: 'Clock' },
  { label: 'Check', value: 'Check' },
]

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'featured', 'visible', 'order'],
  },
  access: {
    read: () => ({ visible: { equals: true } }),
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    afterChange: [revalidateProduct],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'tagline',
              type: 'text',
            },
            {
              name: 'shortDescription',
              type: 'textarea',
            },
            {
              name: 'category',
              type: 'select',
              required: true,
              options: [
                { label: 'Standalone Apps', value: 'Standalone Apps' },
                { label: 'Photoshop Plugins', value: 'Photoshop Plugins' },
                { label: 'AI Tools', value: 'AI Tools' },
              ],
            },
            {
              name: 'badge',
              type: 'text',
              admin: {
                description: 'Optional badge text (e.g. "New", "Popular", "AI-Powered")',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'richText',
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  options: lucideIconOptions,
                  defaultValue: 'Star',
                  admin: {
                    description: 'Lucide icon to display',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Pricing & Links',
          fields: [
            {
              name: 'price',
              type: 'number',
            },
            {
              name: 'priceLabel',
              type: 'text',
            },
            {
              name: 'buyUrl',
              type: 'text',
              admin: {
                description: 'Primary buy link (used if no platform-specific links are set)',
              },
            },
            {
              name: 'buyLinks',
              type: 'array',
              admin: {
                description: 'Platform-specific buy links (e.g. Windows, Mac Apple Silicon, Mac Intel)',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Button text (e.g. "Windows", "Mac Apple Silicon", "Mac Intel")',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'primary',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Highlight this as the primary/recommended option',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: {
                description: 'Custom page title for search engines (defaults to product name)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              admin: {
                description: 'Custom description for search engines (defaults to short description)',
              },
            },
          ],
        },
      ],
    },
  ],
}
