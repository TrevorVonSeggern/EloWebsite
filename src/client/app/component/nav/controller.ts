import ILocationService = angular.ILocationService;
import {UserFactory} from "../../pages/userManagement/user/factory";

export class navController {
	LoggedIn:boolean = false;
	debounce:boolean = false;

	static $inject:any[] = ['$scope', '$location', UserFactory.factoryName];

	constructor(public $scope:any, public $location:ILocationService, public $userFactory:UserFactory) {
	}

	menuClick(page:string) {
		if (!this.debounce) {
			this.$location.path('' + page);
			this.debounce = true;
			setTimeout(() => {
				this.debounce = false;
				this.$scope.$apply();
			}, 100)
		}
	}
}

navController.$inject.push(navController);