import { feedAlternates, getSiteUrl, site } from "@/lib/site"
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import '@fontsource-variable/inter'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  alternates: feedAlternates,
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Project Ember',
    description: site.description,
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
