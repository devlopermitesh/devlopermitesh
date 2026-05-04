'use client'

import { Project } from '@/payload-types'
import FastSlider, { SliderImage } from './common/FastSlider'
import { SquareArrowOutUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useMemo } from 'react'

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  type ProjectImage = {
    image?: {
      cloudinary?: {
        secure_url?: string
      }
      url?: string
    }
    caption?: string
  }

  const sliderImages: SliderImage[] = useMemo(() => {
    return (
      project.images?.reduce<SliderImage[]>((acc, item) => {
        const image = item as ProjectImage
        const src =
          typeof image.image?.cloudinary?.secure_url === 'string'
            ? image.image.cloudinary.secure_url
            : typeof image.image?.url === 'string'
              ? image.image.url
              : ''
        if (src) {
          acc.push({
            src,
            alt: image.caption ?? project.title,
          })
        }
        return acc
      }, []) ?? []
    )
  }, [project.images, project.title])
  return (
    <div className="flex w-full flex-col gap-4 py-4 md:flex-row md:py-10">
      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-first' : 'md:order-last'}`}>
        <FastSlider
          images={sliderImages}
          className="relative h-72 md:h-80  rounded-xl overflow-hidden"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-between p-4 rounded-xl ">
        <h2 className="text-white font-semibold text-2xl md:text-4xl ">
          {String(index + 1).padStart(2, '0')}
        </h2>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech, index) => (
            <span
              key={`${typeof tech === 'string' ? tech : tech.id}-${index}`}
              className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
            >
              {typeof tech === 'string' ? tech : tech.name}
            </span>
          ))}
        </div>
        <div className="flex flex-row gap-5 py-2 items-center">
          <span className="text-white flex gap-2 underline items-center">
            <SquareArrowOutUpRight className="size-5" />
            <a href={project.demoUrl ?? ''} target="_blank" rel="noreferrer noopener">
              visit
            </a>
          </span>

          <span className="text-white flex gap-2 underline items-center">
            <FaGithub className="size-5" />
            <a href={project.sourceUrl ?? ''} target="_blank" rel="noreferrer noopener">
              source_code
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
