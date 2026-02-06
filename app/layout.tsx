import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'API Security Learning Platform',
  description: 'Learn API Security and Hacking in Roman Urdu',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
