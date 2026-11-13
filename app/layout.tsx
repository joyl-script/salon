import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], variable: '--font-playfair', display: 'swap' })

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: 'Престиж — салон красоты в Краснодаре',
  description: 'Пространство заботы о себе в центре Краснодара. Стрижки, окрашивание, маникюр и бережный уход. Запишитесь на удобное время.',
  applicationName: 'Салон красоты «Престиж»',
  openGraph: {
    title: 'Престиж — салон красоты в Краснодаре',
    description: 'Место, где забота о себе становится вашей любимой привычкой.',
    locale: 'ru_RU',
    type: 'website',
  },
  icons: {
    icon: [
      { url: `${basePath}/icon-light-32x32.png`, media: '(prefers-color-scheme: light)' },
      { url: `${basePath}/icon-dark-32x32.png`, media: '(prefers-color-scheme: dark)' },
      { url: `${basePath}/icon.svg`, type: 'image/svg+xml' },
    ],
    apple: `${basePath}/apple-icon.png`,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF9F4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
