import {
	Aptos,
	AptosConfig,
	Ed25519PrivateKey,
	HexInput,
	Network,
	PrivateKey,
	PrivateKeyVariants,
} from "@aptos-labs/ts-sdk"
import { AgentRuntime, LocalSigner } from "../../src"

export const main = async () => {
	const aptosConfig = new AptosConfig({
		network: Network.TESTNET,
	})
	const aptos = new Aptos(aptosConfig)
	const account = await aptos.deriveAccountFromPrivateKey({
		privateKey: new Ed25519PrivateKey(
			PrivateKey.formatPrivateKey(process.env.PRIVATE_KEY as HexInput, PrivateKeyVariants.Ed25519)
		),
	})

	const signer = new LocalSigner(account, Network.TESTNET)
	const agentRuntime = new AgentRuntime(signer, aptos)

	const balance = await agentRuntime.getBalance()

	console.log(balance)
}

main()
	.then((x) => console.log(x))
	.catch((e) => console.log("error", e))
