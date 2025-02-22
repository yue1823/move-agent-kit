import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/components/Wallet/WalletProvider"

import { AutoConnectProvider } from "@/components/Wallet/AutoConnectProvider"
import { ReactQueryClientProvider } from "@/components/Wallet/ReactQueryClientProvider"
import { WalletConnectionHandler } from "@/components/Wallet/User_store"
import Wallet from "../components/Wallet/client_wallet"
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "2tag ai",
	description: "2tag ai for aptos",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<AutoConnectProvider>
			<ReactQueryClientProvider>
				<WalletProvider>
					<html lang="en">
						<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
							<WalletConnectionHandler>{children}</WalletConnectionHandler>
						</body>
					</html>
				</WalletProvider>
			</ReactQueryClientProvider>
		</AutoConnectProvider>
	)
}
