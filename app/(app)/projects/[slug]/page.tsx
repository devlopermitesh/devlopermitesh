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
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const project = docs[0]

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const imageUrl = project.images?.[0] ? getMediaUrl((project.images[0] as any).image) : undefined

  return {
    title: `${project.title} | ${siteConfig.name}`,
    description: project.description,
    alternates: {
      canonical: `${siteConfig.url.replace(/\/$/, '')}/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `${siteConfig.url.replace(/\/$/, '')}/projects/${project.slug}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  }
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 3,
  })

  const project = docs[0]

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1">
        <article className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <Link
            href="/#project"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              {project.status && (
                <span className="text-xs px-3 py-1 bg-black text-white rounded-full capitalize">
                  {project.status.replace('-', ' ')}
                </span>
              )}
              {project.featured && (
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </header>

          {(project.demoUrl || project.sourceUrl) && (
            <div className="flex flex-wrap gap-4 mb-12">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black border-2 border-black rounded-xl hover:bg-black hover:text-white transition"
                >
                  <FaGithub className="w-4 h-4" />
                  View Source
                </a>
              )}
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <div className="mb-12 space-y-6">
              {project.images.map((item: any, idx: number) => {
                const imageUrl = getMediaUrl(item.image)
                if (!imageUrl) return null
                return (
                  <div
                    key={idx}
                    className="relative h-64 md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src={imageUrl}
                      alt={item.caption || `${project.title} screenshot ${idx + 1}`}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <p className="text-white text-sm">{item.caption}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: any, idx: number) => {
                  const techName = typeof tech === 'string' ? tech : tech.name
                  return (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium shadow-md"
                    >
                      {techName}
                    </span>
                  )
                })}
              </div>
            </section>
          )}

          {project.longDescription && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Project Details
              </h2>
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-black prose-a:underline prose-strong:text-gray-900">
                <RichText data={project.longDescription} />
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer footer={undefined} />
    </div>
  )
}

export default ProjectDetailPage
