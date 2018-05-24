import * as _ from "lodash";
import * as angular from "angular";
angular.module("shared-services", []);

class FilterService {

	filter(objects: object[], query: object): object[] {
		return _.filter(objects, obj => {
			return _.every(query, (value, key) => {
				return obj[key] === value;
			})
		});
	}

}

angular
	.module("shared-services")
	.service("filterService", FilterService);