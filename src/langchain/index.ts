import { AgentRuntime } from "../agent";
import { AptosAccountAddressTool } from "./account";
import { AmnisStakeTool, AmnisWithdrawStakeTool } from "./amnis";
import {
	AptosBalanceTool,
	AptosBurnTokenTool,
	AptosCreateTokenTool,
	AptosGetTokenDetailTool,
	AptosMintTokenTool,
	AptosTransactionTool,
	AptosTransferTokenTool,
} from "./aptos";
import {
	JouleLendTokenTool,
	JouleWithdrawTokenTool,
	JouleBorrowTokenTool,
	JouleRepayTokenTool,
	JouleGetPoolDetails,
	JouleGetUserPosition,
	JouleGetUserAllPositions,
} from "./joule";
import {
	LiquidSwapAddLiquidityTool,
	LiquidSwapCreatePoolTool,
	LiquidSwapRemoveLiquidityTool,
	LiquidSwapSwapTool,
} from "./liquidswap";
import {
	AriesCreateProfileTool,
	AriesWithdrawTool,
	AriesBorrowTool,
	AriesLendTool,
	AriesRepayTool,
} from "./aries";

import {
	ThalaAddLiquidityTool,
	ThalaRemoveLiquidityTool,
	ThalaMintMODTool,
	ThalaRedeemMODTool,
	ThalaUnstakeTokenTool,
	ThalaStakeTokenTool,
} from "./thala";
import { PanoraSwapTool } from "./panora";
import { EchoStakeTokenTool, EchoUnstakeTokenTool } from "./echo";
import { EchelonLendTokenTool, EchelonWithdrawTokenTool } from "./echelon";
import { OpenAICreateImageTool } from "./openai";

export const createAptosTools = (agent: AgentRuntime) => {
	return [
		// Aptos tools
		new AptosBalanceTool(agent),
		new AptosAccountAddressTool(agent),
		new AptosTransferTokenTool(agent),
		// new AptosBurnNFTTool(agent),
		new AptosBurnTokenTool(agent),
		// new AptosTransferNFTTool(agent),
		new AptosTransactionTool(agent),
		new AptosGetTokenDetailTool(agent),
		new AptosMintTokenTool(agent),
		new AptosCreateTokenTool(agent),
		// Amnis tools
		new AmnisStakeTool(agent),
		new AmnisWithdrawStakeTool(agent),
		// Joule tools
		new JouleLendTokenTool(agent),
		new JouleWithdrawTokenTool(agent),
		new JouleBorrowTokenTool(agent),
		new JouleRepayTokenTool(agent),
		new JouleGetPoolDetails(agent),
		new JouleGetUserPosition(agent),
		new JouleGetUserAllPositions(agent),
		// LiquidSwap tools
		new LiquidSwapCreatePoolTool(agent),
		new LiquidSwapAddLiquidityTool(agent),
		new LiquidSwapRemoveLiquidityTool(agent),
		new LiquidSwapSwapTool(agent),
		// Aries tools
		new AriesCreateProfileTool(agent),
		new AriesWithdrawTool(agent),
		new AriesBorrowTool(agent),
		new AriesLendTool(agent),
		new AriesRepayTool(agent),
		// Thala tools
		new ThalaAddLiquidityTool(agent),
		new ThalaRemoveLiquidityTool(agent),
		new ThalaMintMODTool(agent),
		new ThalaRedeemMODTool(agent),
		new ThalaUnstakeTokenTool(agent),
		new ThalaStakeTokenTool(agent),
		// Panora tools
		new PanoraSwapTool(agent),
		// OpenAI tools
		new OpenAICreateImageTool(agent),
		// Echo tools
		new EchoStakeTokenTool(agent),
		new EchoUnstakeTokenTool(agent),
		// Echelon tools
		new EchelonLendTokenTool(agent),
		new EchelonWithdrawTokenTool(agent),
	];
};
