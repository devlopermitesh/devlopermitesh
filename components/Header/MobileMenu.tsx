'use client'

import { motion, AnimatePresence } from 'framer-motion'
import useRoutes from './hooks/useRouter'
import RouteLink from './RouteLink'
import { Download } from 'lucide-react'
import { siteConfig } from '@/config/site'

const MobileMenu = ({ open }: { open: boolean }) => {
  const routes = useRoutes()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-15 left-0 w-full flex flex-col bg-white/90 justify-center items-center py-6 gap-4"
        >
          {routes.routes.map((route) => (
            <RouteLink key={route.path} active={route.active} name={route.name} path={route.path} />
          ))}
          <a
            href={siteConfig.resumeUrl || '#'}
            target={siteConfig.resumeUrl ? '_blank' : undefined}
            rel={siteConfig.resumeUrl ? 'noreferrer noopener' : undefined}
            className="flex px-10 md:hidden items-center  gap-1 md:p-2 bg-white dark:bg-black rounded text-center text-md"
          >
            RESUME
            <Download size={17} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
