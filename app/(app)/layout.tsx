import { Geist, Geist_Mono, Sora } from 'next/font/google'
import '.././globals.css'
import Header from '@/components/Header'

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
  title: {
    default: 'My Website',
    template: '%s | My Website',
  },
  description: 'Yeh meri website ka default description hai',
}

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
        <div className="bg-white bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:32px_32px] h-screen w-full">
          <div className="flex flex-col mx-auto ">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
