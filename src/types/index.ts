import { AccountAuthenticator } from "@aptos-labs/ts-sdk";
import { AnyRawTransaction } from "aptos";
import {
	TransactionPayload_EntryFunctionPayload,
	TransactionPayload_ModuleBundlePayload,
	TransactionPayload_MultisigPayload,
	TransactionPayload_ScriptPayload,
} from "aptos/src/generated";

export type Transaction =
	| TransactionPayload_EntryFunctionPayload
	| TransactionPayload_ScriptPayload
	| TransactionPayload_ModuleBundlePayload
	| TransactionPayload_MultisigPayload;

export type SignedTransactionResponse = {
	senderAuthenticator?: AccountAuthenticator;
	signature?: Uint8Array<ArrayBufferLike>;
};
