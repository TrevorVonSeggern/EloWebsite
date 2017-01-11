/**
 * Created by Trevor Von Seggern on 11/30/2015.
 */

import IHttpService = angular.IHttpService;
import ILocationService = angular.ILocationService;
import IWindowService = angular.IWindowService;
import {User} from '../factory';
import {definition} from "../../../../Definition";

export class controller {
	static controllerName = definition.login.controllerName;
	static $inject:any[] = ['$location', '$window', 'UserFactory'];

	user:any = {};

	ErrorMessage:string = '';
	GoogleLoginUrl:string;

	constructor(public $location:ILocationService,
	            public $window:IWindowService,
	            public $userFactory) {
		$userFactory.Initialize();
		if ($userFactory.user) {
			this.toAccountPage();
		}
		$userFactory.httpServerCall('/api/client?name=google', 'GET', undefined, (data) => {
			let google:any = data.data;
			if (!google || !google.url) {
				this.ErrorMessage = 'Google authentication not supported.';
				return;
			}
			this.GoogleLoginUrl = google.url
				+ '?redirect_uri=' + google.redirect_uri
				+ '&response_type=' + google.response_type
				+ '&client_id=' + google.client_id
				+ '&scope=' + google.scope
				+ '&state=' + google.state;
		});
	}

	private sendLoginRequest(url:string, type:string) {
		let user = new User(this.user, this.$userFactory);
		this.$userFactory.httpServerCall(url, type, user.LoginModel(), (response) => {
			// successful http transaction
			let data:any = response.data;

			if (data.error)
				this.ErrorMessage = data.error;
			else if (data.token) {
				this.$userFactory.StoreCredentials(data.user, data.token);
				this.toAccountPage();
			}
		});
	}

	toAccountPage() {
		this.$location.path('/account');
	}

	login() {
		this.sendLoginRequest('/api/user/login', 'PUT');
	}

	submitGoogle() {
		this.$window.location.href = this.GoogleLoginUrl;
	}
}

controller.$inject.push(controller);