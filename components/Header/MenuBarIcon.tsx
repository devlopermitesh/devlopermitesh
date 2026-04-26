'use client'

import { motion } from 'framer-motion'

const MenuBarIcon = ({
  className,
  isOpen,
  onClick,
}: {
  className?: string
  isOpen: boolean
  onClick: () => void
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex md:hidden flex-col justify-center items-center h-10 w-12 gap-2 cursor-pointer ${className}`}
    >
      {/* Top Line */}
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0,
        }}
        className="block w-8 h-1 bg-black rounded-full"
      />

      {/* Middle Line */}
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        className="block w-8 h-1 bg-black rounded-full"
      />

      {/* Bottom Line */}
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0,
        }}
        className="block w-8 h-1 bg-black rounded-full"
      />
    </div>
  )
}

export default MenuBarIcon
