'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { createElement, useMemo, useState } from 'react'
import { getSkillIcon } from '@/utils/skillIcons'

const SkillCard = ({
  skill,
}: {
  skill: {
    name: string
    category: string
    proficiency: number
  }
}) => {
  const [expanded, setExpanded] = useState(false)
  const iconElement = useMemo(() => {
    const Icon = getSkillIcon(skill.name)
    return createElement(Icon, { className: 'h-8 w-8' })
  }, [skill.name])

  const categoryLabel = useMemo(
    () =>
      skill.category
        .toString()
        .split(/[-_\s]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    [skill.category]
  )

  const visible = expanded

  return (
    <motion.button
      type="button"
      onClick={() => setExpanded((value) => !value)}
      onBlur={() => setExpanded(false)}
      initial="initial"
      animate={visible ? 'hover' : 'initial'}
      whileHover="hover"
      className="group relative w-full aspect-square overflow-hidden rounded-3xl border-2 border-slate-200 bg-white text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
    >
      <motion.div
        variants={{
          initial: { backgroundColor: 'rgba(255,255,255,1)' },
          hover: { backgroundColor: 'rgba(15,23,42,0.95)' },
        }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 py-6 text-center transition-colors duration-300 group-hover:text-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-lg">
          {iconElement}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-white transition-colors">
            {skill.name}
          </h3>
          <p className="text-sm text-slate-500 group-hover:text-slate-200 transition-colors">
            {categoryLabel}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {(visible || false) && (
          <motion.div
            key="expanded-overlay"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/95 px-4 text-center text-white"
          >
            <div className="space-y-2">
              <p className="text-base font-semibold">{skill.name}</p>
              <p className="text-sm text-slate-300">{categoryLabel}</p>
              <p className="text-sm text-slate-300">Proficiency: {skill.proficiency}%</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default SkillCard
