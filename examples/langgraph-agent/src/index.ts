import { AgentRuntime, LocalSigner } from "test-agent-kit";
import { AptosBalanceTool } from "test-agent-kit/dist/langchain/aptos";
import { AptosTransactionTool } from "test-agent-kit/dist/langchain/aptos/get-transaction";
import { AptosAccountAddressTool } from "test-agent-kit/dist/langchain/account";
import {
	Aptos,
	AptosConfig,
	Ed25519PrivateKey,
	HexInput,
	Network,
	PrivateKey,
	PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatAnthropic } from "@langchain/anthropic";

export const main = async () => {
	const llm = new ChatAnthropic({
		model: "claude-3-sonnet-20240229",
	});

	const aptosConfig = new AptosConfig({
		network: Network.MAINNET,
	});
	const aptos = new Aptos(aptosConfig);
	const account = await aptos.deriveAccountFromPrivateKey({
		privateKey: new Ed25519PrivateKey(
			PrivateKey.formatPrivateKey(
				process.env.PRIVATE_KEY as HexInput,
				PrivateKeyVariants.Ed25519,
			),
		),
	});
	const signer = new LocalSigner(account, Network.MAINNET);
	const agentRuntime = new AgentRuntime(signer, aptos);

	const readAgentTools = [
		new AptosBalanceTool(agentRuntime),
		new AptosAccountAddressTool(agentRuntime),
		new AptosTransactionTool(agentRuntime),
	];

	const readAgent = createReactAgent({
		tools: readAgentTools,
		llm: llm,
	});

	const readAgentNode = async () => {};
};
