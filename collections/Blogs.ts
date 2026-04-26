import { CollectionConfig } from 'payload'
import { canManageBlogs } from './lib/access'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    group: 'Content Management',
  },
  access: {
    read: ({ req }) => {
      // Published blogs are public, drafts only for admins
      if (canManageBlogs({ req })) return true
      return { published: { equals: true } }
    },
    create: canManageBlogs,
    update: canManageBlogs,
    delete: canManageBlogs,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 300,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        condition: (data) => data.published,
      },
    },
  ],
}
