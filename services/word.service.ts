import * as _ from "lodash";
import * as angular from "angular";
angular.module("shared-services", []);

class WordService {

	private vowelsDict = {
		a: true,
		e: true,
		i: true,
		o: true,
		u: true
	};

	public countVowels(word: string): number {
		return word
		.split('')
		.reduce((accum, current, prev) => {
			if (this.vowelsDict[current]) {
				accum++;
			}
			return accum;
		}, 0);
	}

}

angular
	.module("shared-services")
	.service("wordService", WordService);