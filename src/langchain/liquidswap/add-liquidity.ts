import { Tool } from "langchain/tools";
import { AgentRuntime, parseJson } from "../..";
import { convertAmountFromHumanReadableToOnChain } from "@aptos-labs/ts-sdk";
import { parseFungibleAssetAddressToWrappedAssetAddress } from "../../utils/parse-fungible-asset-to-wrapped-asset";

export class LiquidSwapAddLiquidityTool extends Tool {
	name = "liquidswap_add_liquidity";
	description = `this tool can be used to add liquidity in liquidswap

    if you want to add APT and one of the token, mint will be "0x1::aptos_coin::AptosCoin"

    Inputs ( input is a JSON string ):
    mintX: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT" (required)
    mintY: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT" (required)
    mintXAmount: number, eg 1 or 0.01 (required)
    mintYAmount: number, eg 1 or 0.01 (required)
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

			const swapTransactionHash = await this.agent.addLiquidity(
				parseFungibleAssetAddressToWrappedAssetAddress(
					parsedInput.mintX,
				),
				parseFungibleAssetAddressToWrappedAssetAddress(
					parsedInput.mintY,
				),
				convertAmountFromHumanReadableToOnChain(
					parsedInput.mintXAmount,
					mintXDetail.decimals,
				),
				convertAmountFromHumanReadableToOnChain(
					parsedInput.mintYAmount,
					mintYDetail.decimals,
				),
			);

			return JSON.stringify({
				status: "success",
				swapTransactionHash,
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
