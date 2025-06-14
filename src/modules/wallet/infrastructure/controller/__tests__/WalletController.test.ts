import { describe, expect, it, beforeEach, afterEach } from "bun:test"
import { WalletControllerRoutes } from "../IWalletController"
import { walletController } from "../WalletController"
import Elysia from "elysia"
import { apiURL } from "../../../../../config"
import { Routes } from "../../../../../routes/routes"

describe("WalletControllerAPITest", () => {

	const TEST_USER_ID = "user123"
	const TEST_BALANCE = 1000

	let app: Elysia

	beforeEach(() => {
		app = new Elysia()
			.use(walletController)
			.listen(3000)
	})

	afterEach(() => {
		app.stop()
	})

	it("GET: Balance by userId", async () => {
		const request = await fetch(`${apiURL}${Routes.WALLET_CONTROLLER}${WalletControllerRoutes.BALANCE}/${TEST_USER_ID}`)
		const response = await request.json()
		expect(response).toBeDefined()
		expect(response?.balance).toBe(TEST_BALANCE)
	})
})