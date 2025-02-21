import {
	Aptos,
	AptosConfig,
	Ed25519PrivateKey,
	HexInput,
	Network,
	PrivateKey,
	PrivateKeyVariants,
} from "@aptos-labs/ts-sdk"
import { ChatAnthropic } from "@langchain/anthropic"
import { config } from "dotenv"
import { AgentRuntime, LocalSigner } from "../../../src"
config()

export const llm = new ChatAnthropic({
	model: "claude-3-5-sonnet-latest",
	anthropicApiKey: process.env.ANTHROPIC_API_KEY,
})

export const setupAgentKit = async () => {
	const aptosConfig = new AptosConfig({
		network: Network.TESTNET,
	})
	const aptos = new Aptos(aptosConfig)
	const account = await aptos.deriveAccountFromPrivateKey({
		privateKey: new Ed25519PrivateKey(
			PrivateKey.formatPrivateKey(process.env.APTOS_PRIVATE_KEY as HexInput, PrivateKeyVariants.Ed25519)
		),
	})
	const signer = new LocalSigner(account, Network.TESTNET)
	const agentRuntime = new AgentRuntime(signer, aptos)

	return {
		agentRuntime,
		llm,
	}
}
