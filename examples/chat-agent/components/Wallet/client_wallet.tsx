"use client"

import "@aptos-labs/wallet-adapter-ant-design/dist/index.css"
import { WalletSelector as AntdWalletSelector } from "@aptos-labs/wallet-adapter-ant-design"

export default function Wallet() {
	return <AntdWalletSelector></AntdWalletSelector>
}
