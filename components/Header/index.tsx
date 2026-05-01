'use client'
import useRoutes from './hooks/useRouter'
import Logo from './Logo'
import source from '@/assets/darklogo.png'
import RouteLink from './RouteLink'
import { Download } from 'lucide-react'
import MobileMenu from './MobileMenu'
import { useState } from 'react'
import MenuBarIcon from './MenuBarIcon'
import { siteConfig } from '@/config/site'
const Header = () => {
  const [open, setopen] = useState(false)

  const routers = useRoutes()
  return (
    <nav className="flex flex-row h-16 w-full max-w-7xl mx-auto items-center md:justify-around justify-between ">
      {/* Logo Text */}
      <div className="flex p-1 items-center justify-center">
        <Logo src={source.src} height={40} width={40} className="size-8" />
        <h3 className="text-center text-xl font-bold text-white dark:text-black">MITESH</h3>
      </div>
      <ul className="hidden md:flex flex-row rounded-2xl  border border-black shadow-2xl gap-2 items-center justify-around ">
        {routers.routes.length > 0 &&
          routers.routes.map((route) => (
            <RouteLink key={route.path} active={route.active} name={route.name} path={route.path} />
          ))}
      </ul>
      <a
        href={siteConfig.resumeUrl || '#'}
        target={siteConfig.resumeUrl ? '_blank' : undefined}
        rel={siteConfig.resumeUrl ? 'noreferrer noopener' : undefined}
        className="hidden md:flex items-center  gap-1 md:p-2 bg-white dark:bg-black rounded text-center text-md"
      >
        RESUME
        <Download size={17} />
      </a>
      <div className="">
        <MenuBarIcon className="" isOpen={open === true} onClick={() => setopen((prev) => !prev)} />
        {open && <MobileMenu open={open} />}
      </div>
    </nav>
  )
}
export default Header
