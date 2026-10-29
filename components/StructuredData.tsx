import { siteConfig } from '@/config/site'

export default function StructuredData() {
  const baseUrl = siteConfig.url.replace(/\/$/, '')

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    logo: `${baseUrl}/favicon.ico`,
    sameAs: ['https://github.com/devlopermitesh'],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.name} Portfolio`,
    url: baseUrl,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: siteConfig.title,
    description: siteConfig.description,
    url: baseUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: `${siteConfig.name} Portfolio`,
      url: baseUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
    </>
  )
}
