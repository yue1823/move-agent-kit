import { AccountAddress, MoveStructId, Aptos } from "@aptos-labs/ts-sdk";
import { BaseSigner } from "./signers";
import {
	burnNFT,
	burnToken,
	getBalance,
	mintToken,
	getTransaction,
	stakeTokens,
	transferNFT,
	transferTokens,
	lendToken,
	borrowToken,
	withdrawToken,
	repayToken,
	getUserPosition,
	getPoolDetails,
	unstakeTokens,
	getTokenDetails,
	getUserAllPositions,
	createToken,
} from "./tools";
import { AptosPriceServiceConnection } from "@pythnetwork/pyth-aptos-js";
import { priceFeed } from "./constants/price-feed";
import {
	addLiquidity,
	createPool,
	removeLiquidity,
	swap,
} from "./tools/liquidswap";
import {
	borrowAriesToken,
	createAriesProfile,
	lendAriesToken,
	repayAriesToken,
	withdrawAriesToken,
} from "./tools/aries";
import {
	stakeTokenWithThala,
	unstakeAPTWithThala,
	mintMODWithThala,
	redeemMODWithThala,
	addLiquidityWithThala,
	removeLiquidityWithThala,
} from "./tools/thala";
import { swapWithPanora } from "./tools/panora";

import { createImage } from "./tools/openai";
import { stakeTokenWithEcho, unstakeTokenWithEcho } from "./tools/echo";
import { getTokenByTokenName } from "./utils/get-pool-address-by-token-name";
import {
	lendTokenWithEchelon,
	withdrawTokenWithEchelon,
} from "./tools/echelon";

export class AgentRuntime {
	public account: BaseSigner;
	public aptos: Aptos;
	public config: any;

	constructor(account: BaseSigner, aptos: Aptos, config?: any) {
		this.account = account;
		this.aptos = aptos;
		this.config = config ? config : {};
	}

	async getPythData() {
		const connection = new AptosPriceServiceConnection(
			"https://hermes.pyth.network",
		);

		return await connection.getPriceFeedsUpdateData(priceFeed);
	}

	getBalance(mint?: string | MoveStructId) {
		return getBalance(this, mint);
	}

	getTokenDetails(token: string) {
		return getTokenDetails(token);
	}

	getTokenByTokenName(name: string) {
		return getTokenByTokenName(name);
	}

	transferTokens(to: AccountAddress, amount: number, mint: string) {
		return transferTokens(this, to, amount, mint);
	}

	getTransaction(hash: string) {
		return getTransaction(this, hash);
	}

	burnToken(amount: number, mint: string) {
		return burnToken(this, amount, mint);
	}

	createToken(
		name: string,
		symbol: string,
		iconURI: string,
		projectURI: string,
	) {
		return createToken(this, name, symbol, iconURI, projectURI);
	}

	mintToken(to: AccountAddress, mint: string, amount: number) {
		return mintToken(this, to, mint, amount);
	}

	stakeTokensWithAmnis(to: AccountAddress, amount: number) {
		return stakeTokens(this, to, amount);
	}

	withdrawStakeFromAmnis(to: AccountAddress, amount: number) {
		return unstakeTokens(this, to, amount);
	}

	transferNFT(to: AccountAddress, mint: AccountAddress) {
		return transferNFT(this, to, mint);
	}

	burnNFT(mint: AccountAddress) {
		return burnNFT(this, mint);
	}

	lendToken(
		amount: number,
		mint: MoveStructId,
		positionId: string,
		newPosition: boolean,
		fungibleAsset: boolean,
	) {
		return lendToken(
			this,
			amount,
			mint,
			positionId,
			newPosition,
			fungibleAsset,
		);
	}

	borrowToken(
		amount: number,
		mint: MoveStructId,
		positionId: string,
		fungibleAsset: boolean,
	) {
		return borrowToken(this, amount, mint, positionId, fungibleAsset);
	}

	withdrawToken(
		amount: number,
		mint: MoveStructId,
		positionId: string,
		fungibleAsset: boolean,
	) {
		return withdrawToken(this, amount, mint, positionId, fungibleAsset);
	}

	repayToken(
		amount: number,
		mint: MoveStructId,
		positionId: string,
		fungibleAsset: boolean,
	) {
		return repayToken(this, amount, mint, positionId, fungibleAsset);
	}

	getUserPosition(userAddress: AccountAddress, positionId: string) {
		return getUserPosition(this, userAddress, positionId);
	}

	getUserAllPositions(userAddress: AccountAddress) {
		return getUserAllPositions(this, userAddress);
	}
	getPoolDetails(mint: string) {
		return getPoolDetails(this, mint);
	}

	addLiquidity(
		mintX: MoveStructId,
		mintY: MoveStructId,
		mintXAmount: number,
		mintYAmount: number,
	) {
		return addLiquidity(this, mintX, mintY, mintXAmount, mintYAmount);
	}

	removeLiquidity(
		mintX: MoveStructId,
		mintY: MoveStructId,
		lpAmount: number,
		minMintX = 0,
		minMintY = 0,
	) {
		return removeLiquidity(
			this,
			mintX,
			mintY,
			lpAmount,
			minMintX,
			minMintY,
		);
	}

	swap(
		mintX: MoveStructId,
		mintY: MoveStructId,
		swapAmount: number,
		minCoinOut?: number,
	) {
		return swap(this, mintX, mintY, swapAmount, minCoinOut);
	}

	createPool(mintX: MoveStructId, mintY: MoveStructId) {
		return createPool(this, mintX, mintY);
	}

	// Aries

	createAriesProfile() {
		return createAriesProfile(this);
	}

	lendAriesToken(mintType: MoveStructId, amount: number) {
		return lendAriesToken(this, mintType, amount);
	}

	borrowAriesToken(mintType: MoveStructId, amount: number) {
		return borrowAriesToken(this, mintType, amount);
	}

	withdrawAriesToken(mintType: MoveStructId, amount: number) {
		return withdrawAriesToken(this, mintType, amount);
	}

	repayAriesToken(mintType: MoveStructId, amount: number) {
		return repayAriesToken(this, mintType, amount);
	}

	// Thala

	stakeTokensWithThala(amount: number) {
		return stakeTokenWithThala(this, amount);
	}

	unstakeTokensWithThala(amount: number) {
		return unstakeAPTWithThala(this, amount);
	}

	mintMODWithThala(mintType: MoveStructId, amount: number) {
		return mintMODWithThala(this, mintType, amount);
	}

	redeemMODWithThala(mintType: MoveStructId, amount: number) {
		return redeemMODWithThala(this, mintType, amount);
	}

	addLiquidityWithThala(
		mintX: MoveStructId,
		mintY: MoveStructId,
		mintXAmount: number,
		mintYAmount: number,
	) {
		return addLiquidityWithThala(
			this,
			mintX,
			mintY,
			mintXAmount,
			mintYAmount,
		);
	}

	removeLiquidityWithThala(
		mintX: MoveStructId,
		mintY: MoveStructId,
		lpAmount: number,
	) {
		return removeLiquidityWithThala(this, mintX, mintY, lpAmount);
	}

	// panora

	swapWithPanora(
		fromToken: string,
		toToken: string,
		swapAmount: number,
		toWalletAddress?: string,
	) {
		return swapWithPanora(
			this,
			fromToken,
			toToken,
			swapAmount,
			toWalletAddress,
		);
	}

	// openai

	createImageWithOpenAI(
		prompt: string,
		size: "256x256" | "512x512" | "1024x1024",
		n: number,
	) {
		return createImage(this, prompt, size, n);
	}

	// Echo

	stakeTokenWithEcho(amount: number) {
		return stakeTokenWithEcho(this, amount);
	}

	unstakeTokenWithEcho(amount: number) {
		return unstakeTokenWithEcho(this, amount);
	}

	// Echelon

	lendTokenWithEchelon(
		mintType: MoveStructId,
		amount: number,
		poolAddress: string,
		fungibleAsset: boolean,
	) {
		return lendTokenWithEchelon(
			this,
			mintType,
			amount,
			poolAddress,
			fungibleAsset,
		);
	}

	withdrawTokenWithEchelon(
		mintType: MoveStructId,
		amount: number,
		poolAddress: string,
		fungibleAsset: boolean,
	) {
		return withdrawTokenWithEchelon(
			this,
			mintType,
			amount,
			poolAddress,
			fungibleAsset,
		);
	}
}
