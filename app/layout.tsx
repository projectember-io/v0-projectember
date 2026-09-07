import { feedAlternates, getSiteUrl, site } from "@/lib/site"
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import '@fontsource-variable/inter'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: 'Building an autonomous AI organisation from the ground up. A public project documenting the creation of specialised AI agents working together.',
  alternates: feedAlternates,
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Project Ember',
    description: 'Building an autonomous AI organisation from the ground up.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
