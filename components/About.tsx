import Image from 'next/image'
import AboutImage from '@/assets/column.png'

const AboutSection = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 md:px-8">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 mb-12">
          About <span className="font-semibold text-black">Me</span>
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center order-1 md:order-1">
            <div className="relative w-full max-w-sm h-auto">
              <Image
                src={AboutImage}
                alt="Profile photograph"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="rounded-lg shadow-lg object-cover w-full h-auto"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 order-1 md:order-2">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              I&apos;m a passionate full-stack developer with a keen interest in building scalable
              web applications. With expertise in modern JavaScript frameworks and cloud
              technologies, I transform ideas into elegant, efficient solutions.
            </p>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              My journey in tech started with a curiosity about how things work. Over the years,
              I&apos;ve honed my skills in React, Next.js, Node.js, and various databases. I believe
              in writing clean, maintainable code and creating user experiences that delight.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Key Expertise</h3>
              <ul className="grid grid-cols-2 gap-3">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Full-Stack Development
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  React & Next.js
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  TypeScript
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Database Design
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  API Development
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Cloud Technologies
                </li>
              </ul>
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies, contributing to
              open source, or sharing knowledge with the developer community. Let&apos;s connect and
              build something amazing together!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
