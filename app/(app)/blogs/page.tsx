import Footer from '@/components/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { getMediaUrl } from '@/utils/media'
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `Blogs | ${siteConfig.name}`,
  description: 'Read articles, tutorials, and insights on web development, Next.js, React, and modern technologies.',
  alternates: {
    canonical: `${siteConfig.url.replace(/\/$/, '')}/blogs`,
  },
}

export const dynamic = 'force-dynamic'

const BlogsPage = async () => {
  const payload = await getPayload({ config })
  const { docs: blogs } = await payload.find({
    collection: 'blogs',
    where: {
      published: {
        equals: true,
      },
    },
    sort: '-publishDate',
    limit: 50,
    depth: 2,
  })

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1">
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Blog <span className="text-white [-webkit-text-stroke:1px_black]">Articles</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on web development and technology
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No blog posts published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => {
                const imageUrl = getMediaUrl(blog.featuredImage)
                return (
                  <article
                    key={blog.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <Link href={`/blogs/${blog.slug}`} className="block">
                      {imageUrl ? (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-48 w-full bg-gradient-to-br from-gray-900 to-gray-700" />
                      )}
                      <div className="p-6">
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {blog.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                              >
                                {tag.tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition line-clamp-2">
                          {blog.title}
                        </h2>
                        {blog.excerpt && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>
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
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform">Read more →</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </main>
      <Footer footer={undefined} />
    </div>
  )
}

export default BlogsPage
