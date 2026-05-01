import Image from 'next/image'
import AboutImage from '@/assets/column.png'
import type { Portfolio, Skill } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getMediaUrl } from '@/utils/media'

type AboutSectionProps = {
  about?: Portfolio['aboutMe']
}

const fallbackExpertise = [
  'Full-Stack Development',
  'React & Next.js',
  'TypeScript',
  'Database Design',
  'API Development',
  'Cloud Technologies',
]

const AboutSection = ({ about }: AboutSectionProps) => {
  const title = about?.title ?? 'About Me'
  const profileImageSrc = getMediaUrl(about?.profileImage) ?? AboutImage.src

  const expertise =
    about?.skills
      ?.map((skill) => (typeof skill === 'string' ? null : skill))
      .filter((skill): skill is Skill => Boolean(skill && typeof skill.name === 'string'))
      .map((skill) => skill.name)
      .slice(0, 6) ?? fallbackExpertise

  return (
    <section
      id="about"
      className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 md:px-8"
    >
      <div className="max-w-6xl w-full">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 mb-12">
          {title.split(' ')[0] ?? 'About'}{' '}
          <span className="font-semibold text-black">
            {title.split(' ').slice(1).join(' ') || 'Me'}
          </span>
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center order-1 md:order-1">
            <div className="relative w-full max-w-sm h-auto">
              <Image
                src={profileImageSrc}
                alt="Profile photograph"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="rounded-lg shadow-lg object-cover w-full h-auto"
                width={420}
                height={520}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 order-1 md:order-2">
            {about?.content ? (
              <RichText
                data={about.content}
                className="text-base md:text-lg text-gray-700 leading-relaxed [&_p]:mb-6 [&_p:last-child]:mb-0"
              />
            ) : (
              <>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  I&apos;m a passionate full-stack developer with a keen interest in building
                  scalable web applications. With expertise in modern JavaScript frameworks and
                  cloud technologies, I transform ideas into elegant, efficient solutions.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  My journey in tech started with a curiosity about how things work. Over the years,
                  I&apos;ve honed my skills in React, Next.js, Node.js, and various databases. I
                  believe in writing clean, maintainable code and creating user experiences that
                  delight.
                </p>
              </>
            )}

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Key Expertise</h3>
              <ul className="grid grid-cols-2 gap-3">
                {expertise.map((label) => (
                  <li key={label} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {about?.content ? null : (
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new technologies, contributing
                to open source, or sharing knowledge with the developer community. Let&apos;s
                connect and build something amazing together!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
