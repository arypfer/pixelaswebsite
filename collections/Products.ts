import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'featured', 'visible', 'order'],
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
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'richText',
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
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name (e.g. "Zap", "Star", "Globe")',
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
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Optional badge text (e.g. "New", "Popular", "AI-Powered")',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
