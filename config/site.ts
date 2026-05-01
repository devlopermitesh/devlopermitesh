export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Mitesh Gehlot',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Mitesh Gehlot | Full-Stack Developer',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Portfolio of Mitesh Gehlot, a full-stack developer specializing in Next.js, React, TypeScript, and cloud-native applications.',
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '',
  ogImagePath: process.env.NEXT_PUBLIC_OG_IMAGE || '/og-image.png',
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || '',
} as const
