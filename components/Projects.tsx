'use client'

import { Project } from '@/payload-types'
import { useEffect, useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectSkelton'

type ProjectSectionProps = {
  title?: string | null
  description?: string | null
}

const ProjectSection = ({ title, description }: ProjectSectionProps) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const res = await fetch('/api/projects?depth=2&limit=50')

        if (!res.ok) {
          const message = `HTTP ${res.status}: ${res.statusText}`
          setError(message)
          return
        }

        const response: unknown = await res.json()
        const docs =
          response && typeof response === 'object' && 'docs' in response
            ? (response as { docs?: Project[] }).docs
            : undefined
        const data = Array.isArray(docs) ? docs : []

        if (!data) {
          setError('No project found!')
          return null
        }
        setProjects(data)
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const memoizedProjects = useMemo(() => projects, [projects])
  return (
    <section
      id="project"
      className="w-full min-h-auto flex flex-col items-center justify-center py-10 bg-black"
    >
      <h2 className="text-3xl md:text-4xl text-center text-gray-100 mb-8">
        {(title ?? 'My Work').split(' ')[0] ?? 'My'}{' '}
        <span className=" font-semibold text-white">
          {(title ?? 'My Work').split(' ').slice(1).join(' ') || 'Work'}
        </span>
      </h2>
      {description ? (
        <p className="text-sm md:text-base text-center text-gray-400 max-w-2xl mb-6 px-4">
          {description}
        </p>
      ) : null}

      <div className="flex w-full max-w-7xl flex-col px-4 md:px-8">
        {error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : loading ? (
          Array.from({ length: 3 }).map((_v, index) => (
            <ProjectCardSkeleton index={index} key={index} />
          ))
        ) : (
          memoizedProjects.map((project, index) => (
            <ProjectCard key={project.id} index={index} project={project} />
          ))
        )}
      </div>
    </section>
  )
}
export default ProjectSection
