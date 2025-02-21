import type { AgentRuntime } from "../../agent"

/**
 * post a tweet and mint an nft on 2tag
 * @param agent MoveAgentKit instance
 * @param tag  key word hash-tag
 * @param text content
 * @param to_address owner of the tweet
 * @param nft_url nft url
 * @returns Transaction signature
 * tag: string, text: string, to_address: string, nft_url: string
 */

export async function two_tag_tweet(
	agent: AgentRuntime,
	tag: string,
	text: string,
	to_address: string,
	nft_url: string
): Promise<string> {
	try {
		const transaction = await agent.aptos.transaction.build.simple({
			sender: agent.account.getAddress(),
			data: {
				function: "0xdaaaa309d1523328b25993448b2ad8fca9c2157796df1240f29927b14d7c0e87::post::tweet",
				functionArguments: [tag, text, to_address, nft_url],
			},
		})

		const committedTransactionHash = await agent.account.sendTransaction(transaction)

		const signedTransaction = await agent.aptos.waitForTransaction({
			transactionHash: committedTransactionHash,
		})

		if (!signedTransaction.success) {
			console.error(signedTransaction, "2tag post tweet failed")
			throw new Error("2tag post tweet failed")
		}

		return signedTransaction.hash
	} catch (error: any) {
		throw new Error(`2tag post tweet failed: ${error.message}`)
	}
}
