/**
 * Created by Trevor Von Seggern on 11/30/2015.
 */

import IHttpService = angular.IHttpService;
import {UserFactory, User} from '../factory';
import {definition} from "../../../../Definition";

export class AccountChangePasswordController {
	static controllerName = definition.account.controllerName;
	static $inject:any[] = ['$scope', '$location', '$http', 'UserFactory'];

	user:any;
	password:string;
	newPassword:string;
	confirmPassword:string;
	errorMessage:string;

	changedPassword:boolean = false;

	constructor($scope:any, public $location, public $http:IHttpService, public $userFactory:UserFactory) {
		$userFactory.Initialize();

		if ($userFactory.user)
			this.user = $userFactory.user;
		else
			this.changedPassword = true;
	}

	submitChangePassword() {
		if (this.newPassword === this.confirmPassword) {
			let old_password = this.$userFactory.HashString(this.password),
				new_password = this.$userFactory.HashString(this.newPassword);

			this.$userFactory.ChangePassword(old_password, new_password, ()=> {
				this.changedPassword = true;
			}, (message:string)=> {
				this.errorMessage = message;
			});
		}
	}
}

AccountChangePasswordController.$inject.push(AccountChangePasswordController);