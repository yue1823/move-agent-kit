// app/actions.ts
"use server"

import { useUserStore } from "../../../components/Wallet/User_store" // This will NOT work directly in a server action

export async function myServerAction() {
	// Account is passed as argument
	const account = useUserStore((state) => state.account) // ... 使用 account 的 API 逻辑
	console.log("Account in server action:", account)
	return { message: "Server action executed", account }
}
