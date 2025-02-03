import {
	Account,
	AnyRawTransaction,
	Aptos,
	AptosConfig,
	Network,
} from "@aptos-labs/ts-sdk";
import { BaseSigner } from "./base-signer";
import {
	InputTransactionData,
	SignMessagePayload,
	WalletContextState,
} from "@aptos-labs/wallet-adapter-react";

export class WalletSigner extends BaseSigner {
	constructor(
		account: Account,
		private readonly wallet: WalletContextState,
		network: Network = Network.DEVNET,
	) {
		const config = new AptosConfig({ network });
		const aptos = new Aptos(config);
		super(account, aptos);
	}

	//  override getAccount(): Account {
	//	return this.wallet
	//  }

	async signTransaction(transaction: AnyRawTransaction) {
		const senderAuthenticator =
			await this.wallet.signTransaction(transaction);
		return {
			senderAuthenticator,
		};
	}

	async sendTransaction(transaction: InputTransactionData): Promise<string> {
		const txHash = await this.wallet.signAndSubmitTransaction(transaction);

		return txHash.hash;
	}

	async signMessage(message: SignMessagePayload) {
		return this.wallet.signMessage(message);
	}
}
