import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AnnotationSystem } from '@my-app/annotation-system'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '平台 2.0 - 管理控制台',
  description: '企业级后台管理系统，统一管理租户、用户、组织和权限',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
        <AnnotationSystem
          defaultMode="off"
          theme={{
            primary: '#3b82f6',
            secondary: '#10b981',
            danger: '#ef4444',
            dotSize: 28,
            panelBg: '#ffffff',
            panelText: '#374151',
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
