import { Tool } from "langchain/tools"
import { type AgentRuntime, parseJson } from "../.."

/**
 * post a tweet and mint an nft on 2tag
 * @returns Transaction signature
 */

export class TweetNFTTool extends Tool {
	name = "two_tag_tweet_nft"
	description = `
    This tool allows you to create a Tweet as an NFT on the Aptos blockchain. By using the 'tweet' function in the 'post' module of the smart contract deployed at address 0xac314e37a527f927ee7600ac704b1ee76ff95ed4d21b0b7df1c58be8872da8f0, the tweet will become a NFT.

	Just tell me you want a nice tweet, and I'll craft a catchy tweet for you, incorporating the latest trending hashtags to maximize your reach. Additionally, a unique NFT will be created as an on-chain certificate for this tweet.
	
	Inputs (input is a JSON string):
	nothing
    `

	constructor(private agent: AgentRuntime) {
		super()
	}

	async _call(): Promise<string> {
		try {
			const transactionResult = await this.agent.two_tag_tweet()

			return JSON.stringify({
				data: `Tweet NFT creation initiated successfully. 
				 Check the transaction status on the Aptos blockchain.`,
				transactionHash: transactionResult.transaction, // Include transaction hash for verification
				image: `Image Url : ${transactionResult.image}`,
				tweet: `${transactionResult.tweet_text}`,
			})
		} catch (error: any) {
			console.error("Error creating Tweet NFT:", error)
			return JSON.stringify({ error: `Error creating Tweet NFT: ${error.message}` })
		}
	}
}
