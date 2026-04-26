import type { Access, PayloadRequest } from 'payload'
import { AdminPermissionKey } from './types'

type Permissions = Record<string, Record<string, unknown>> | null

type AppUser = {
  id: string
  role?: string | null
  adminProfile?: {
    adminType?: string | null
    permissions?: Permissions
  } | null
}

export const isSuperAdmin = (user: AppUser | null): boolean =>
  Boolean(
    user?.role === 'Admin' &&
    (user.adminProfile?.adminType === 'SUPER_ADMIN' ||
      user.adminProfile?.adminType === 'Super Admin')
  )

export const isLoggedIn: Access = ({ req }: { req: PayloadRequest }) => Boolean(getReqUser(req))

export const hasAdminPermissionValue = (
  user: AppUser | null,
  permission: AdminPermissionKey
): boolean => {
  if (!user) return false
  if (isSuperAdmin(user)) return true
  if (user.role !== 'Admin') return false

  const [group, key] = permission.split('.')
  const groupPermissions = user.adminProfile?.permissions?.[group]
  return Boolean(groupPermissions?.[key])
}

const getReqUser = (req: PayloadRequest): AppUser | null => req.user as AppUser | null
export const hasAdminPermission =
  (permission: AdminPermissionKey): Access =>
  ({ req }: { req: PayloadRequest }) => {
    const user = getReqUser(req)
    return hasAdminPermissionValue(user, permission)
  }

export const canManageAdmins = hasAdminPermission('system.canManageAdmins')
export const canAccessSettings = hasAdminPermission('system.canAccessSettings')
export const canManageBlogs = hasAdminPermission('content.canManageBlogs')
export const canManageProjects = hasAdminPermission('content.canManageProjects')
export const canManageSkills = hasAdminPermission('content.canManageSkills')
export const canManageMedia = hasAdminPermission('content.canManageMedia')
