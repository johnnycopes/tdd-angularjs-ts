import * as angular from "angular";
import "../services/filter.service";

describe("filter service", () => {

	let filterService;
	beforeEach(angular.mock.module("shared-services"));
	beforeEach(angular.mock.inject(function(_filterService_) {
		filterService = _filterService_;
	}));

	it("takes objects and returns only one matching object", () => {
		const objects = [
			{ name: "Romeo" },
			{ name: "Juliet" },
		];
		const result1 = filterService.filter(objects, { name: "Juliet" });
		expect(result1).toEqual([
			{ name: "Juliet" }
		]);
		const result2 = filterService.filter(objects, { name: "Romeo" });
		expect(result2).toEqual([
			{ name: "Romeo" }
		]);
	});

	it("takes objects and filters by different key than 'name'", () => {
		const objects = [
			{ name: "Romeo", age: 5 },
			{ name: "Juliet", age: 7 }
		];
		const result = filterService.filter(objects, { age: 5 });
		expect(result).toEqual([
			{ name: "Romeo", age: 5 }
		]);
	});

	it("should return no results if no match", () => {
		const objects = [
			{ name: "Romeo", age: 5 },
			{ name: "Juliet", age: 7 }
		];
		const result = filterService.filter(objects, { age: 9 });
		expect(result).toEqual([]);
	});

	it("return multiple results if query multiple matched", () => {
		const objects = [
			{ name: "Romeo", age: 5 },
			{ name: "Juliet", age: 7 },
			{ name: "Igor", age: 7 }
		];
		const result = filterService.filter(objects, { age: 7 });
		expect(result).toEqual([
			{ name: "Juliet", age: 7 },
			{ name: "Igor", age: 7 }
		]);
	});

	it("requires matching multiple key/value pairs of query object", () => {
		const objects = [
			{ name: "Romeo", age: 5 },
			{ name: "Romeo", age: 10 },
			{ name: "Juliet", age: 7 },
			{ name: "Igor", age: 7 }
		];
		const result = filterService.filter(objects,
			{ name: "Romeo", age: 5 }
		);
		expect(result).toEqual([
			{ name: "Romeo", age: 5 }
		]);
	});

});
