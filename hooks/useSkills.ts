import { useEffect, useMemo, useState } from 'react'

export interface Skill {
  id?: string
  name: string
  category: string
  proficiency: number
}

const endpoint = '/api/skills'

type PayloadFindResponse = {
  docs: Array<{
    id?: unknown
    _id?: unknown
    name?: unknown
    category?: unknown
    proficiency?: unknown
  }>
}

export default function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isMounted = true

    const fetchSkills = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${endpoint}?limit=100&sort=name`)

        if (!response.ok) {
          const payload = await response.json().catch(() => null)
          throw new Error(payload?.message || `Unable to load skills (${response.status})`)
        }

        const data: unknown = await response.json()

        const payload = data as Partial<PayloadFindResponse> | null

        if (!payload?.docs || !Array.isArray(payload.docs)) {
          throw new Error('Skill data is malformed')
        }

        if (isMounted) {
          setSkills(
            payload.docs.map((item) => ({
              id: String(item.id ?? item._id ?? ''),
              name: String(item.name ?? ''),
              category: String(item.category ?? ''),
              proficiency: Number(item.proficiency ?? 0),
            }))
          )
        }
      } catch (fetchError) {
        if (!isMounted) return
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load skills')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchSkills()

    return () => {
      isMounted = false
    }
  }, [retryCount])

  const retry = () => setRetryCount((current) => current + 1)

  return useMemo(
    () => ({
      skills,
      loading,
      error,
      retry,
    }),
    [skills, loading, error]
  )
}
