import Footer from '@/components/footer'
import Header from '@/components/header'
import { Toaster } from 'sonner'

import { ReduxProvider } from '@/components/providers/redux-provider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'CatCoin',
	description: 'Telegram bot',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<script src='https://telegram.org/js/telegram-web-app.js'></script>
			</head>
			<body className='h-screen bg-bg'>
				<Toaster position='top-center' theme='dark' />
				<Header />
				<ReduxProvider>{children}</ReduxProvider>
				<Footer />
			</body>
		</html>
	)
}
