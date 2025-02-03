import { AccountAuthenticator } from "@aptos-labs/ts-sdk";

export type SignedTransactionResponse = {
	senderAuthenticator?: AccountAuthenticator;
	signature?: Uint8Array<ArrayBufferLike>;
};
