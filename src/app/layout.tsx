/** @format */
'use client'

import { Michroma, Roboto } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ToastContainer } from 'react-toastify'

const michroma = Michroma({
	weight: '400',
	variable: '--font-michroma',
	subsets: ['latin']
})

const roboto = Roboto({
	weight: ['400', '700'],
	variable: '--font-roboto',
	subsets: ['latin']
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactElement
}>) {
	return (
		<html lang='en' className='darsk'>
			<body className={`${roboto.variable} ${michroma.variable} antialiased`}>
				<ToastContainer />
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
