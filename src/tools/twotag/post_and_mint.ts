import { ChatGoogleGenerativeAI } from "../../../examples/chat-agent/node_modules/@langchain/google-genai"
import type { AgentRuntime } from "../../agent"

/**
 * post a tweet and mint an nft on 2tag
 * @param account user_account
 * @returns Transaction signature
 *
 */

const llm = new ChatGoogleGenerativeAI({
	model: "gemini-2.0-flash", // Use the desired Gemini model
	temperature: 0.7, // Keep the temperature or adjust as needed
	apiKey: process.env.GOOLE_API_KEY, // Ensure your Google API key is set
})

async function generateTweet(llm: ChatGoogleGenerativeAI, hashtags: string[]): Promise<string> {
	try {
		const prompt = `Please create an engaging tweet related to Web3 and crypto, specifically expressing a positive outlook on the future of Aptos and Move. Base the tweet on the following hashtags, ensuring that all hashtags are included and only output the tweet text, without any other meaningless prefixes, suffixes, or explanations: ${hashtags.join(" ")}`
		const result = await llm.call([prompt])

		return result.content.toString()
	} catch (error) {
		console.error("Error generating tweet:", error)
		throw new Error("Failed to generate tweet.")
	}
}

export async function two_tag_tweet(
	agent: AgentRuntime,
	account: string
): Promise<{ transaction: string; image: string; tweet_text: string }> {
	// const account = useUserStore((state=> state.account))
	try {
		if (account != null) {
			//const externalApiResponse = await fetch("YOUR_EXTERNAL_API_ENDPOINT");
			//const externalApiData = await externalApiResponse.json();
			const hashtags = ["#hackathon", "#Aptos", "#Meta Move", "#Bullish"]
			const imageUrl =
				"https://us1.discourse-cdn.com/flex016/uploads/aptosfoundation/original/2X/4/43c18e22246bb2751bcc8a54b6b5f2ab6e1d0739.jpeg"

			const tweetContent = await generateTweet(llm, hashtags)
			// console.log("tweetContent:", tweetContent);

			const output = tweetContent + imageUrl

			const transaction = await agent.aptos.transaction.build.simple({
				sender: agent.account.getAddress(),
				data: {
					function: "0xac314e37a527f927ee7600ac704b1ee76ff95ed4d21b0b7df1c58be8872da8f0::post::tweet",
					functionArguments: [hashtags, tweetContent, account, imageUrl],
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

			return {
				transaction: signedTransaction.hash,
				image: imageUrl,
				tweet_text: tweetContent,
			}
		}
		return {
			transaction: "",
			image: "",
			tweet_text: "",
		}
	} catch (error: unknown) {
		throw new Error(`2tag post tweet failed: ${error}`)
	}
}
