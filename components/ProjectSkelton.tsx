const ProjectCardSkeleton = ({ index }: { index: number }) => {
  return (
    <div className="flex w-full flex-col gap-4 border border-white py-4 animate-pulse md:flex-row md:py-10">
      {/* Image Skeleton */}
      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-first' : 'md:order-last'}`}>
        <div className="h-72 md:h-80 w-full rounded-xl bg-gray-800" />
      </div>

      {/* Content Skeleton */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-4 rounded-xl">
        {/* Index */}
        <div className="h-8 w-16 bg-gray-800 rounded mb-4" />

        {/* Title + Description */}
        <div>
          <div className="h-6 w-2/3 bg-gray-800 rounded mb-3" />
          <div className="h-4 w-full bg-gray-800 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-800 rounded mb-2" />
          <div className="h-4 w-4/6 bg-gray-800 rounded" />
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-6 w-16 bg-gray-800 rounded-full" />
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-row gap-5 py-2 items-center mt-4">
          <div className="h-5 w-20 bg-gray-800 rounded" />
          <div className="h-5 w-28 bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  )
}

export default ProjectCardSkeleton
