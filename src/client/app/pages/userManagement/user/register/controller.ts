/**
 * Created by Trevor Von Seggern on 11/30/2015.
 */

import IHttpService = angular.IHttpService;
import {User, UserFactory} from '../factory';
import IWindowService = angular.IWindowService;
import ILocationService = angular.ILocationService;
import {definition} from "../../../../Definition";

export class controller {
	static controllerName = definition.register.controllerName;
	static $inject:any[]  = ['$location', '$window', 'UserFactory'];

	user:any;

	ErrorMessage:string = '';
	GoogleLoginUrl:string;

	constructor(public $location:ILocationService,
	            public $window:IWindowService,
	            public $userFactory:UserFactory) {
		$userFactory.Initialize();

		if ($userFactory.user) {
			// this.toAccountPage();
		}

		$userFactory.httpServerCall('/api/client?name=google', 'GET', undefined, (data) => {
			var google:any = data.data[0];
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

	private sendRegisterRequest(url:string, type:string) {
		var user = new User(this.user, this.$userFactory);
		this.$userFactory.httpServerCall(url, type, user.getBland(), (response) => {
			// success
			var data:any = response.data;

			if (data.error) {
				this.ErrorMessage = data.error;
			}
			if (data.errors) {
				this.ErrorMessage = data.message;
			}
			else if (data.token) {
				this.$userFactory.StoreCredentials(user, data.token);
				this.$window.location.href = '/#/account'
			}
		});
	}

	signUp() {
		this.sendRegisterRequest('/api/user/register', 'POST');
	}

	toAccountPage() {
		this.$location.path('/login');
	}

	submitGoogle() {
		this.$window.location.href = this.GoogleLoginUrl;
	}
}

controller.$inject.push(controller);