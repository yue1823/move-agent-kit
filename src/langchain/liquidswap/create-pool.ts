import { Tool } from "langchain/tools";
import { AgentRuntime, parseJson } from "../..";
import { parseFungibleAssetAddressToWrappedAssetAddress } from "../../utils/parse-fungible-asset-to-wrapped-asset";

export class LiquidSwapCreatePoolTool extends Tool {
	name = "liquidswap_create_pool";
	description = `this tool can be used to create a new pool in liquidswap

    if you want to create a pool with APT and one of the token, mint will be "0x1::aptos_coin::AptosCoin"

    Inputs ( input is a JSON string ):
    mintX: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT" (required)
    mintY: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT" (required)
    `;

	constructor(private agent: AgentRuntime) {
		super();
	}

	protected async _call(input: string): Promise<string> {
		try {
			const parsedInput = parseJson(input);

			const mintXDetail = await this.agent.getTokenDetails(
				parsedInput.mintX,
			);

			const mintYDetail = await this.agent.getTokenDetails(
				parsedInput.mintY,
			);

			const createPoolTransactionHash = await this.agent.createPool(
				parseFungibleAssetAddressToWrappedAssetAddress(
					parsedInput.mintX,
				),
				parseFungibleAssetAddressToWrappedAssetAddress(
					parsedInput.mintY,
				),
			);

			return JSON.stringify({
				status: "success",
				createPoolTransactionHash,
				token: [
					{
						mintX: mintXDetail.name,
						decimals: mintXDetail.decimals,
					},
					{
						mintY: mintYDetail.name,
						decimals: mintYDetail.decimals,
					},
				],
			});
		} catch (error: any) {
			return JSON.stringify({
				status: "error",
				message: error.message,
				code: error.code || "UNKNOWN_ERROR",
			});
		}
	}
}
