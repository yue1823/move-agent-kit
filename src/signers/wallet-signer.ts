import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { BaseSigner } from "./base-signer";
import { Transaction } from "../types";
import { WalletContextState } from "aptos-wallet-adapter";

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

	async signTransaction(transaction: Transaction) {
		const signature = await this.wallet.signTransaction(transaction);
		return {
			signature,
		};
	}

	async sendTransaction(transaction: Transaction): Promise<string> {
		const txHash = await this.wallet.signAndSubmitTransaction(transaction);

		return txHash.hash;
	}

	async signMessage(message: string) {
		return this.wallet.signMessage(message);
	}
}
