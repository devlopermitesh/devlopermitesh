import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
// import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
// import { cloudinaryAdapter } from "./adapters/cloudinary";
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blogs } from './collections/Blogs'
import { Projects } from './collections/project'
import { Skills } from './collections/Skills'
import { Portfolio } from './globals/Portfolio'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { cloudinaryAdapter } from './adapters/cloudinary'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Comments } from './collections/comments'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: nodemailerAdapter({
    transportOptions: {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    defaultFromAddress: process.env.EMAIL_FROM_ADDRESS!,
    defaultFromName: process.env.EMAIL_FROM_NAME!,
  }),
  collections: [Users, Media, Blogs, Projects, Skills, Comments],
  globals: [Portfolio],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,

  plugins: [
    cloudStoragePlugin({
      collections: {
        // ✅ Media collection
        media: {
          adapter: cloudinaryAdapter({
            cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
            folder: 'media',
          }),
          disableLocalStorage: true, // Don't save files locally
        },
      },
    }),
  ],
})
