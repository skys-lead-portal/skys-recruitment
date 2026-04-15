import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unlock a 4× Transition Package | SKYS Branch × Manulife',
  description: 'Join Singapore\'s fastest-growing financial advisory team. Personalised transition packages tailored to your income and experience.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  other: {
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=1',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
