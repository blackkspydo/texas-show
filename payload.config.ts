import { buildConfig } from 'payload/config';
import { slateEditor } from '@payloadcms/richtext-slate';

export default buildConfig({
  collections: [
    // Department Head Messages
    {
      slug: 'messages',
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
          name: 'content',
          type: 'richText',
          editor: slateEditor({}),
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // Notices
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
          type: 'richText',
          editor: slateEditor({}),
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
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            {
              label: 'Today\'s Activity',
              value: 'activity',
            },
            {
              label: 'Upcoming Event',
              value: 'upcoming',
            },
          ],
        },
      ],
    },
    // Staff
    {
      slug: 'staff',
      admin: {
        useAsTitle: 'name',
      },
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
          type: 'select',
          options: [
            { label: 'Department Head', value: 'head' },
            { label: 'Academic Coordinator', value: 'academic' },
            { label: 'Full Time Faculty', value: 'faculty' },
          ],
        },
      ],
    },
  ],
});

