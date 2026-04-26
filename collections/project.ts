import { CollectionConfig } from 'payload'
import { canManageProjects } from './lib/access'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Content Management',
  },
  access: {
    read: ({ req }) => {
      // Featured projects are public, others only for admins
      if (canManageProjects({ req })) return true
      return { featured: { equals: true } }
    },
    create: canManageProjects,
    update: canManageProjects,
    delete: canManageProjects,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'longDescription',
      type: 'richText',
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'demoUrl',
      type: 'text',
    },
    {
      name: 'sourceUrl',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Planned', value: 'planned' },
      ],
      defaultValue: 'completed',
    },
  ],
}
