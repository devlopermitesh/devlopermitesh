import type { CollectionConfig } from "payload";

import {
  canManageAdmins,
  hasAdminPermissionValue,
} from "@/collections/lib/access";

const canManageAdminsFieldAccess = ({ req }: any) =>
  hasAdminPermissionValue(req.user as any, "system.canManageAdmins");

export const Users: CollectionConfig = {
  slug: "users",

  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false, // Set to true if you want email verification
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
  },

  admin: {
    useAsTitle: "email",
    group: "User Management",
  },

  access: {
    create: ({ req }) => {
      // Allow anyone to create an account, but admins can create users
      const user = req.user as any;
      if (!user) return true; // Public registration
      return canManageAdmins({ req });
    },
    read: ({ req }) => {
      const user = req.user as any;
      if (!user?.id) return false;
      if (canManageAdmins({ req })) return true;
      return { id: { equals: user.id } };
    },
    update: ({ req }) => {
      const user = req.user as any;
      if (!user?.id) return false;
      if (canManageAdmins({ req })) return true;
      return { id: { equals: user.id } };
    },
    delete: ({ req }) => canManageAdmins({ req }),
  },

  fields: [
    // ===== Basic Fields =====
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "User", value: "User" },
        { label: "Admin", value: "Admin" },
      ],
      defaultValue: "User",
      access: {
        update: canManageAdminsFieldAccess,
      },
    },
    {
      name: "adminProfile",
      type: "group",
      admin: {
        condition: (data) => data.role === "Admin",
      },
      fields: [
        {
          name: "adminType",
          type: "select",
          options: [
            { label: "Standard Admin", value: "STANDARD_ADMIN" },
            { label: "Super Admin", value: "SUPER_ADMIN" },
          ],
          defaultValue: "STANDARD_ADMIN",
          access: {
            update: canManageAdminsFieldAccess,
          },
        },
        {
          name: "permissions",
          type: "group",
          fields: [
            {
              name: "system",
              type: "group",
              fields: [
                {
                  name: "canManageAdmins",
                  type: "checkbox",
                  defaultValue: false,
                  access: {
                    update: canManageAdminsFieldAccess,
                  },
                },
                {
                  name: "canAccessSettings",
                  type: "checkbox",
                  defaultValue: false,
                  access: {
                    update: canManageAdminsFieldAccess,
                  },
                },
              ],
            },
            {
              name: "content",
              type: "group",
              fields: [
                {
                  name: "canManageBlogs",
                  type: "checkbox",
                  defaultValue: false,
                },
                {
                  name: "canManageProjects",
                  type: "checkbox",
                  defaultValue: false,
                },
                {
                  name: "canManageSkills",
                  type: "checkbox",
                  defaultValue: false,
                },
                {
                  name: "canManageMedia",
                  type: "checkbox",
                  defaultValue: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
