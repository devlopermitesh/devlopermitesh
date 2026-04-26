import SkillCard from './common/skillcard'

interface Skill {
  name: string
  category: string
  proficiency: number
}

const SkillSection = () => {
  const skills: Skill[] = [
    { name: 'Next.js', category: 'Frontend', proficiency: 90 },
    { name: 'React', category: 'Frontend', proficiency: 95 },
    { name: 'TypeScript', category: 'Language', proficiency: 85 },
    { name: 'JavaScript', category: 'Language', proficiency: 90 },
    { name: 'Node.js', category: 'Backend', proficiency: 80 },
    { name: 'Express', category: 'Backend', proficiency: 75 },
    { name: 'MongoDB', category: 'Database', proficiency: 70 },
    { name: 'PostgreSQL', category: 'Database', proficiency: 65 },
    { name: 'Tailwind CSS', category: 'Styling', proficiency: 85 },
    { name: 'Git', category: 'Tools', proficiency: 80 },
    { name: 'Docker', category: 'DevOps', proficiency: 60 },
    { name: 'AWS', category: 'Cloud', proficiency: 55 },
  ]

  return (
    <section
      id="skills"
      className="w-full min-h-auto flex flex-col items-center justify-center py-10 "
    >
      <h2 className="text-3xl md:text-4xl text-center text-gray-900 mb-8">
        My <span className=" font-semibold text-black">Skills</span>
      </h2>
      <div className="grid xs:grid-cols-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </section>
  )
}

export default SkillSection
