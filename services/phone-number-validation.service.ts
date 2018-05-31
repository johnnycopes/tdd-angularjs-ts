import * as _ from "lodash";
import * as angular from "angular";
angular.module("shared-services", []);

class PhoneNumberValidationService {

	public validateUSphoneNumber(phoneNumber: string): boolean {
		if (typeof phoneNumber !== "string") {
			return false;
		}

		const validation = {
			hasNoParens: false,
			hasValidParens: false,
			numberChars: 10,
			isValidPhoneNumber: false
		};

		const phoneNumberParsed = phoneNumber
			.split('')
			.reduce((accum, current, prev) => {
				if (current === '(') {
					accum.leftParens++;
					accum.parensNumber += current;
				}
				else if (current === ')') {
					accum.rightParens++;
					accum.parensNumber += current;
				}
				else if (current !== " " && !isNaN(Number(current))) {
					accum.rawNumber += current;
					accum.parensNumber += current;
				}
				return accum;
			}, {
				rawNumber: "",
				parensNumber: "",
				leftParens: 0,
				rightParens: 0
			});
		
		// determine correct number of characters based on presence of country code
		if (phoneNumberParsed.rawNumber.length === 11 && Number(phoneNumber[0]) === 1) {
			validation.numberChars = 11;
		};

		// determine if phone number has valid set of parentheses
		validation.hasNoParens = 
			phoneNumberParsed.leftParens === 0 &&
			phoneNumberParsed.rightParens === 0
		;

		validation.hasValidParens = 
			phoneNumberParsed.leftParens === 1 &&
			phoneNumberParsed.rightParens === 1 &&
			phoneNumberParsed.parensNumber[validation.numberChars - 10] === "(" &&
			phoneNumberParsed.parensNumber[validation.numberChars - 6] === ")"
		;

		// using the above info, determine if phone number is valid
		validation.isValidPhoneNumber = 
			(validation.hasNoParens || validation.hasValidParens) &&
			phoneNumberParsed.rawNumber.length === validation.numberChars
		;

		return validation.isValidPhoneNumber;
	}

}

angular
	.module("shared-services")
	.service("phoneNumberValidationService", PhoneNumberValidationService);