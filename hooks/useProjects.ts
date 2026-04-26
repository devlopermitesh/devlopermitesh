import { useEffect, useState } from 'react'

export interface ProjectImage {
  image: {
    id: string
    url: string
    alt?: string
  }
  caption?: string
}

export interface ProjectTechnology {
  id: string
  name: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: ProjectTechnology[]
  images: ProjectImage[]
  demoUrl?: string
  sourceUrl?: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
}

interface FetchProjectsResponse {
  docs: Project[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
}

export const useProjects = (page: number = 1, limit: number = 6) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)

        const query = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          where: JSON.stringify({
            featured: { equals: true },
          }),
          depth: '2',
          sort: '-createdAt',
        })

        const response = await fetch(`/api/collections/projects?${query.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`)
        }

        const data: FetchProjectsResponse = await response.json()
        setProjects(data.docs)
        setTotalPages(data.totalPages)
        setHasMore(page < data.totalPages)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [page, limit])

  return { projects, loading, error, totalPages, hasMore, currentPage: page }
}
