import * as angular from "angular";
import "../services/word.service";

describe("word service", () => {

	let wordService;
	beforeEach(angular.mock.module("shared-services"));
	beforeEach(angular.mock.inject(function (_wordService_) {
		wordService = _wordService_;
	}));

	it("counts vowels (example 1)", () => {
		const word = "towel";
		const result = wordService.countVowels(word);
		expect(result).toEqual(2);
	});

	it("counts vowels (example 2)", () => {
		const word = "computer";
		const result = wordService.countVowels(word);
		expect(result).toEqual(3);
	});

	it("counts vowels in word where vowel count should be 0", () => {
		const fakeWord = "rtynv";
		const result = wordService.countVowels(fakeWord);
		expect(result).toEqual(0);
	});
});