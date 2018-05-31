import * as angular from "angular";
import "../services/cash-register.service";

describe("cash register service", () => {

	let cashRegisterService;
	beforeEach(angular.mock.module("shared-services"));
	beforeEach(angular.mock.inject(function(_cashRegisterService_) {
		cashRegisterService = _cashRegisterService_;
	}));

	test("returns an object with keys 'status' and 'change'", () => {
		const result1 = cashRegisterService.checkCashRegister(
			19.5,
			20,
			[
				["PENNY", 0.01],
				["NICKEL", 0],
				["DIME", 0],
				["QUARTER", 0],
				["ONE", 1],
				["FIVE", 0],
				["TEN", 0],
				["TWENTY", 0],
				["ONE HUNDRED", 0]
			]
		);
		expect(result1).toEqual(expect.objectContaining({
			status: expect.any(String),
			change: expect.any(Array)
		}));
	});

	test("returns `{status: 'INSUFFICIENT_FUNDS', change: []}` if cash-in-drawer is less than change due", () => {
		const result1 = cashRegisterService.checkCashRegister(
			19.5, 
			20, 
			[
				["PENNY", 0.01],
				["NICKEL", 0], 
				["DIME", 0], 
				["QUARTER", 0], 
				["ONE", 1], 
				["FIVE", 0], 
				["TEN", 0], 
				["TWENTY", 0], 
				["ONE HUNDRED", 0]
			]
		);
		expect(result1).toEqual({ status: "INSUFFICIENT_FUNDS", change: [] });
	});
	
	test("returns `{status: 'CLOSED', change: [...]}` with cash-in-drawer as the value for the key change if it is equal to the change due", () => {
		const result1 = cashRegisterService.checkCashRegister(
			19.5, 
			20, 
			[
				["PENNY", 0.5],
				["NICKEL", 0],
				["DIME", 0],
				["QUARTER", 0],
				["ONE", 0],
				["FIVE", 0],
				["TEN", 0],
				["TWENTY", 0],
				["ONE HUNDRED", 0]
			]
		);
		expect(result1).toEqual({ status: "CLOSED", change: [
			["PENNY", 0.5],
			["NICKEL", 0],
			["DIME", 0],
			["QUARTER", 0],
			["ONE", 0], 
			["FIVE", 0],
			["TEN", 0],
			["TWENTY", 0],
			["ONE HUNDRED", 0]
		]});
	});

	test("return `{status: 'OPEN', change: [...]}`, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key", () => {
		const result1 = cashRegisterService.checkCashRegister(
			19.5, 
			20,
			[
				["PENNY", 1.01], 
				["NICKEL", 2.05], 
				["DIME", 3.1], 
				["QUARTER", 4.25], 
				["ONE", 90], 
				["FIVE", 55], 
				["TEN", 20], 
				["TWENTY", 60], 
				["ONE HUNDRED", 100]
			]
		);
		expect(result1).toEqual({ status: "OPEN", change: [["QUARTER", 0.5]] });
	});
});