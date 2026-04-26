import { Access } from "payload";
import { AdminPermissionKey } from "./types";

type AppUser = {
  id: string;
  role?: string | null;
  adminProfile?: {
    adminType?: string | null;
    permissions?: Record<string, any> | null;
  } | null;
};

export const isSuperAdmin = (user: AppUser | null): boolean =>
  Boolean(
    user?.role === "Admin" &&
    (user.adminProfile?.adminType === "SUPER_ADMIN" ||
      user.adminProfile?.adminType === "Super Admin"),
  );

export const isLoggedIn: Access = ({ req }) => Boolean(getReqUser(req));

export const hasAdminPermissionValue = (
  user: AppUser | null,
  permission: AdminPermissionKey,
): boolean => {
  if (!user) return false;
  if (isSuperAdmin(user)) return true;
  if (user.role !== "Admin") return false;

  const [group, key] = permission.split(".");
  return Boolean(user.adminProfile?.permissions?.[group]?.[key]);
};

const getReqUser = (req: any): AppUser | null =>
  (req?.user as AppUser | null) ?? null;
export const hasAdminPermission =
  (permission: AdminPermissionKey): Access =>
  ({ req }) => {
    const user = getReqUser(req);
    return hasAdminPermissionValue(user, permission);
  };

export const canManageAdmins = hasAdminPermission("system.canManageAdmins");
export const canAccessSettings = hasAdminPermission("system.canAccessSettings");
export const canManageBlogs = hasAdminPermission("content.canManageBlogs");
export const canManageProjects = hasAdminPermission(
  "content.canManageProjects",
);
export const canManageSkills = hasAdminPermission("content.canManageSkills");
export const canManageMedia = hasAdminPermission("content.canManageMedia");
