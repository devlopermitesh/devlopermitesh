import Footer from '@/components/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getMediaUrl } from '@/utils/media'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'blogs',
    where: {
      slug: {
        equals: slug,
      },
      published: {
        equals: true,
      },
    },
    limit: 1,
  })

  const blog = docs[0]

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  const imageUrl = getMediaUrl(blog.featuredImage)

  return {
    title: `${blog.title} | ${siteConfig.name}`,
    description: blog.excerpt || blog.title,
    alternates: {
      canonical: `${siteConfig.url.replace(/\/$/, '')}/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      type: 'article',
      url: `${siteConfig.url.replace(/\/$/, '')}/blogs/${blog.slug}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  }
}

const BlogDetailPage = async ({ params }: Props) => {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'blogs',
    where: {
      slug: {
        equals: slug,
      },
      published: {
        equals: true,
      },
    },
    limit: 1,
    depth: 2,
  })

  const blog = docs[0]

  if (!blog) {
    notFound()
  }

  const imageUrl = getMediaUrl(blog.featuredImage)
  const author = typeof blog.author === 'object' ? blog.author : null

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1">
        <article className="w-full max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </Link>

          <header className="mb-12">
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              {author && <span className="font-medium">{author.name || author.email}</span>}
              <span>•</span>
              <time>
                {blog.publishDate
                  ? new Date(blog.publishDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
              </time>
            </div>
          </header>

          {imageUrl && (
            <div className="relative h-64 md:h-96 w-full mb-12 rounded-2xl overflow-hidden shadow-lg">
              <Image src={imageUrl} alt={blog.title} fill className="object-cover" priority />
            </div>
          )}

          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-black prose-a:underline prose-strong:text-gray-900">
            <RichText data={blog.content} />
          </div>
        </article>
      </main>
      <Footer footer={undefined} />
    </div>
  )
}

export default BlogDetailPage
