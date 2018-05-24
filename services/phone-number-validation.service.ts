import * as _ from "lodash";
import * as angular from "angular";
angular.module("shared-services", []);

class PhoneNumberValidationService {

	public validateUSphoneNumber(phoneNumber: number) {
		return true;
	}

}

angular
	.module("shared-services")
	.service("phoneNumberValidationService", PhoneNumberValidationService);