import { Tool } from "langchain/tools";
import { AgentRuntime, parseJson } from "../..";
import { convertAmountFromHumanReadableToOnChain } from "@aptos-labs/ts-sdk";
import { parseFungibleAssetAddressToWrappedAssetAddress } from "../../utils/parse-fungible-asset-to-wrapped-asset";

export class LiquidSwapRemoveLiquidityTool extends Tool {
	name = "liquidswap_remove_liquidity";
	description = `this tool can be used to remove liquidity from liquidswap

    if you want to remove APT and one of the token, mint will be "0x1::aptos_coin::AptosCoin"

	minMintX and minMintY are minimum amount of tokens to receive, default is 0

	deposit liquidity in one of the pools to get LP tokens if you don't have LP tokens

    Inputs ( input is a JSON string ):
    mintX: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT" (required)
    mintY: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT" (required)
    lpAmount: number, eg 1 or 0.01 (required)
    minMintX: number, eg 1 or 0.01 (optional)
    minMintY: number, eg 1 or 0.01 (optional)
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

			const removeLiquidityTransactionHash =
				await this.agent.removeLiquidity(
					parseFungibleAssetAddressToWrappedAssetAddress(
						parsedInput.mintX,
					),
					parseFungibleAssetAddressToWrappedAssetAddress(
						parsedInput.mintY,
					),
					convertAmountFromHumanReadableToOnChain(
						parsedInput.lpAmount,
						6,
					),
					convertAmountFromHumanReadableToOnChain(
						parsedInput.minMintX || 0,
						mintXDetail.decimals,
					),
					convertAmountFromHumanReadableToOnChain(
						parsedInput.minMintY || 0,
						mintYDetail.decimals,
					),
				);

			return JSON.stringify({
				status: "success",
				removeLiquidityTransactionHash,
				token: [
					{
						mintX: mintXDetail.name,
						decimals: mintXDetail.decimals,
					},
					{
						mintY: mintXDetail.name,
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
