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

export class TweetNFTTool extends Tool {
	name = "two_tag_tweet_nft"
	description = `
    This tool allows you to create a Tweet as an NFT on the Aptos blockchain using the 'tweet' function in the 'post' module of the smart contract deployed at address 0xdaaaa309d1523328b25993448b2ad8fca9c2157796df1240f29927b14d7c0e87.

    It takes an image URL, a hashtag, and tweet content as input. The function then mints an NFT associated with the provided information and stores it on the blockchain.  Users can later retrieve tweet data through this NFT.

    Inputs (input is a JSON string):
    tag: string, eg "AptosNFT" (required) - The hashtag for the tweet. This will be stored as part of the tweet's metadata.
    text: string, eg "Just minted my first NFT tweet!" (required) - The content of the tweet. This will be stored as part of the tweet's metadata.
    to_address: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa" (required) - The address to receive the minted NFT.  The NFT will be minted and transferred to this address.
    nft_url: string, eg "https://example.com/image.png" (required) - The URL of the image to associate with the NFT. This will be stored as part of the NFT's metadata. It should be a publicly accessible URL.
    `

	// Replace with your Aptos account address with write access
	// private contractAddress = "0xdaaaa309d1523328b25993448b2ad8fca9c2157796df1240f29927b14d7c0e87";  // Your contract's address
	// private moduleName = "post";   // Your module name containing the tweet function
	// private functionName = "tweet";

	constructor(private agent: AgentRuntime) {
		super()
	}

	async _call(args: string): Promise<string> {
		try {
			const parsedInput = parseJson(args)

			if (!parsedInput.tag || !parsedInput.text || !parsedInput.to_address || !parsedInput.nft_url) {
				return "Error: Missing required input parameters (tag, text, to_address, nft_url)."
			}

			// Validate address format (basic check)
			if (!parsedInput.to_address.startsWith("0x") || parsedInput.to_address.length !== 66) {
				// Assuming 0x and 64 hex characters
				return "Error: Invalid to_address format.  It should start with '0x' and be 66 characters long."
			}

			// TODO: Implement your Aptos transaction logic here
			// This is a placeholder - replace with your actual Aptos SDK code to call the move function
			const transactionResult = await this.agent.two_tag_tweet(
				parsedInput.tag,
				parsedInput.text,
				parsedInput.to_address,
				parsedInput.nft_url
			)

			return JSON.stringify({
				data: "Tweet NFT creation initiated successfully.  Check the transaction status on the Aptos blockchain.",
				transactionHash: transactionResult, // Include transaction hash for verification
			})
		} catch (error: any) {
			console.error("Error creating Tweet NFT:", error)
			return JSON.stringify({ error: `Error creating Tweet NFT: ${error.message}` })
		}
	}

	// Placeholder for Aptos transaction execution (replace with your actual Aptos SDK code)
	// private async executeAptosTransaction(tag: string, text: string, to_address: string, nft_url: string): Promise<{ success: boolean; transactionHash?: string; errorMessage?: string }> {
	//     try {
	//         // TODO: Replace this with your actual Aptos SDK code to interact with your smart contract
	//         // 1.  設定 Aptos 客戶端和帳戶 (使用你的私鑰或助記詞安全地初始化)
	//
	//         // 2. 建立交易負載 (entry function payload)
	//
	//         // 3. 建立 Raw Transaction
	//
	//         // 4. 簽署交易
	//
	//         // 5. 提交交易
	//
	//         // 6. 等待交易完成
	//
	//         const transaction = await this.agent.aptos.transaction.build.simple({
	//             sender:this.agent.account.getAddress(),
	//             data: {
	//                 function:`${this.contractAddress}::${this.moduleName}::${this.functionName}`,
	//                 functionArguments: [tag,text,to_address,nft_url],
	//             }
	//         });
	//         const committedTransactionHash = await this.agent.account.sendTransaction(transaction)
	//         const signedTransaction = await this.agent.aptos.waitForTransaction({
	//             transactionHash: committedTransactionHash,
	//         })
	//
	//         if (!signedTransaction.success) {
	//             console.error(signedTransaction, "Add liquidity failed")
	//         }
	//
	//
	//         return { success: true, transactionHash: signedTransaction.hash };
	//     } catch (error: unknow) {
	//         console.error("Aptos transaction error:", error);
	//         return { success: false, errorMessage: error.message };
	//     }
	// }
}
