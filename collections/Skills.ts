import { CollectionConfig } from "payload";
import { canManageSkills } from "./lib/access";

export const Skills: CollectionConfig = {
  slug: "skills",
  admin: {
    useAsTitle: "name",
    group: "Content Management",
  },
  access: {
    read: ({ req }) => {
      // Skills are public for portfolio display
      if (canManageSkills({ req })) return true;
      return true; // Public read access
    },
    create: canManageSkills,
    update: canManageSkills,
    delete: canManageSkills,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Frontend", value: "frontend" },
        { label: "Backend", value: "backend" },
        { label: "Database", value: "database" },
        { label: "DevOps", value: "devops" },
        { label: "Design", value: "design" },
        { label: "Other", value: "other" },
      ],
      required: true,
    },
    {
      name: "proficiency",
      type: "number",
      min: 1,
      max: 100,
      required: true,
    },
   
  ],
};
