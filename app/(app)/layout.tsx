import { Geist, Geist_Mono, Sora } from 'next/font/google'
import '.././globals.css'
import Header from '@/components/Header'
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.name,
    'portfolio',
    'full-stack developer',
    'Next.js',
    'React',
    'TypeScript',
    'web developer',
    'cloud developer',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle || undefined,
    images: [siteConfig.ogImagePath],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: '/',
  },
} satisfies Metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased `}
    >
      <body className="min-h-full flex flex-col bg-white ">
        <div className="bg-white bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] bg-size-[32px_32px] h-screen w-full">
          <div className="flex flex-col mx-auto ">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
