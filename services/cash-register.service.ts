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
			PENNY: 0.01,
			NICKEL: 0.05,
			DIME: 0.10,
			QUARTER: 0.25,
			ONE: 1,
			FIVE: 5,
			TEN: 10,
			TWENTY: 20,
			"ONE HUNDRED": 100
		};
		let changeDue = cash - price;
		let changeCollected = 0;
		const register: Register = cid.slice().reverse();

		register
			.forEach(currency => {
				let [currencyName, currencyTotal] = currency;
				const currencyValue = valueDict[currencyName];

				if (currencyValue < changeDue) {
					while(changeDue > 0 && currencyTotal > 0) {
						changeDue -= currencyValue;
						currencyTotal -= currencyValue;
						changeCollected += currencyValue;
					}
					// console.log(`
					// ${currencyName}
					// change due: ${changeDue}
					// currency total: ${currencyTotal}
					// change collected: ${changeCollected}
					// `);
				}
			});

		if (changeDue > 0) {
			result.status = "INSUFFICIENT_FUNDS";
		}

		return result;
	}
}

angular
	.module("shared-services")
	.service("cashRegisterService", CashRegisterService);