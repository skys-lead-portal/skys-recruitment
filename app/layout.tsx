import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Build Your Financial Planning Career | SKYS Branch × Manulife',
  description: 'Join Singapore\'s fastest-growing financial advisory team. Earn up to 400% of your past income with MAP 8 — Manulife\'s most competitive recruitment package ever.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
