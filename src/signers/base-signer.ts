// src/signers/base-signer.ts

import {
	Aptos,
	AccountAddress,
	AnyRawTransaction,
	Account,
} from "@aptos-labs/ts-sdk";
import { SignedTransactionResponse, Transaction } from "../types";
import { SignMessageResponse } from "aptos-wallet-adapter";

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
		transaction: Transaction | AnyRawTransaction,
	): Promise<SignedTransactionResponse>;
	abstract sendTransaction(
		transaction: Transaction | AnyRawTransaction,
	): Promise<string>;
	abstract signMessage(
		message: string,
	): Promise<SignMessageResponse | string>;
}
