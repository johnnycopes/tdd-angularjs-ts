import * as angular from "angular";
import "../services/phone-number-validation.service";

describe("phone number validation service", () => {

	let phoneNumberValidationService;
	beforeEach(angular.mock.module("shared-services"));
	beforeEach(angular.mock.inject(function(_phoneNumberValidationService_) {
		phoneNumberValidationService = _phoneNumberValidationService_;
	}));

	it("returns a boolean", () => {
		const phone1 = "1234567890";
		const result1 = phoneNumberValidationService.validateUSphoneNumber(phone1);
		expect(typeof result1).toEqual("boolean");
	});

	it("returns false for inputs that aren't of type string", () => {
		const phone1 = 1234567890;
		const result1 = phoneNumberValidationService.validateUSphoneNumber(phone1);
		expect(result1).toEqual(false);

		const phone2 = "1234567890";
		const result2 = phoneNumberValidationService.validateUSphoneNumber(phone2);
		expect(result2).toEqual(true);
	});

	it("has ten number characters in the input string (excluding country code)", () => {
		const phone1 = "34770523423477052342";
		const result1 = phoneNumberValidationService.validateUSphoneNumber(phone1);
		expect(result1).toEqual(false);

		const phone2 = "347-705-2342";
		const result2 = phoneNumberValidationService.validateUSphoneNumber(phone2);
		expect(result2).toEqual(true);

		const phone3 = "(347)-705-2342";
		const result3 = phoneNumberValidationService.validateUSphoneNumber(phone3);
		expect(result3).toEqual(true);
	});

	it("has eleven number characters in the input string (including country code", () => {
		const phone1 = "134770523423477052342";
		const result1 = phoneNumberValidationService.validateUSphoneNumber(phone1);
		expect(result1).toEqual(false);

		const phone2 = "1 347-705-2342";
		const result2 = phoneNumberValidationService.validateUSphoneNumber(phone2);
		expect(result2).toEqual(true);

		const phone3 = "1(347)-705-2342";
		const result3 = phoneNumberValidationService.validateUSphoneNumber(phone3);
		expect(result3).toEqual(true);
	});

	it("should allow parentheses to wrap only the area code -- nothing else", () => {
		const phone1 = "1(347)-705-2342";
		const result1 = phoneNumberValidationService.validateUSphoneNumber(phone1);
		expect(result1).toEqual(true);

		const phone2 = "1(347-705-2342";
		const result2 = phoneNumberValidationService.validateUSphoneNumber(phone2);
		expect(result2).toEqual(false);

		const phone3 = "(347-705-2342)";
		const result3 = phoneNumberValidationService.validateUSphoneNumber(phone3);
		expect(result3).toEqual(false);
	});

});