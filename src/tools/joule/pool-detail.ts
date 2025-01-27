import { AgentRuntime } from "../../agent";

/**
 * Get details about a specific pool
 * @param agent MoveAgentKit instance
 * @param mint The Move struct ID of the token to get details for
 * @returns Pool details
 * @example
 * ```ts
 * const poolDetails = await getPoolDetails(agent, "0x1::aptos_coin::AptosCoin"); // For APT pool
 * const otherPoolDetails = await getPoolDetails(agent, otherCoinAddress); // For other token pool
 * ```
 */
export async function getPoolDetails(
	agent: AgentRuntime,
	mint: string,
): Promise<any> {
	try {
		const transaction = await agent.aptos.view({
			payload: {
				function: `0x2fe576faa841347a9b1b32c869685deb75a15e3f62dfe37cbd6d52cc403a16f6::pool::pool_details`,
				functionArguments: [mint],
			},
		});

		if (!transaction) {
			throw new Error("Failed to fetch pool details");
		}

		return transaction;
	} catch (error: any) {
		throw new Error(`Failed to get pool details: ${error.message}`);
	}
}
