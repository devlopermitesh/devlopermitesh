import { GlobalConfig } from 'payload'

export const Portfolio: GlobalConfig = {
  slug: 'portfolio',
  admin: {
    group: 'Portfolio Settings',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ctaButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'style',
          type: 'group',
          fields: [
            {
              name: 'layout',
              type: 'select',
              options: [
                { label: 'Centered', value: 'centered' },
                { label: 'Left Aligned', value: 'left' },
                { label: 'Right Aligned', value: 'right' },
              ],
              defaultValue: 'centered',
            },
            {
              name: 'textColor',
              type: 'text',
              defaultValue: '#ffffff',
            },
            {
              name: 'backgroundColor',
              type: 'text',
              defaultValue: '#000000',
            },
          ],
        },
        {
          name: 'responsive',
          type: 'group',
          fields: [
            {
              name: 'mobileLayout',
              type: 'select',
              options: [
                { label: 'Stack', value: 'stack' },
                { label: 'Inline', value: 'inline' },
              ],
              defaultValue: 'stack',
            },
            {
              name: 'tabletBreakpoint',
              type: 'number',
              defaultValue: 768,
            },
            {
              name: 'desktopBreakpoint',
              type: 'number',
              defaultValue: 1024,
            },
          ],
        },
      ],
    },
    {
      name: 'aboutMe',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'profileImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'skills',
          type: 'relationship',
          relationTo: 'skills',
          hasMany: true,
        },
        {
          name: 'style',
          type: 'group',
          fields: [
            {
              name: 'layout',
              type: 'select',
              options: [
                { label: 'Two Column', value: 'two-column' },
                { label: 'Single Column', value: 'single' },
              ],
              defaultValue: 'two-column',
            },
            {
              name: 'imagePosition',
              type: 'select',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              defaultValue: 'left',
            },
          ],
        },
        {
          name: 'responsive',
          type: 'group',
          fields: [
            {
              name: 'mobileStack',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: 'myWork',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'featuredProjects',
          type: 'relationship',
          relationTo: 'projects',
          hasMany: true,
          filterOptions: {
            featured: {
              equals: true,
            },
          },
        },
        {
          name: 'style',
          type: 'group',
          fields: [
            {
              name: 'displayType',
              type: 'select',
              options: [
                { label: 'Grid', value: 'grid' },
                { label: 'List', value: 'list' },
                { label: 'Carousel', value: 'carousel' },
              ],
              defaultValue: 'grid',
            },
            {
              name: 'columns',
              type: 'number',
              min: 1,
              max: 4,
              defaultValue: 3,
            },
          ],
        },
        {
          name: 'responsive',
          type: 'group',
          fields: [
            {
              name: 'mobileColumns',
              type: 'number',
              min: 1,
              max: 2,
              defaultValue: 1,
            },
            {
              name: 'tabletColumns',
              type: 'number',
              min: 1,
              max: 3,
              defaultValue: 2,
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          required: true,
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'GitHub', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Email', value: 'email' },
                { label: 'Website', value: 'website' },
              ],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'quickLinks',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'style',
          type: 'group',
          fields: [
            {
              name: 'backgroundColor',
              type: 'text',
              defaultValue: '#f8f9fa',
            },
            {
              name: 'textColor',
              type: 'text',
              defaultValue: '#333333',
            },
          ],
        },
      ],
    },
  ],
}
