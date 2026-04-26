import { Project } from "@/payload-types";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";

const ProjectSection = () => {
  const [Projects, setProjects] = useState<Project[]>([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/projects");

        if (!res.ok) {
          setError(`HTTP ${res.status}: ${res.statusText}`);
        }

        const response = await res.json();
        const data = await Promise.all(
          response.docs.map(async (project: Project) => {
            const images = await Promise.all(
              (project.images || []).map(async (img: any) => {
                const media = await fetch(`/api/media/${img.image.id}`).then(
                  (res) => res.json(),
                );

                return {
                  ...img,
                  image: media,
                };
              }),
            );

            return { ...project, images };
          }),
        );

        if (!data) {
          setError("No project found!");
          return null;
        }
        setProjects(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const memoizedProjects = useMemo(() => Projects, [Projects]);
  return (
    <section className="w-full min-h-auto flex flex-col items-center justify-center py-10 bg-black">
      <h2 className="text-3xl md:text-4xl text-center text-gray-100 mb-8">
        My <span className=" font-semibold text-white">Work</span>
      </h2>

      <div className="flex flex-col mx-10">
        {Loading ? (
          <h2 className="text-white">Skelton</h2>
        ) : (
          memoizedProjects.map((project, index) => (
            <ProjectCard key={project.id} index={index} project={project} />
          ))
        )}
      </div>
    </section>
  );
};
export default ProjectSection;
