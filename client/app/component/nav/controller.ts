import ILocationService = angular.ILocationService;
import {UserFactory} from "../../pages/userManagement/user/factory";

export class navController {
	LoggedIn: boolean = false;
	route: string = '';

	static $inject: any[] = [
		'$rootScope', // url change events. Mark active nav items
		UserFactory.factoryName // template uses this to see if users are logged in or not.
	];

	constructor($rootScope: any, public $userFactory: UserFactory) {
		let url = '';
		let checkState = (url) => {
			let components = url.split('/');
			if (components.length === 0) {
				this.route = '';
				return;
			}
			if (components[0] === '/' || components[0] === '') {
				if (components.length === 1) {
					this.route = '';
					return;
				}
				if (components[1] === '/' || components[1] === '#') {
					this.route = '';
					return;
				}
				this.route = components[1];
			}
		};

		let name = window.location.hash;
		name = name.replace('#', '');
		checkState(name);
		$rootScope.$on('$stateChangeStart', (event, toState) => {
			checkState(toState.url);
		});
	}
}

navController.$inject.push(navController);