/**
 * Created by Trevor Von Seggern on 11/30/2015.
 */

import IHttpService = angular.IHttpService;
import {UserFactory} from '../factory';
import {definition} from "../../../../Definition";

export class controller {
	static controllerName = definition.account.controllerName;
	static $inject:any[]  = ['$location', '$http', UserFactory.factoryName];

	user:any;

	constructor(
	            public $location,
	            public $http:IHttpService,
	            public $userFactory) {
		debugger;
		$userFactory.Initialize();

		if ($userFactory.user) {
			this.user = $userFactory.user;
		}
		else {
			this.logout();
		}
	}

	changePassword() {
		console.log('try to chagne password');
		this.$location.path('/account/ChangePassword');
	}

	logout() {
		this.$userFactory.ClearCredentials();
		this.$location.path('/login');
	}
}

controller.$inject.push(controller);