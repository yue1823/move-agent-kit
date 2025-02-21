import { Tool } from "langchain/tools"
import { type AgentRuntime, parseJson } from "../.."

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

export class Read_public_tweet extends Tool {
	name = "Read public tweet"
	description = `
    This tool allows you to read a public Tweet on the Aptos blockchain .

    It takes an nft token hash as input. The function then return the details about the tweet.

    Inputs (input is a JSON string):
    nft_address: string, eg "AptosNFT" (required) - The nft token id. This will be return  stored as part of the tweet's metadata.
    `
	constructor(private agent: AgentRuntime) {
		super()
	}
	async _call(args: string): Promise<string> {
		try {
			return ""
		} catch (error: unknown) {
			console.error("Error creating Tweet NFT:", error)
			return JSON.stringify({ error: `Error creating Tweet NFT: ${error}` })
		}
	}
}
