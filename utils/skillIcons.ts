import type { IconType } from 'react-icons'
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { Code2 } from 'lucide-react'

const iconMap: Array<{
  aliases: string[]
  Icon: IconType
}> = [
  { aliases: ['react'], Icon: SiReact },
  { aliases: ['next.js', 'nextjs', 'next'], Icon: SiNextdotjs },
  { aliases: ['typescript', 'ts'], Icon: SiTypescript },
  { aliases: ['javascript', 'js'], Icon: SiJavascript },
  { aliases: ['node.js', 'nodejs', 'node'], Icon: SiNodedotjs },
  { aliases: ['express'], Icon: SiExpress },
  { aliases: ['mongodb', 'mongo'], Icon: SiMongodb },
  { aliases: ['postgresql', 'postgres', 'pg'], Icon: SiPostgresql },
  { aliases: ['tailwind', 'tailwind css'], Icon: SiTailwindcss },
  { aliases: ['git'], Icon: SiGit },
  { aliases: ['docker'], Icon: SiDocker },
]

export function getSkillIcon(skillName: string): IconType {
  const normalized = skillName.trim().toLowerCase()

  const entry = iconMap.find(({ aliases }) =>
    aliases.some((alias) => normalized === alias || normalized.includes(alias))
  )

  return entry?.Icon ?? Code2
}
