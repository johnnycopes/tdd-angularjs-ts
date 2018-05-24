import * as angular from "angular";
import "../services/phone-number-validation.service";

describe("phone number validation service", () => {

	let phoneNumberValidationService;
	beforeEach(angular.mock.module("shared-services"));
	beforeEach(angular.mock.inject(function(_phoneNumberValidationService_) {
		phoneNumberValidationService = _phoneNumberValidationService_;
	}));

	it("should return a boolean", () => {
		const phoneNum = 1234567890;
		const result = phoneNumberValidationService.validateUSphoneNumber(phoneNum);
		expect(result).toEqual(true);
	});
	
});