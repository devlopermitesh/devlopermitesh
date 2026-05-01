const SkillSectionSkeleton = () => {
  return (
    <div className="grid xs:grid-cols-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6 w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="aspect-square rounded-3xl bg-gray-200/80 p-6 animate-pulse" />
      ))}
    </div>
  )
}

export default SkillSectionSkeleton
