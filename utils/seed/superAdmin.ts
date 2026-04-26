import { getPayloadClient } from "@/collections/lib/payload";
import crypto from "crypto";
import type { Payload } from "payload";

const SUPER_ADMIN_EMAIL = "miteshgehlot6@gmail.com";

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
} as const;

export async function seedSuperAdmin(payload: Payload): Promise<void> {
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: SUPER_ADMIN_EMAIL } },
    limit: 1,
  });

  const baseData = {
    email: SUPER_ADMIN_EMAIL,
    name: "Mitesh Gehlot",
    role: "Admin",
    adminProfile: {
      employeeJob: "Super Admin",
      verifiedAdmin: true,
      adminType: "SUPER_ADMIN",
      permissions: allAdminPermissions,
    },
  } as any;

  if (!existing.docs.length) {
    const password =
      process.env.SUPER_ADMIN_PASSWORD ??
      crypto.randomBytes(18).toString("base64url");

    await payload.create({
      collection: "users",
      data: { ...baseData, password },
    });

    payload.logger.info(
      `Seeded SUPER_ADMIN user: ${SUPER_ADMIN_EMAIL} (password: ${password})`,
    );
    return;
  }

  const id = (existing.docs[0] as any).id as string;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  await payload.update({
    collection: "users",
    id,
    data: password ? { ...baseData, password } : baseData,
  });

  payload.logger.info(`Updated SUPER_ADMIN user: ${SUPER_ADMIN_EMAIL}`);
}

async function seedSkills(payload: Payload) {
  // Seed some basic skills
  const skills = [
    { name: "JavaScript", category: "frontend", proficiency: 95 },
    { name: "TypeScript", category: "frontend", proficiency: 90 },
    { name: "React", category: "frontend", proficiency: 92 },
    { name: "Next.js", category: "frontend", proficiency: 88 },
    { name: "Node.js", category: "backend", proficiency: 85 },
    { name: "Python", category: "backend", proficiency: 80 },
    { name: "MongoDB", category: "database", proficiency: 82 },
    { name: "PostgreSQL", category: "database", proficiency: 78 },
  ];
  try {
    for (const skill of skills) {
      await payload.create({
        collection: "skills",
        data: skill,
      });
    }

    console.log("Skills seeded successfully");
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    process.exit(0);
  }
}

// (async function main() {
//   try {
//     const payload = await getPayloadClient();
//     await seedSuperAdmin(payload);
//     await seedSkills(payload);
//   } catch (error) {
//     console.log("Error:Seed ", error);
//   }
// });
