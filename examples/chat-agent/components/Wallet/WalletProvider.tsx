"use client"

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react"
import { BitgetWallet } from "@bitget-wallet/aptos-wallet-adapter"
// import { MSafeWalletAdapter } from "@msafe/aptos-wallet-adapter";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter"
import { PontemWallet } from "@pontem/wallet-adapter-plugin"
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter"

import { Network } from "@aptos-labs/ts-sdk"
import { PropsWithChildren } from "react"
import { useClaimSecretKey } from "../hooks/useClaimSecretKey"
import { useToast } from "../ui/use-toast"
import { useAutoConnect } from "./AutoConnectProvider"

export const WalletProvider = ({ children }: PropsWithChildren) => {
	const { autoConnect } = useAutoConnect()
	const { toast } = useToast()

	// Enables claim flow when the `claim` query param is detected
	const claimSecretKey = useClaimSecretKey()

	const wallets = [
		new BitgetWallet(),
		// new MSafeWalletAdapter(),
		new PontemWallet(),
		new TrustWallet(),
		new OKXWallet(),
	]

	return (
		<AptosWalletAdapterProvider
			plugins={wallets}
			autoConnect={autoConnect}
			dappConfig={{
				network: Network.TESTNET,
				aptosApiKeys: {
					testnet: process.env.NEXT_PUBLIC_APTOS_API_KEY_TESNET,
					devnet: process.env.NEXT_PUBLIC_APTOS_API_KEY_DEVNET,
				},
				aptosConnect: {
					claimSecretKey,
					dappId: "57fa42a9-29c6-4f1e-939c-4eefa36d9ff5",
				},
				mizuwallet: {
					manifestURL: "https://assets.mz.xyz/static/config/mizuwallet-connect-manifest.json",
				},
			}}
			onError={(error) => {
				toast({
					variant: "destructive",
					title: "Error",
					description: error || "Unknown wallet error",
				})
			}}
		>
			{children}
		</AptosWalletAdapterProvider>
	)
}
