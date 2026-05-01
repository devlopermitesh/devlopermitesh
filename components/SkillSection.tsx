'use client'

import SkillCard from './common/skillcard'
import SkillSectionSkeleton from './SkillSectionSkeleton'
import useSkills from '@/hooks/useSkills'

const formatCategory = (category: string) =>
  category
    .toString()
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const SkillSection = () => {
  const { skills, loading, error, retry } = useSkills()

  return (
    <section
      id="skills"
      className="w-full min-h-auto flex flex-col items-center justify-center py-10 px-4"
    >
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center text-gray-900 mb-8">
          My <span className="font-semibold text-black">Skills</span>
        </h2>

        {loading ? (
          <SkillSectionSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="text-red-600">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        ) : skills.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-8 text-center text-gray-700">
            No skills were found at the moment.
          </div>
        ) : (
          <div className="grid xs:grid-cols-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6 w-full">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id ?? `${skill.name}-${skill.proficiency}`}
                skill={{
                  ...skill,
                  category: formatCategory(skill.category),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SkillSection
