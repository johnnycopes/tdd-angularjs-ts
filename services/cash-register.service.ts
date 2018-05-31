import * as _ from "lodash";
import * as angular from "angular";
angular.module("shared-services", []);

/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
*/

type Register = Array<[string, number]>;

class CashRegisterService {
	
	public checkCashRegister(price: number, cash: number, cid: Register) {
		const result = {
			status: '',
			change: []
		};
		const valueDict: {[key: string]: number} = {
			PENNY: 0.1,
			NICKEL: 0.5,
			DIME: 0.10,
			QUARTER: 0.25,
			ONE: 1,
			FIVE: 5,
			TEN: 10,
			TWENTY: 20,
			"ONE HUNDRED": 100
		};
		const changeDue = (cash - price) * 100;
		const register: Register = cid.slice().reverse();

		let dueRemaining = changeDue;
		let collected = 0;

		register
			.forEach(currency => {
				const currencyName = currency[0];
				const currencyValue = valueDict[currencyName] * 100;
				let currencyTotal = currency[1] * 100;

				if (currencyValue < dueRemaining) {
					while(dueRemaining > 0 && currencyTotal > 0) {
						dueRemaining -= currencyValue;
						currencyTotal -= currencyValue;
						collected += currencyValue;
					}
					// console.log(`
					// ${currencyName}
					// currency total: ${currencyTotal}
					// due remaining: ${dueRemaining}
					// collected: ${collected}
					// `);
				}

				result.change.unshift(currency);
			});

		if (dueRemaining > 0) {
			result.status = "INSUFFICIENT_FUNDS";
			result.change = [];
		}
		else if (collected === changeDue) {
			result.status = "CLOSED";
		}
		else {
			result.status = "OPEN";
		}

		return result;
	}
}

angular
	.module("shared-services")
	.service("cashRegisterService", CashRegisterService);