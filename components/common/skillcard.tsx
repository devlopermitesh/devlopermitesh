import { motion } from "framer-motion";

const SkillCard = ({
  skill,
}: {
  skill: {
    name: string;
    category: string;
    proficiency: number;
  };
}) => {
  const Codename = skill.name.slice(0, 2);

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="group border-2 aspect-square px-10 md:px-15 flex items-center justify-center relative overflow-hidden cursor-pointer"
    >
      {/* Background */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black z-0"
      />

      {/* Default Codename (visible initially) */}
      <motion.h2
        variants={{
          initial: { x: 0, opacity: 1 },
          hover: { x: -20, opacity: 0.3 },
        }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-black group-hover:text-white z-10"
      >
        {Codename}
      </motion.h2>

      {/* Hover Content */}
      <motion.div
        variants={{
          initial: { x: 40, opacity: 0 },
          hover: { x: 0, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute z-10 flex flex-col items-center text-white"
      >
        <span className="flex gap-1 items-end">
          <h2 className="font-semibold">{skill.name}</h2>
          <sub>{skill.proficiency}%</sub>
        </span>
        <h4 className="text-gray-300">{skill.category} |</h4>
      </motion.div>
    </motion.div>
  );
};

export default SkillCard;
