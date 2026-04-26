import { CollectionConfig } from "payload";
import { isSuperAdmin } from "./lib/access";

export const Comments: CollectionConfig = {
  slug: "comment",
  admin: {
    useAsTitle: "username",
  },
  access: {
    read: ({ req: { user } }) => {
      return isSuperAdmin(user);
    },
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "username",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "userwebsite",
      type: "text",
    },
    {
      name: "comment",
      type: "textarea",
      maxLength: 500,
    },
  ],
};
