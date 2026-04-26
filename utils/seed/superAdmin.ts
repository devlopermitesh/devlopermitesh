import crypto from 'crypto'
import type { Payload } from 'payload'

const SUPER_ADMIN_EMAIL = 'miteshgehlot6@gmail.com'

const allAdminPermissions = {
  orders: {
    canViewOrders: true,
    canAcceptOrder: true,
    canCancelOrder: true,
    canUpdateOrderStatus: true,
  },
  delivery: {
    canAssignDelivery: true,
    canViewDeliveryPartners: true,
  },
  products: {
    canCreateProduct: true,
    canUpdateProduct: true,
    canDeleteProduct: true,
  },
  finance: {
    canViewRevenue: true,
    canProcessRefund: true,
  },
  system: {
    canManageAdmins: true,
    canAccessSettings: true,
  },
} as const

export async function seedSuperAdmin(payload: Payload): Promise<void> {
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: SUPER_ADMIN_EMAIL } },
    limit: 1,
  })

  const baseData = {
    email: SUPER_ADMIN_EMAIL,
    name: 'Mitesh Gehlot',
    role: 'Admin' as const,
    adminProfile: {
      employeeJob: 'Super Admin',
      verifiedAdmin: true,
      adminType: 'SUPER_ADMIN' as const,
      permissions: allAdminPermissions,
    },
  } as const

  if (!existing.docs.length) {
    const password =
      process.env.SUPER_ADMIN_PASSWORD ?? crypto.randomBytes(18).toString('base64url')

    await payload.create({
      collection: 'users',
      data: { ...baseData, password },
    })

    payload.logger.info(`Seeded SUPER_ADMIN user: ${SUPER_ADMIN_EMAIL} (password: ${password})`)
    return
  }

  const id = String((existing.docs[0] as { id: string } | undefined)?.id)
  const password = process.env.SUPER_ADMIN_PASSWORD

  await payload.update({
    collection: 'users',
    id,
    data: password ? { ...baseData, password } : baseData,
  })

  payload.logger.info(`Updated SUPER_ADMIN user: ${SUPER_ADMIN_EMAIL}`)
}
