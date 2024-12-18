// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media, // Department Head Messages
    {
      slug: 'notices',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // Events
    {
      slug: 'events',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'startDate',
              type: 'date',
              required: true,
            },
            {
              name: 'endDate',
              type: 'date',
              required: false,
            },
          ],
        },

        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    // Staff
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  globals: [
    {
      slug: 'carousel',
      fields: [
        {
          name: 'images',
          type: 'array',
          required: true,
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
      slug: 'staff',
      fields: [
        {
          name: 'staff',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'position',
              type: 'text',
              required: true,
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'department',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
