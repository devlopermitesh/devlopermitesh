'use client'

import { motion } from 'framer-motion'

interface RouteLinkProps {
  name: string
  path: string // "#about"
  active: boolean
}

const RouteLink = ({ name, path, active }: RouteLinkProps) => {
  const href = path.startsWith('/') ? `#${path.slice(1)}` : path

  return (
    <li className="list-none">
      <a href={href} aria-current={active ? 'page' : undefined}>
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`block rounded-full px-4 py-2 text-sm font-medium transition
            ${active ? 'bg-black text-white' : 'text-black hover:underline'}
          `}
        >
          {name}
        </motion.span>
      </a>
    </li>
  )
}

export default RouteLink
