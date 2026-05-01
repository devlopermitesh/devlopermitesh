import { useEffect, useMemo, useState } from 'react'

const routes = [
  { path: '/about', name: 'About' },
  { path: '/skills', name: 'Skills' },
  { path: '/project', name: 'Projects' },
  { path: '/contact-me', name: 'Contact Me' },
]

const useRoutes = () => {
  const [activePath, setActivePath] = useState<string>('')

  useEffect(() => {
    const routeIds = routes.map((route) => route.path.replace(/^[#/]/, ''))

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      const route = routes.find((route) => route.path.replace(/^[#/]/, '') === hash)
      if (route) {
        setActivePath(route.path)
      }
    }

    handleHashChange()

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length === 0) {
          return
        }

        const mostVisible = visibleEntries.reduce((current, next) =>
          next.intersectionRatio > current.intersectionRatio ? next : current
        )

        const id = mostVisible.target.id
        const route = routes.find((route) => route.path.replace(/^[#/]/, '') === id)
        if (route) {
          setActivePath(route.path)
        }
      },
      {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    )

    routeIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const routesWithActive = useMemo(
    () =>
      routes.map((route) => ({
        ...route,
        active: route.path === activePath,
      })),
    [activePath]
  )

  const activeRoute = routesWithActive.find((r) => r.active)

  return {
    routes: routesWithActive,
    activeRoute,
  }
}

export default useRoutes
