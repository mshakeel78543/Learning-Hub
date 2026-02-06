import type { Metadata, Viewport } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css'

export const metadata: Metadata = {
  title: 'API Security Learning Platform',
  description: 'Learn API Security and Hacking - Complete Guide',
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
      <body style={{ margin: 0, padding: 0 }}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
