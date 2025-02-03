// src/signers/base-signer.ts

import {
	Aptos,
	AccountAddress,
	AnyRawTransaction,
	Account,
} from "@aptos-labs/ts-sdk";
import { SignedTransactionResponse } from "../types";
import {
	InputTransactionData,
	SignMessagePayload,
	SignMessageResponse,
} from "@aptos-labs/wallet-adapter-react";

export abstract class BaseSigner {
	protected constructor(
		protected readonly account: Account,
		protected readonly aptos: Aptos,
	) {}

	public getAddress(): AccountAddress {
		return this.account.accountAddress;
	}

	//  abstract getAccount(): Account;
	abstract signTransaction(
		transaction: AnyRawTransaction,
	): Promise<SignedTransactionResponse>;
	abstract sendTransaction(
		transaction: InputTransactionData | AnyRawTransaction,
	): Promise<string>;
	abstract signMessage(
		message: SignMessagePayload | string,
	): Promise<SignMessageResponse | string>;
}
